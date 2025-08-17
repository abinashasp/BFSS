
import React from 'react';
import type { AppState } from '../types';
import { BotStatus } from '../types';

interface DashboardProps {
    state: AppState;
}

const StatCard: React.FC<{ label: string; value: string; colorClass?: string; isStatus?: boolean }> = ({ label, value, colorClass = 'text-white', isStatus = false }) => (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-center">
        <p className="text-sm text-gray-400">{label}</p>
        <p className={`text-2xl font-bold ${colorClass} ${isStatus ? 'animate-pulse' : ''}`}>{value}</p>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            <StatCard label="Current P/L" value={`$${currentProfit.toFixed(2)}`} colorClass={profitColor} />
            <StatCard label="Bot Status" value={status} colorClass={getStatusColor()} isStatus={status === BotStatus.RUNNING} />
            <StatCard label="Next Investment" value={`$${nextInvestment.toFixed(2)}`} colorClass="text-indigo-400" />
            <StatCard label="Target" value={`$${settings.targetAmount.toFixed(2)}`} colorClass="text-white" />
        </div>
    );
};

export default Dashboard;