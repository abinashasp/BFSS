
import React from 'react';
import type { Trade } from '../types';

interface TradeHistoryProps {
  trades: Trade[];
}

const TradeHistory: React.FC<TradeHistoryProps> = ({ trades }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-bold text-white mb-4">Trade History</h2>
      <div className="max-h-96 overflow-y-auto rounded-md">
        {trades.length === 0 ? (
           <div className="text-center py-10 text-gray-500">
             <p>No trades executed yet.</p>
             <p className="text-sm">Start the bot and execute a signal to see history here.</p>
           </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800 sticky top-0">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Asset</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Direction</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Result</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">P/L</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">Time</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {trades.map((trade) => (
                <tr key={trade.id} className={trade.result === 'WIN' ? 'bg-green-900/20' : 'bg-red-900/20'}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{trade.asset}</td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm font-bold ${trade.direction === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.direction}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">${trade.amount.toFixed(2)}</td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm font-semibold ${trade.result === 'WIN' ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.result}
                  </td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm font-bold ${trade.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.profit > 0 ? '+' : ''}${trade.profit.toFixed(2)}
                  </td>
                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400 hidden sm:table-cell">{trade.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TradeHistory;