import React, { useState } from 'react';
import { BotStatus } from '../types.js';
import { PlayIcon, StopIcon, RocketIcon, InfoIcon } from './icons.js';

const ControlPanel = ({ status, onStart, onStop, onExecuteTrade }) => {
  const [signal, setSignal] = useState('');
  const isRunning = status === BotStatus.RUNNING;
  const isStopped = !isRunning;

  const handleExecute = () => {
    if (signal.trim()) {
      onExecuteTrade(signal.trim());
      setSignal('');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleExecute();
    }
  };

  return (
    React.createElement('div', { className: "bg-gray-800 p-6 rounded-lg shadow-lg" },
        React.createElement('div', { className: "flex flex-col md:flex-row gap-4" },
            React.createElement('div', { className: "flex-grow" },
                 React.createElement('label', { htmlFor: "signal", className: "block text-sm font-medium text-gray-400 mb-1" }, "Telegram Signal"),
                 React.createElement('textarea', {
                    id: "signal",
                    value: signal,
                    onChange: (e) => setSignal(e.target.value),
                    onKeyDown: handleKeyDown,
                    placeholder: isRunning ? "Paste signal here (e.g., EURUSD BUY)" : "Start the bot to enter signals",
                    rows: 3,
                    className: "w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-3 text-white focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
                    disabled: !isRunning
                 }),
                 React.createElement('div', { className: "flex items-center text-xs text-gray-500 mt-1" },
                    React.createElement(InfoIcon, { className: "w-4 h-4 mr-1" }),
                    React.createElement('span', null, "Press Enter to submit the trade signal.")
                )
            ),
            React.createElement('div', { className: "flex md:flex-col gap-2 justify-center items-center" },
                 React.createElement('button', {
                    onClick: onStart,
                    disabled: isRunning,
                    className: "w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                 },
                    React.createElement(PlayIcon, { className: "w-5 h-5" }),
                    "Start"
                ),
                 React.createElement('button', {
                    onClick: onStop,
                    disabled: isStopped,
                    className: "w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                 },
                    React.createElement(StopIcon, { className: "w-5 h-5" }),
                    "Stop"
                )
            ),
            React.createElement('div', { className: "md:border-l border-gray-600 md:pl-4 flex justify-center items-center" },
                React.createElement('button', {
                    onClick: handleExecute,
                    disabled: !isRunning || !signal.trim(),
                    className: "w-full h-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                },
                    React.createElement(RocketIcon, { className: "w-5 h-5" }),
                    "Execute"
                )
            )
        )
    )
  );
};

export default ControlPanel;