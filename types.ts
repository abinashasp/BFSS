
export enum BotStatus {
  STOPPED = 'Stopped',
  RUNNING = 'Running',
  TARGET_REACHED = 'Target Reached',
  STOP_LOSS_HIT = 'Stop-Loss Hit',
}

export interface TradeSettings {
  targetAmount: number;
  initialInvestment: number;
  stopLossAmount: number;
}

export interface Trade {
  id: string;
  timestamp: string;
  asset: string;
  direction: 'BUY' | 'SELL';
  amount: number;
  result: 'WIN' | 'LOSS';
  profit: number;
}

export interface AppState {
  settings: TradeSettings;
  status: BotStatus;
  currentProfit: number;
  nextInvestment: number;
  tradeHistory: Trade[];
  totalLoss: number;
}