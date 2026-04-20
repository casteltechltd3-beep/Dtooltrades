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

// Continuous Indices Only - Real Deriv Markets
const MARKET_SYMBOLS = {
  "Continuous Indices": [
    { symbol: "R_100", name: "Volatility 100", price: 0, change: 0 },
    { symbol: "R_50", name: "Volatility 50", price: 0, change: 0 },
    { symbol: "R_25", name: "Volatility 25", price: 0, change: 0 },
    { symbol: "RDBULL", name: "Bull Market Index", price: 0, change: 0 },
    { symbol: "RDBEAR", name: "Bear Market Index", price: 0, change: 0 },
  ],
}

interface HeaderProps {
  onMarketSelect?: (symbol: string) => void
}

export function TradingHeader({ onMarketSelect }: HeaderProps) {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [selectedMarket, setSelectedMarket] = useState("R_100")
  const [searchOpen, setSearchOpen] = useState(false)

  const currentMarket = useMemo(() => {
    for (const category in MARKET_SYMBOLS) {
      const found = MARKET_SYMBOLS[category as keyof typeof MARKET_SYMBOLS].find(
        (m) => m.symbol === selectedMarket
      )
      if (found) return found
    }
    return MARKET_SYMBOLS["Continuous Indices"][0]
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
    <header className="bg-background border-b border-primary/20 backdrop-blur-2xl sticky top-0 z-40 shadow-2xl shadow-primary/10">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Left: Logo & Market Selector */}
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shadow-lg shadow-primary/20 border border-primary/30">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <span className="hidden md:block font-black text-foreground text-lg">ExperTool</span>
          </div>

          {/* Market Selector */}
          <div className="relative group">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "markets" ? null : "markets")
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 hover:border-primary/60 hover:bg-primary/20 transition-all group-hover:shadow-lg group-hover:shadow-primary/20"
            >
              <Globe className="w-4 h-4 text-primary/60" />
              <span className="font-bold text-sm text-foreground hidden sm:block">
                {selectedMarket}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-primary/60 transition-transform ${
                  openDropdown === "markets" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "markets" && (
              <div className="absolute top-full mt-2 left-0 w-80 bg-card border border-primary/30 rounded-xl shadow-2xl overflow-hidden z-50">
                {Object.entries(MARKET_SYMBOLS).map(([category, symbols]) => (
                  <div key={category}>
                    <div className="px-4 py-2 bg-primary/10 border-b border-primary/20 text-xs font-bold text-primary/80 uppercase">
                      {category}
                    </div>
                    {symbols.map((market) => (
                      <button
                        key={market.symbol}
                        onClick={() => handleMarketSelect(market.symbol)}
                        className="w-full px-4 py-3 hover:bg-primary/20 border-b border-border last:border-b-0 text-left transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-foreground text-sm">
                              {market.symbol}
                            </p>
                            <p className="text-[10px] text-muted-foreground">{market.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground text-sm">
                              {market.price.toFixed(2)}
                            </p>
                            <p
                              className={`text-[10px] font-bold ${
                                market.change >= 0
                                  ? "text-chart-4"
                                  : "text-destructive"
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
        <div className="hidden lg:flex items-center gap-6 px-6 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <div className="text-center min-w-max">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">
              Account Balance
            </p>
            <p className="font-bold text-foreground">$50,000.00</p>
          </div>
          <div className="w-px h-8 bg-primary/30"></div>
          <div className="text-center min-w-max">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Equity</p>
            <p className="font-bold text-foreground">$51,250.50</p>
          </div>
          <div className="w-px h-8 bg-primary/30"></div>
          <div className="text-center min-w-max">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">
              Open Trades
            </p>
            <p className="font-bold text-chart-4">3</p>
          </div>
          <div className="w-px h-8 bg-primary/30"></div>
          <div className="text-center min-w-max flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-4 animate-pulse"></div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Status</p>
              <p className="font-bold text-chart-4 text-sm">Connected</p>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 ml-auto shrink-0">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 hover:bg-primary/10 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 relative group"
          >
            <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </button>

          {/* Notifications */}
          <button className="p-2.5 hover:bg-primary/10 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 relative group">
            <Bell className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
          </button>

          {/* Settings */}
          <button className="p-2.5 hover:bg-primary/10 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 relative group hidden md:block">
            <Settings className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <div className="hidden sm:flex flex-col items-end text-right">
              <p className="text-xs font-bold text-foreground leading-none">Admin</p>
              <p className="text-[10px] text-muted-foreground leading-tight">System</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2.5 hover:bg-destructive/20 rounded-lg transition-all hover:shadow-lg hover:shadow-destructive/20 group"
            >
              <LogOut className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="px-6 pb-4 border-t border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search continuous indices..."
              className="w-full bg-primary/10 border border-primary/30 rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:bg-primary/20 transition-all"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  )
}
