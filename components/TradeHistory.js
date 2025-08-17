import React from 'react';

const TradeHistory = ({ trades }) => {
  return (
    React.createElement('div', { className: "bg-gray-800 p-6 rounded-lg shadow-lg mt-6" },
      React.createElement('h2', { className: "text-xl font-bold text-white mb-4" }, "Trade History"),
      React.createElement('div', { className: "max-h-96 overflow-y-auto rounded-md" },
        trades.length === 0 ? (
           React.createElement('div', { className: "text-center py-10 text-gray-500" },
             React.createElement('p', null, "No trades executed yet."),
             React.createElement('p', { className: "text-sm" }, "Start the bot and execute a signal to see history here.")
           )
        ) : (
          React.createElement('table', { className: "min-w-full divide-y divide-gray-700" },
            React.createElement('thead', { className: "bg-gray-800 sticky top-0" },
              React.createElement('tr', null,
                React.createElement('th', { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" }, "Asset"),
                React.createElement('th', { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" }, "Direction"),
                React.createElement('th', { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" }, "Amount"),
                React.createElement('th', { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" }, "Result"),
                React.createElement('th', { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" }, "P/L"),
                React.createElement('th', { scope: "col", className: "px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell" }, "Time")
              )
            ),
            React.createElement('tbody', { className: "bg-gray-800 divide-y divide-gray-700" },
              trades.map((trade) => (
                React.createElement('tr', { key: trade.id, className: trade.result === 'WIN' ? 'bg-green-900/20' : 'bg-red-900/20' },
                  React.createElement('td', { className: "px-4 py-3 whitespace-nowrap text-sm font-medium text-white" }, trade.asset),
                  React.createElement('td', { className: `px-4 py-3 whitespace-nowrap text-sm font-bold ${trade.direction === 'BUY' ? 'text-green-400' : 'text-red-400'}` },
                    trade.direction
                  ),
                  React.createElement('td', { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-300" }, `$${trade.amount.toFixed(2)}`),
                  React.createElement('td', { className: `px-4 py-3 whitespace-nowrap text-sm font-semibold ${trade.result === 'WIN' ? 'text-green-400' : 'text-red-400'}` },
                    trade.result
                  ),
                  React.createElement('td', { className: `px-4 py-3 whitespace-nowrap text-sm font-bold ${trade.profit > 0 ? 'text-green-400' : 'text-red-400'}` },
                    `${trade.profit > 0 ? '+' : ''}${trade.profit.toFixed(2)}`
                  ),
                   React.createElement('td', { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-400 hidden sm:table-cell" }, trade.timestamp)
                )
              ))
            )
          )
        )
      )
    )
  );
};

export default TradeHistory;