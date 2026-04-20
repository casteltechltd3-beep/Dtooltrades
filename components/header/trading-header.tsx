"use client"

import React, { useState, useMemo } from "react"
import {
  ChevronDown,
  Zap,
  Activity,
  TrendingUp,
  Wallet,
  Globe,
  Search,
  Bell,
  LogOut,
  Settings,
} from "lucide-react"
import { useRouter } from "next/navigation"

const MARKET_SYMBOLS = {
  "Forex": [
    { symbol: "EURUSD", name: "EUR/USD", price: 1.0945, change: 0.15 },
    { symbol: "GBPUSD", name: "GBP/USD", price: 1.2847, change: -0.22 },
    { symbol: "USDJPY", name: "USD/JPY", price: 149.85, change: 0.48 },
    { symbol: "AUDUSD", name: "AUD/USD", price: 0.6542, change: 0.31 },
    { symbol: "NZDUSD", name: "NZD/USD", price: 0.5998, change: -0.18 },
    { symbol: "USDCAD", name: "USD/CAD", price: 1.3265, change: 0.22 },
    { symbol: "USDCHF", name: "USD/CHF", price: 0.8825, change: -0.35 },
    { symbol: "EURGBP", name: "EUR/GBP", price: 0.8527, change: 0.18 },
    { symbol: "EURJPY", name: "EUR/JPY", price: 163.45, change: 0.62 },
    { symbol: "GBPJPY", name: "GBP/JPY", price: 191.28, change: 0.71 },
  ],
  "Commodities": [
    { symbol: "XAUUSD", name: "Gold", price: 2087.50, change: 1.25 },
    { symbol: "XAGUSD", name: "Silver", price: 24.95, change: 0.82 },
    { symbol: "WTIUSD", name: "WTI Crude Oil", price: 82.45, change: -1.15 },
    { symbol: "XPTUSD", name: "Platinum", price: 1045.75, change: 0.45 },
    { symbol: "XPDUSD", name: "Palladium", price: 1142.30, change: 1.85 },
    { symbol: "BRENT", name: "Brent Crude", price: 87.92, change: -0.92 },
    { symbol: "NATGAS", name: "Natural Gas", price: 3.18, change: 2.15 },
    { symbol: "COPPER", name: "Copper", price: 4.52, change: 1.35 },
  ],
  "Indices": [
    { symbol: "US100", name: "Nasdaq 100", price: 19245.50, change: 2.15 },
    { symbol: "US30", name: "Dow Jones 30", price: 38547.20, change: 1.85 },
    { symbol: "US500", name: "S&P 500", price: 5112.75, change: 1.45 },
    { symbol: "UK100", name: "FTSE 100", price: 7924.30, change: 0.65 },
    { symbol: "DE40", name: "DAX 40", price: 18425.80, change: 1.25 },
    { symbol: "FR40", name: "CAC 40", price: 7482.95, change: 0.85 },
    { symbol: "JP225", name: "Nikkei 225", price: 28645.20, change: 2.45 },
    { symbol: "AU200", name: "ASX 200", price: 7854.60, change: 1.15 },
  ],
  "Crypto": [
    { symbol: "BTC", name: "Bitcoin", price: 45230.50, change: 3.25 },
    { symbol: "ETH", name: "Ethereum", price: 2450.75, change: 2.80 },
    { symbol: "ADA", name: "Cardano", price: 0.98, change: 1.50 },
    { symbol: "SOL", name: "Solana", price: 189.45, change: 4.20 },
    { symbol: "XRP", name: "Ripple", price: 2.45, change: 2.85 },
    { symbol: "DOGE", name: "Dogecoin", price: 0.32, change: 5.15 },
    { symbol: "BNB", name: "Binance Coin", price: 612.50, change: 3.70 },
    { symbol: "AVAX", name: "Avalanche", price: 38.92, change: 2.20 },
  ],
  "Stocks": [
    { symbol: "AAPL", name: "Apple Inc.", price: 189.50, change: 1.25 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 415.75, change: 0.95 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 152.40, change: 1.85 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 242.80, change: 2.15 },
    { symbol: "AMZN", name: "Amazon.com", price: 182.35, change: 1.45 },
    { symbol: "META", name: "Meta Platforms", price: 485.20, change: 2.35 },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.50, change: 3.15 },
    { symbol: "NFLX", name: "Netflix Inc.", price: 425.80, change: 1.75 },
  ],
}

interface HeaderProps {
  onMarketSelect?: (symbol: string) => void
}

export function TradingHeader({ onMarketSelect }: HeaderProps) {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [selectedMarket, setSelectedMarket] = useState("EURUSD")
  const [searchOpen, setSearchOpen] = useState(false)

  const currentMarket = useMemo(() => {
    for (const category in MARKET_SYMBOLS) {
      const found = MARKET_SYMBOLS[category as keyof typeof MARKET_SYMBOLS].find(
        (m) => m.symbol === selectedMarket
      )
      if (found) return found
    }
    return MARKET_SYMBOLS["Forex"][0]
  }, [selectedMarket])

  const handleMarketSelect = (symbol: string) => {
    setSelectedMarket(symbol)
    setOpenDropdown(null)
    onMarketSelect?.(symbol)
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <header className="bg-gradient-to-r from-[#0f1419] via-[#1a1f2e] to-[#0f1419] border-b border-blue-500/20 backdrop-blur-2xl sticky top-0 z-40 shadow-2xl">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Left: Logo & Market Selector */}
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="hidden md:block font-black text-white text-lg">ExperTool</span>
          </div>

          {/* Market Selector */}
          <div className="relative group">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "markets" ? null : "markets")
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/10 transition-all group-hover:shadow-lg group-hover:shadow-blue-500/20"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-sm text-white hidden sm:block">
                {selectedMarket}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-blue-400 transition-transform ${
                  openDropdown === "markets" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "markets" && (
              <div className="absolute top-full mt-2 left-0 w-80 bg-[#0a0f1a] border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden z-50">
                {Object.entries(MARKET_SYMBOLS).map(([category, symbols]) => (
                  <div key={category}>
                    <div className="px-4 py-2 bg-blue-500/10 border-b border-blue-500/20 text-xs font-bold text-blue-300 uppercase">
                      {category}
                    </div>
                    {symbols.map((market) => (
                      <button
                        key={market.symbol}
                        onClick={() => handleMarketSelect(market.symbol)}
                        className="w-full px-4 py-3 hover:bg-blue-500/20 border-b border-white/5 last:border-b-0 text-left transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-white text-sm">
                              {market.symbol}
                            </p>
                            <p className="text-[10px] text-gray-500">{market.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-white text-sm">
                              {market.price.toFixed(2)}
                            </p>
                            <p
                              className={`text-[10px] font-bold ${
                                market.change >= 0
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {market.change > 0 ? "+" : ""}
                              {market.change}%
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Live HUD Stats */}
        <div className="hidden lg:flex items-center gap-6 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
          <div className="text-center min-w-max">
            <p className="text-[10px] font-bold text-gray-500 uppercase">
              Account Balance
            </p>
            <p className="font-bold text-white">$50,000.00</p>
          </div>
          <div className="w-px h-8 bg-blue-500/30"></div>
          <div className="text-center min-w-max">
            <p className="text-[10px] font-bold text-gray-500 uppercase">Equity</p>
            <p className="font-bold text-white">$51,250.50</p>
          </div>
          <div className="w-px h-8 bg-blue-500/30"></div>
          <div className="text-center min-w-max">
            <p className="text-[10px] font-bold text-gray-500 uppercase">
              Open Trades
            </p>
            <p className="font-bold text-cyan-400">3</p>
          </div>
          <div className="w-px h-8 bg-blue-500/30"></div>
          <div className="text-center min-w-max flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase">Status</p>
              <p className="font-bold text-green-400 text-sm">Connected</p>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 ml-auto shrink-0">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 hover:bg-white/5 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/20 relative group"
          >
            <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
          </button>

          {/* Notifications */}
          <button className="p-2.5 hover:bg-white/5 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/20 relative group">
            <Bell className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Settings */}
          <button className="p-2.5 hover:bg-white/5 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/20 relative group hidden md:block">
            <Settings className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-2 pl-3 border-l border-white/10">
            <div className="hidden sm:flex flex-col items-end text-right">
              <p className="text-xs font-bold text-white leading-none">Admin</p>
              <p className="text-[10px] text-gray-500 leading-tight">System</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2.5 hover:bg-red-500/20 rounded-lg transition-all hover:shadow-lg hover:shadow-red-500/20 group"
            >
              <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="px-6 pb-4 border-t border-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search markets, symbols, strategies..."
              className="w-full bg-white/5 border border-blue-500/30 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/60 focus:bg-blue-500/10 transition-all"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  )
}
