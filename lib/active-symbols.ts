/**
 * Fetch active symbols from Deriv API
 * Reference: https://legacy-api.deriv.com/api-explorer/#active_symbols
 */

export interface ActiveSymbol {
  symbol: string
  display_name: string
  market_display_name: string
  submarket_display_name: string
  market: string
  submarket: string
  pip: string
  allow_forward_starting?: number
  intraday_interval_minutes: number[]
}

const DERIV_API_BASE = 'https://api.deriv.com'
const CACHE_KEY = 'deriv_active_symbols_cache'
const CACHE_DURATION = 3600000 // 1 hour in milliseconds

interface CachedSymbols {
  data: ActiveSymbol[]
  timestamp: number
}

/**
 * Fetch active symbols from Deriv API with caching
 */
export async function fetchActiveSymbols(): Promise<ActiveSymbol[]> {
  try {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached) as CachedSymbols
      if (Date.now() - parsed.timestamp < CACHE_DURATION) {
        return parsed.data
      }
    }

    // Fetch from API
    const response = await fetch(`${DERIV_API_BASE}/api/v3/active_symbols?app_id=1089&symbol_filter=forex,synthetic_index,commodities,cryptocurrencies,stock_index`)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.active_symbols) {
      throw new Error('No active_symbols in response')
    }

    const symbols: ActiveSymbol[] = data.active_symbols

    // Cache the result
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: symbols,
      timestamp: Date.now()
    }))

    return symbols
  } catch (error) {
    console.error('[v0] Error fetching active symbols:', error)
    // Return fallback symbols
    return getDefaultSymbols()
  }
}

/**
 * Get symbols organized by market
 */
export function groupSymbolsByMarket(symbols: ActiveSymbol[]): Map<string, ActiveSymbol[]> {
  const grouped = new Map<string, ActiveSymbol[]>()
  
  symbols.forEach(symbol => {
    const market = symbol.market_display_name || symbol.market || 'Other'
    if (!grouped.has(market)) {
      grouped.set(market, [])
    }
    grouped.get(market)!.push(symbol)
  })

  return grouped
}

/**
 * Default symbols when API is unavailable
 */
function getDefaultSymbols(): ActiveSymbol[] {
  return [
    {
      symbol: 'R_100',
      display_name: 'Volatility 100 Index',
      market_display_name: 'Synthetic Indices',
      submarket_display_name: 'Volatility',
      market: 'synthetic_index',
      submarket: 'volatility',
      pip: '0.0001',
      intraday_interval_minutes: [1, 5, 15, 30, 60]
    },
    {
      symbol: 'EURUSD',
      display_name: 'EUR/USD',
      market_display_name: 'Forex',
      submarket_display_name: 'Major Pairs',
      market: 'forex',
      submarket: 'major_pairs',
      pip: '0.0001',
      intraday_interval_minutes: [1, 5, 15, 30, 60]
    },
    {
      symbol: 'GBPUSD',
      display_name: 'GBP/USD',
      market_display_name: 'Forex',
      submarket_display_name: 'Major Pairs',
      market: 'forex',
      submarket: 'major_pairs',
      pip: '0.0001',
      intraday_interval_minutes: [1, 5, 15, 30, 60]
    },
    {
      symbol: 'USDJPY',
      display_name: 'USD/JPY',
      market_display_name: 'Forex',
      submarket_display_name: 'Major Pairs',
      market: 'forex',
      submarket: 'major_pairs',
      pip: '0.01',
      intraday_interval_minutes: [1, 5, 15, 30, 60]
    },
    {
      symbol: 'BTCUSD',
      display_name: 'BTC/USD',
      market_display_name: 'Cryptocurrencies',
      submarket_display_name: 'Bitcoin',
      market: 'cryptocurrencies',
      submarket: 'bitcoin',
      pip: '0.01',
      intraday_interval_minutes: [1, 5, 15, 30, 60]
    },
    {
      symbol: 'ETHUSD',
      display_name: 'ETH/USD',
      market_display_name: 'Cryptocurrencies',
      submarket_display_name: 'Ethereum',
      market: 'cryptocurrencies',
      submarket: 'ethereum',
      pip: '0.01',
      intraday_interval_minutes: [1, 5, 15, 30, 60]
    },
    {
      symbol: 'XAUUSD',
      display_name: 'XAU/USD (Gold)',
      market_display_name: 'Commodities',
      submarket_display_name: 'Metals',
      market: 'commodities',
      submarket: 'metals',
      pip: '0.01',
      intraday_interval_minutes: [1, 5, 15, 30, 60]
    },
    {
      symbol: 'XPTUSD',
      display_name: 'XPT/USD (Platinum)',
      market_display_name: 'Commodities',
      submarket_display_name: 'Metals',
      market: 'commodities',
      submarket: 'metals',
      pip: '0.01',
      intraday_interval_minutes: [1, 5, 15, 30, 60]
    }
  ]
}
