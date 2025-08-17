import React from 'react';
import { BotStatus } from '../types.js';

const StatCard = ({ label, value, colorClass = 'text-white', isStatus = false }) => (
    React.createElement('div', { className: "bg-gray-800 p-4 rounded-lg shadow-md text-center" },
        React.createElement('p', { className: "text-sm text-gray-400" }, label),
        React.createElement('p', { className: `text-2xl font-bold ${colorClass} ${isStatus ? 'animate-pulse' : ''}` }, value)
    )
);

const Dashboard = ({ state }) => {
    const { status, currentProfit, nextInvestment, settings } = state;

    const profitColor = currentProfit > 0 ? 'text-green-400' : currentProfit < 0 ? 'text-red-400' : 'text-white';
    
    const getStatusColor = () => {
        switch(status) {
            case BotStatus.RUNNING: return 'text-cyan-400';
            case BotStatus.STOPPED: return 'text-yellow-400';
            case BotStatus.TARGET_REACHED: return 'text-green-400';
            case BotStatus.STOP_LOSS_HIT: return 'text-red-400';
            default: return 'text-white';
        }
    };
    
    return (
        React.createElement('div', { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 my-6" },
            React.createElement(StatCard, { label: "Current P/L", value: `$${currentProfit.toFixed(2)}`, colorClass: profitColor }),
            React.createElement(StatCard, { label: "Bot Status", value: status, colorClass: getStatusColor(), isStatus: status === BotStatus.RUNNING }),
            React.createElement(StatCard, { label: "Next Investment", value: `$${nextInvestment.toFixed(2)}`, colorClass: "text-indigo-400" }),
            React.createElement(StatCard, { label: "Target", value: `$${settings.targetAmount.toFixed(2)}`, colorClass: "text-white" })
        )
    );
};

export default Dashboard;