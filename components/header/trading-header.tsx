"use client"

import React, { useState } from "react"
import { ChevronDown, Sun, Moon, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

// Trading strategy tabs
const TRADING_TABS = [
  { id: "smart-adaptive", label: "Smart Adaptive" },
  { id: "smart-analysis", label: "Smart Analysis" },
  { id: "smartauto24", label: "SmartAuto24" },
  { id: "autobot", label: "Auto Bot" },
  { id: "automated", label: "Automated" },
  { id: "signals", label: "Signals" },
  { id: "pro-signals", label: "Pro Signals" },
  { id: "super-signals", label: "Super Signals" },
  { id: "advanced-signals", label: "Advanced Signals" },
  { id: "even", label: "Even" },
]

// Continuous Indices Only
const MARKET_SYMBOLS = [
  { symbol: "R_100", name: "Volatility 100 (15) Index", price: 823809.96, lastDigit: 6, ticks: "536 / 1000" },
  { symbol: "R_50", name: "Volatility 50 (15) Index", price: 0, lastDigit: 0, ticks: "0 / 0" },
  { symbol: "R_25", name: "Volatility 25 (15) Index", price: 0, lastDigit: 0, ticks: "0 / 0" },
  { symbol: "RDBULL", name: "Bull Market Index", price: 0, lastDigit: 0, ticks: "0 / 0" },
  { symbol: "RDBEAR", name: "Bear Market Index", price: 0, lastDigit: 0, ticks: "0 / 0" },
]

interface HeaderProps {
  activeTab?: string
  onTabChange?: (tabId: string) => void
  onMarketSelect?: (symbol: string) => void
  currentPrice?: number
  lastDigit?: number
  ticks?: string
  theme?: "light" | "dark"
  onThemeChange?: (theme: "light" | "dark") => void
}

export function TradingHeader({
  activeTab = "smart-adaptive",
  onTabChange,
  onMarketSelect,
  currentPrice = 823809.96,
  lastDigit = 6,
  ticks = "536 / 1000",
  theme = "dark",
  onThemeChange,
}: HeaderProps) {
  const router = useRouter()
  const [selectedMarket, setSelectedMarket] = useState("R_100")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const currentMarket = MARKET_SYMBOLS.find((m) => m.symbol === selectedMarket) || MARKET_SYMBOLS[0]

  const handleMarketSelect = (symbol: string) => {
    setSelectedMarket(symbol)
    setDropdownOpen(false)
    onMarketSelect?.(symbol)
  }

  const handleTabChange = (tabId: string) => {
    onTabChange?.(tabId)
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const toggleTheme = () => {
    onThemeChange?.(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      {/* Top Bar */}
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="font-bold text-primary text-lg">P</span>
          </div>
          <div className="flex flex-col leading-tight">
            <p className="font-bold text-foreground text-base">Expertool</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Trading</p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Account Button */}
          <button className="px-3 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">
            Account
          </button>

          {/* Risk Button */}
          <button className="px-3 py-2 rounded-lg border border-destructive/50 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2">
            <span className="text-lg">⚠</span>
            Risk
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Sign Up Button */}
          <button className="px-3 py-2 rounded-lg border border-chart-4/50 text-sm font-medium text-chart-4 hover:bg-chart-4/10 transition-colors flex items-center gap-2">
            <span className="text-lg">→</span>
            Sign Up
          </button>

          {/* Login Button */}
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/80 transition-colors">
            Login
          </button>
        </div>
      </div>

      {/* Trading Tabs */}
      <div className="px-6 py-3 border-b border-border overflow-x-auto">
        <div className="flex gap-6 min-w-min">
          {TRADING_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`text-sm font-medium whitespace-nowrap pb-1 transition-colors relative ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Market Info Bar */}
      <div className="px-6 py-3 flex items-center justify-start gap-6 flex-wrap">
        {/* Market Selection */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-primary/10 transition-colors"
          >
            <span className="uppercase text-xs text-muted-foreground">Market Selection</span>
            <span className="text-foreground font-bold">{currentMarket.name}</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-full mt-2 left-0 w-80 bg-card border border-border rounded-lg shadow-2xl z-50 overflow-hidden">
              {MARKET_SYMBOLS.map((market) => (
                <button
                  key={market.symbol}
                  onClick={() => handleMarketSelect(market.symbol)}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-primary/20 border-b border-border last:border-b-0 transition-colors"
                >
                  <p className="font-medium text-foreground">{market.name}</p>
                  <p className="text-xs text-muted-foreground">{market.symbol}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Display */}
        <div className="flex flex-col gap-0.5">
          <p className="text-xs uppercase text-muted-foreground tracking-wide">Price</p>
          <p className="text-lg font-bold text-chart-4">{currentPrice.toFixed(2)}</p>
        </div>

        {/* Last Digit */}
        <div className="flex flex-col gap-0.5">
          <p className="text-xs uppercase text-muted-foreground tracking-wide">Last Digit</p>
          <div className="px-2.5 py-1 rounded border border-secondary/50 bg-secondary/10">
            <p className="text-lg font-bold text-secondary">{lastDigit}</p>
          </div>
        </div>

        {/* Ticks */}
        <div className="flex flex-col gap-0.5">
          <p className="text-xs uppercase text-muted-foreground tracking-wide">Ticks</p>
          <p className="text-base font-bold text-chart-4">{ticks}</p>
        </div>

        {/* Watch */}
        <div className="flex flex-col gap-0.5">
          <p className="text-xs uppercase text-muted-foreground tracking-wide">Watch</p>
          <p className="text-base font-medium text-muted-foreground">D</p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="ml-auto p-2 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
