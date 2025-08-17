import React from 'react';
import { BotStatus } from '../types.js';

const InputField = ({ label, id, value, onChange, disabled }) => (
    React.createElement('div', null,
        React.createElement('label', { htmlFor: id, className: "block text-sm font-medium text-gray-400 mb-1" }, label),
        React.createElement('div', { className: "relative" },
            React.createElement('span', { className: "absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500" }, "$"),
            React.createElement('input', {
                type: "number",
                id: id,
                name: id,
                value: value,
                onChange: onChange,
                disabled: disabled,
                className: "w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 pl-7 pr-4 text-white focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
                min: "0",
                step: "1"
            })
        )
    )
);

const SettingsForm = ({ settings, onSettingsChange, status }) => {
  const isRunning = status === BotStatus.RUNNING;

  const handleChange = (e) => {
    onSettingsChange({
      ...settings,
      [e.target.name]: Number(e.target.value) < 0 ? 0 : Number(e.target.value),
    });
  };

  return (
    React.createElement('div', { className: "bg-gray-800 p-6 rounded-lg shadow-lg" },
      React.createElement('h2', { className: "text-xl font-bold text-white mb-4" }, "Trade Settings"),
      React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-4" },
        React.createElement(InputField, { 
          label: "Target Amount",
          id: "targetAmount",
          value: settings.targetAmount,
          onChange: handleChange,
          disabled: isRunning
        }),
        React.createElement(InputField, { 
          label: "Investment Amount",
          id: "initialInvestment",
          value: settings.initialInvestment,
          onChange: handleChange,
          disabled: isRunning
        }),
        React.createElement(InputField, { 
          label: "Stop Loss Amount",
          id: "stopLossAmount",
          value: settings.stopLossAmount,
          onChange: handleChange,
          disabled: isRunning
        })
      )
    )
  );
};

export default SettingsForm;