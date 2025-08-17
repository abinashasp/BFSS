
import React, { useReducer } from 'react';
import SettingsForm from './components/SettingsForm';
import Dashboard from './components/Dashboard';
import ControlPanel from './components/ControlPanel';
import TradeHistory from './components/TradeHistory';
import { BotStatus } from './types';
import type { AppState, Trade, TradeSettings } from './types';

type Action =
  | { type: 'UPDATE_SETTINGS'; payload: TradeSettings }
  | { type: 'START_BOT' }
  | { type: 'STOP_BOT' }
  | { type: 'EXECUTE_TRADE'; payload: { signal: string } };

const initialState: AppState = {
  settings: {
    targetAmount: 20,
    initialInvestment: 1,
    stopLossAmount: 10,
  },
  status: BotStatus.STOPPED,
  currentProfit: 0,
  totalLoss: 0,
  nextInvestment: 1,
  tradeHistory: [],
};

// --- Mock Trade Logic ---
// In a real extension, this would come from a content script interacting with Quotex.
const simulateTrade = (investment: number): { result: 'WIN' | 'LOSS'; profit: number } => {
  const isWin = Math.random() > 0.45; // 55% win rate for simulation
  const payoutRate = 0.90; // 90% payout on win

  if (isWin) {
    return {
      result: 'WIN',
      profit: investment * payoutRate,
    };
  } else {
    return {
      result: 'LOSS',
      profit: -investment,
    };
  }
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: action.payload,
        nextInvestment: state.status === BotStatus.STOPPED ? action.payload.initialInvestment : state.nextInvestment,
      };
    case 'START_BOT':
      return {
        ...state,
        status: BotStatus.RUNNING,
        currentProfit: 0,
        totalLoss: 0,
        nextInvestment: state.settings.initialInvestment,
        tradeHistory: [],
      };
    case 'STOP_BOT':
      return {
        ...state,
        status: BotStatus.STOPPED,
      };
    case 'EXECUTE_TRADE': {
      if (state.status !== BotStatus.RUNNING) return state;

      // 1. Parse signal (simple parsing for demo)
      const parts = action.payload.signal.trim().toUpperCase().split(' ');
      const asset = parts[0] || 'UNKNOWN';
      const direction = (parts[1] === 'BUY' || parts[1] === 'SELL') ? parts[1] : 'BUY';

      // 2. Simulate trade execution
      const tradeResult = simulateTrade(state.nextInvestment);
      
      const newProfit = state.currentProfit + tradeResult.profit;
      const newTotalLoss = tradeResult.result === 'LOSS' ? state.totalLoss + state.nextInvestment : state.totalLoss;

      const newTrade: Trade = {
        id: new Date().toISOString(),
        timestamp: new Date().toLocaleTimeString(),
        asset,
        direction,
        amount: state.nextInvestment,
        result: tradeResult.result,
        profit: tradeResult.profit,
      };
      
      const updatedHistory = [newTrade, ...state.tradeHistory];
      let nextStatus: BotStatus = state.status;
      let nextInvestAmount = state.settings.initialInvestment;
      
      // 3. Martingale logic: Double on loss, reset on win
      if (tradeResult.result === 'LOSS') {
        nextInvestAmount = state.nextInvestment * 2;
      }

      // 4. Check for stop conditions
      if (newProfit >= state.settings.targetAmount) {
        nextStatus = BotStatus.TARGET_REACHED;
      } else if (newTotalLoss >= state.settings.stopLossAmount) {
        nextStatus = BotStatus.STOP_LOSS_HIT;
      }

      return {
        ...state,
        status: nextStatus,
        currentProfit: newProfit,
        totalLoss: newTotalLoss,
        nextInvestment: nextInvestAmount,
        tradeHistory: updatedHistory,
      };
    }
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const handleSettingsChange = (newSettings: TradeSettings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
  };

  const handleStart = () => {
    dispatch({ type: 'START_BOT' });
  };

  const handleStop = () => {
    dispatch({ type: 'STOP_BOT' });
  };

  const handleExecuteTrade = (signal: string) => {
    dispatch({ type: 'EXECUTE_TRADE', payload: { signal } });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            BFSS TAMIL Auto Trade
          </h1>
          <p className="text-gray-400 mt-2">Quotex Trading Automation Panel</p>
        </header>

        <main>
          <SettingsForm
            settings={state.settings}
            onSettingsChange={handleSettingsChange}
            status={state.status}
          />
          <Dashboard state={state} />
          <ControlPanel
            status={state.status}
            onStart={handleStart}
            onStop={handleStop}
            onExecuteTrade={handleExecuteTrade}
          />
          <TradeHistory trades={state.tradeHistory} />
        </main>
        
        <footer className="text-center mt-8 text-gray-600 text-sm">
            <p>Disclaimer: Trading involves substantial risk. This tool is for educational and simulation purposes only.</p>
            <p>&copy; 2024 BFSS TAMIL. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;