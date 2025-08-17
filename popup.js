// Auto Trading Extension with Telegram Integration
document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('root');
  let isTrading = false;
  let currentProfit = 0;
  let currentInvestment = 0;
  let currentAsset = 'None';
  let tradeHistory = [];
  let settings = {
    botToken: '',
    chatId: '',
    targetAmount: 0,
    initialInvestment: 0,
    maxLoss: 0
  };
  let showSettings = false;
  
  // Load saved settings
  chrome.storage.local.get(['tradingSettings'], (result) => {
    if (result.tradingSettings) {
      settings = { ...settings, ...result.tradingSettings };
      updateUI();
    }
  });
  
  function saveSettings() {
    chrome.storage.local.set({ tradingSettings: settings });
  }
  
  function updateUI() {
    if (showSettings) {
      renderSettings();
    } else {
      renderDashboard();
    }
  }
  
  function renderSettings() {
    root.innerHTML = `
      <div class="p-4 max-w-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-white">Settings</h2>
          <button id="backBtn" class="text-gray-400 hover:text-white">✕</button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">Telegram Bot Token</label>
            <input id="botToken" type="text" value="${settings.botToken}" class="w-full bg-gray-700 text-white text-xs p-2 rounded border border-gray-600" placeholder="Bot token">
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">Chat ID</label>
            <input id="chatId" type="text" value="${settings.chatId}" class="w-full bg-gray-700 text-white text-xs p-2 rounded border border-gray-600" placeholder="Chat ID">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs text-gray-400 mb-1">Target ($)</label>
              <input id="targetAmount" type="number" value="${settings.targetAmount}" class="w-full bg-gray-700 text-white text-xs p-2 rounded border border-gray-600">
            </div>
            <div>
              <label class="block text-xs text-gray-400 mb-1">Investment ($)</label>
              <input id="initialInvestment" type="number" value="${settings.initialInvestment}" class="w-full bg-gray-700 text-white text-xs p-2 rounded border border-gray-600">
            </div>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">Max Loss ($)</label>
            <input id="maxLoss" type="number" value="${settings.maxLoss}" class="w-full bg-gray-700 text-white text-xs p-2 rounded border border-gray-600">
          </div>
          <button id="saveBtn" class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm">
            Save Settings
          </button>
        </div>
      </div>
    `;
    
    document.getElementById('backBtn').addEventListener('click', () => {
      showSettings = false;
      updateUI();
    });
    
    document.getElementById('saveBtn').addEventListener('click', () => {
      settings.botToken = document.getElementById('botToken').value;
      settings.chatId = document.getElementById('chatId').value;
      settings.targetAmount = parseFloat(document.getElementById('targetAmount').value) || 0;
      settings.initialInvestment = parseFloat(document.getElementById('initialInvestment').value) || 0;
      settings.maxLoss = parseFloat(document.getElementById('maxLoss').value) || 0;
      saveSettings();
      showSettings = false;
      updateUI();
    });
  }
  
  function renderDashboard() {
    const statusText = isTrading ? 'RUNNING' : 'STOPPED';
    const statusColor = isTrading ? 'text-cyan-400 animate-pulse' : 'text-yellow-400';
    const buttonText = isTrading ? 'Stop Trading' : 'Start Trading';
    const buttonColor = isTrading ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700';
    const canStart = settings.botToken && settings.chatId && settings.targetAmount > 0 && settings.initialInvestment > 0;
    
    root.innerHTML = `
      <div class="p-4 max-w-sm">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-lg font-bold text-white">BFSS Auto Trade</h1>
          <button id="settingsBtn" class="text-gray-400 hover:text-white">⚙️</button>
        </div>
        <div class="grid grid-cols-2 gap-2 mb-4">
          <div class="bg-gray-800 p-2 rounded text-center">
            <p class="text-xs text-gray-400">Current P/L</p>
            <p class="text-sm font-bold ${currentProfit >= 0 ? 'text-green-400' : 'text-red-400'}">$${currentProfit.toFixed(2)}</p>
          </div>
          <div class="bg-gray-800 p-2 rounded text-center">
            <p class="text-xs text-gray-400">Status</p>
            <p class="text-sm font-bold ${statusColor}">${statusText}</p>
          </div>
          <div class="bg-gray-800 p-2 rounded text-center">
            <p class="text-xs text-gray-400">Next Bet</p>
            <p class="text-sm font-bold text-indigo-400">$${currentInvestment.toFixed(2)}</p>
          </div>
          <div class="bg-gray-800 p-2 rounded text-center">
            <p class="text-xs text-gray-400">Current Asset</p>
            <p class="text-sm font-bold text-cyan-400">${currentAsset}</p>
          </div>
        </div>
        <button id="tradingBtn" class="w-full ${buttonColor} text-white font-medium py-2 px-4 rounded-md transition-colors text-sm ${!canStart && !isTrading ? 'opacity-50 cursor-not-allowed' : ''}" ${!canStart && !isTrading ? 'disabled' : ''}>
          ${buttonText}
        </button>
        ${!isTrading && settings.initialInvestment > 0 ? '<button id="testBtn" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-1 px-4 rounded-md transition-colors text-xs mt-2">Test Trade</button>' : ''}
        ${!canStart ? '<p class="text-xs text-red-400 mt-2 text-center">Configure settings first</p>' : ''}
      </div>
    `;
    
    document.getElementById('settingsBtn').addEventListener('click', () => {
      showSettings = true;
      updateUI();
    });
    
    if (canStart || isTrading) {
      document.getElementById('tradingBtn').addEventListener('click', toggleTrading);
    }
    
    const testBtn = document.getElementById('testBtn');
    if (testBtn) {
      testBtn.addEventListener('click', () => {
        if (settings.initialInvestment <= 0) {
          alert('Please set initial investment amount first');
          return;
        }
        const testSignal = { direction: 'BUY', asset: 'EURUSD' };
        currentInvestment = settings.initialInvestment;
        executeTrade(testSignal);
      });
    }
  }
  
  function toggleTrading() {
    isTrading = !isTrading;
    
    if (isTrading) {
      currentInvestment = settings.initialInvestment;
      startTelegramMonitoring();
    } else {
      stopTelegramMonitoring();
    }
    
    updateUI();
  }
  
  let telegramInterval;
  
  function startTelegramMonitoring() {
    // Monitor Telegram for signals every 5 seconds
    telegramInterval = setInterval(async () => {
      if (!isTrading) return;
      
      try {
        const updates = await getTelegramUpdates();
        const signal = parseSignal(updates);
        
        if (signal) {
          executeTrade(signal);
        }
      } catch (error) {
        console.error('Telegram monitoring error:', error);
      }
    }, 5000);
  }
  
  function stopTelegramMonitoring() {
    if (telegramInterval) {
      clearInterval(telegramInterval);
    }
  }
  
  let lastUpdateId = 0;
  
  async function getTelegramUpdates() {
    const url = `https://api.telegram.org/bot${settings.botToken}/getUpdates?offset=${lastUpdateId + 1}&limit=1&timeout=1`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.result && data.result.length > 0) {
      lastUpdateId = data.result[0].update_id;
    }
    
    return data;
  }
  
  function parseSignal(updates) {
    // Parse telegram message for trading signals
    // Supported formats: "BUY EURUSD", "SELL BTCUSD", "CALL GBPJPY", "PUT AUDCAD"
    if (updates.result && updates.result.length > 0) {
      const message = updates.result[0].message?.text?.toUpperCase();
      if (message) {
        const words = message.split(' ');
        let direction = null;
        let asset = null;
        
        // Check for different signal formats
        if (message.includes('BUY') || message.includes('CALL')) {
          direction = 'BUY';
          asset = words[1] || 'UNKNOWN';
        } else if (message.includes('SELL') || message.includes('PUT')) {
          direction = 'SELL';
          asset = words[1] || 'UNKNOWN';
        }
        
        // Also check for asset pairs like EURUSD, GBPJPY, etc.
        const assetPattern = /([A-Z]{6,})/;
        const assetMatch = message.match(assetPattern);
        if (assetMatch && !asset) {
          asset = assetMatch[1];
        }
        
        if (direction && asset) {
          return { direction, asset };
        }
      }
    }
    return null;
  }
  
  function executeTrade(signal) {
    // Update current asset being traded
    currentAsset = signal.asset;
    
    // Simulate trade execution with Martingale strategy
    const isWin = Math.random() > 0.4; // 60% win rate simulation
    const tradeAmount = currentInvestment;
    
    // Create trade record
    const trade = {
      id: Date.now(),
      asset: signal.asset,
      direction: signal.direction,
      amount: tradeAmount,
      result: isWin ? 'WIN' : 'LOSS',
      profit: 0,
      timestamp: new Date().toLocaleTimeString()
    };
    
    if (isWin) {
      const profit = tradeAmount * 0.8; // 80% payout
      trade.profit = profit;
      currentProfit += profit;
      currentInvestment = settings.initialInvestment; // Reset to initial
    } else {
      trade.profit = -tradeAmount;
      currentProfit -= tradeAmount;
      currentInvestment *= 2; // Double for next trade (Martingale)
    }
    
    // Add to trade history
    tradeHistory.unshift(trade);
    if (tradeHistory.length > 10) tradeHistory.pop(); // Keep last 10 trades
    
    // Check stop conditions
    if (currentProfit >= settings.targetAmount) {
      isTrading = false;
      stopTelegramMonitoring();
      currentAsset = 'None';
      alert(`Target reached! Final P/L: $${currentProfit.toFixed(2)}`);
    } else if (Math.abs(currentProfit) >= settings.maxLoss) {
      isTrading = false;
      stopTelegramMonitoring();
      currentAsset = 'None';
      alert(`Max loss reached! Final P/L: $${currentProfit.toFixed(2)}`);
    }
    
    updateUI();
  }
  
  // Initial UI render
  updateUI();
});