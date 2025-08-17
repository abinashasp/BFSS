
import React, { useState } from 'react';
import { BotStatus } from '../types';
import { PlayIcon, StopIcon, RocketIcon, InfoIcon } from './icons';

interface ControlPanelProps {
  status: BotStatus;
  onStart: () => void;
  onStop: () => void;
  onExecuteTrade: (signal: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ status, onStart, onStop, onExecuteTrade }) => {
  const [signal, setSignal] = useState('');
  const isRunning = status === BotStatus.RUNNING;
  const isStopped = !isRunning;

  const handleExecute = () => {
    if (signal.trim()) {
      onExecuteTrade(signal.trim());
      setSignal('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleExecute();
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
                 <label htmlFor="signal" className="block text-sm font-medium text-gray-400 mb-1">Telegram Signal</label>
                 <textarea
                    id="signal"
                    value={signal}
                    onChange={(e) => setSignal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isRunning ? "Paste signal here (e.g., EURUSD BUY)" : "Start the bot to enter signals"}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-3 text-white focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isRunning}
                />
                 <div className="flex items-center text-xs text-gray-500 mt-1">
                    <InfoIcon className="w-4 h-4 mr-1"/>
                    <span>Press Enter to submit the trade signal.</span>
                </div>
            </div>
            <div className="flex md:flex-col gap-2 justify-center items-center">
                 <button
                    onClick={onStart}
                    disabled={isRunning}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                    <PlayIcon className="w-5 h-5"/>
                    Start
                </button>
                 <button
                    onClick={onStop}
                    disabled={isStopped}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                    <StopIcon className="w-5 h-5"/>
                    Stop
                </button>
            </div>
             <div className="md:border-l border-gray-600 md:pl-4 flex justify-center items-center">
                <button
                    onClick={handleExecute}
                    disabled={!isRunning || !signal.trim()}
                    className="w-full h-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                    <RocketIcon className="w-5 h-5"/>
                    Execute
                </button>
            </div>
        </div>
    </div>
  );
};

export default ControlPanel;