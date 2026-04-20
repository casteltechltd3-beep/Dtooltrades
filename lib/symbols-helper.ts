// Helper for organizing and categorizing market symbols with colors

export const SYMBOL_CATEGORIES = {
  forex: {
    name: 'Forex',
    icon: '💱',
    color: '#a855f7',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/50',
  },
  crypto: {
    name: 'Crypto',
    icon: '₿',
    color: '#f97316',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/50',
  },
  commodities: {
    name: 'Commodities',
    icon: '📦',
    color: '#f59e0b',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/50',
  },
  stocks: {
    name: 'Stocks',
    icon: '📈',
    color: '#3b82f6',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/50',
  },
  indices: {
    name: 'Indices',
    icon: '📊',
    color: '#06b6d4',
    bgColor: 'bg-cyan-500/20',
    borderColor: 'border-cyan-500/50',
  },
  synthetic: {
    name: 'Synthetics',
    icon: '🎲',
    color: '#10b981',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/50',
  },
}

export const POPULAR_SYMBOLS = [
  // Forex
  { symbol: 'EURUSD', name: 'EUR/USD', category: 'forex', color: '#a855f7' },
  { symbol: 'GBPUSD', name: 'GBP/USD', category: 'forex', color: '#a855f7' },
  { symbol: 'USDJPY', name: 'USD/JPY', category: 'forex', color: '#a855f7' },
  { symbol: 'AUDUSD', name: 'AUD/USD', category: 'forex', color: '#a855f7' },

  // Crypto
  { symbol: 'BTCUSD', name: 'BTC/USD', category: 'crypto', color: '#f97316' },
  { symbol: 'ETHUSD', name: 'ETH/USD', category: 'crypto', color: '#f97316' },
  { symbol: 'LTCUSD', name: 'LTC/USD', category: 'crypto', color: '#f97316' },

  // Commodities
  { symbol: 'XAUUSD', name: 'Gold/USD', category: 'commodities', color: '#f59e0b' },
  { symbol: 'XAGUSD', name: 'Silver/USD', category: 'commodities', color: '#f59e0b' },

  // Stocks
  { symbol: 'AAPL', name: 'Apple Inc.', category: 'stocks', color: '#3b82f6' },
  { symbol: 'MSFT', name: 'Microsoft', category: 'stocks', color: '#3b82f6' },
  { symbol: 'GOOGL', name: 'Alphabet', category: 'stocks', color: '#3b82f6' },

  // Indices
  { symbol: 'SPX500', name: 'S&P 500', category: 'indices', color: '#06b6d4' },
  { symbol: 'NDX', name: 'Nasdaq 100', category: 'indices', color: '#06b6d4' },

  // Synthetics
  { symbol: 'R_100', name: 'Volatility Index 100', category: 'synthetic', color: '#10b981' },
  { symbol: 'R_50', name: 'Volatility Index 50', category: 'synthetic', color: '#10b981' },
]

export function getCategoryConfig(category: string) {
  return SYMBOL_CATEGORIES[category as keyof typeof SYMBOL_CATEGORIES] || SYMBOL_CATEGORIES.synthetic
}

export function getSymbolColor(symbol: string): string {
  const found = POPULAR_SYMBOLS.find(s => s.symbol === symbol)
  if (found) return found.color
  
  // Hash-based color fallback
  const colors = ['#6366f1', '#a855f7', '#ec4899', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6']
  let hash = 0
  for (let i = 0; i < symbol.length; i++) {
    hash = ((hash << 5) - hash) + symbol.charCodeAt(i)
  }
  return colors[Math.abs(hash) % colors.length]
}
