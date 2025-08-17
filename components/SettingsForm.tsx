
import React from 'react';
import type { TradeSettings } from '../types';
import { BotStatus } from '../types';

interface SettingsFormProps {
  settings: TradeSettings;
  onSettingsChange: (newSettings: TradeSettings) => void;
  status: BotStatus;
}

const InputField: React.FC<{
    label: string;
    id: keyof TradeSettings;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
}> = ({ label, id, value, onChange, disabled }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
            <input
                type="number"
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 pl-7 pr-4 text-white focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                min="0"
                step="1"
            />
        </div>
    </div>
);


const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSettingsChange, status }) => {
  const isRunning = status === BotStatus.RUNNING;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      [e.target.name]: Number(e.target.value) < 0 ? 0 : Number(e.target.value),
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Trade Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField 
          label="Target Amount"
          id="targetAmount"
          value={settings.targetAmount}
          onChange={handleChange}
          disabled={isRunning}
        />
        <InputField 
          label="Investment Amount"
          id="initialInvestment"
          value={settings.initialInvestment}
          onChange={handleChange}
          disabled={isRunning}
        />
        <InputField 
          label="Stop Loss Amount"
          id="stopLossAmount"
          value={settings.stopLossAmount}
          onChange={handleChange}
          disabled={isRunning}
        />
      </div>
    </div>
  );
};

export default SettingsForm;