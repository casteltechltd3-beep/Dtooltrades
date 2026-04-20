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
  handleTabChange?: (tabId: string) => void
  onMarketSelect?: (symbol: string) => void
  currentPrice?: number
  lastDigit?: number | undefined
  ticks?: number | string
  theme?: "light" | "dark"
  toggleTheme?: () => void
  currentMarket?: { name: string; symbol: string }
  handleLogout?: () => void
  siteConfig?: any
}

export function TradingHeader({
  activeTab = "smart-adaptive",
  handleTabChange,
  onMarketSelect,
  currentPrice = 823809.96,
  lastDigit = 6,
  ticks = 536,
  theme = "dark",
  toggleTheme,
  currentMarket,
  handleLogout: onLogout,
  siteConfig,
}: HeaderProps) {
  const router = useRouter()
  const [selectedMarket, setSelectedMarket] = useState(currentMarket?.symbol || "R_100")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const market = currentMarket || MARKET_SYMBOLS.find((m) => m.symbol === selectedMarket) || MARKET_SYMBOLS[0]

  const handleMarketSelect = (symbol: string) => {
    setSelectedMarket(symbol)
    setDropdownOpen(false)
    onMarketSelect?.(symbol)
  }

  const handleTabChangeLocal = (tabId: string) => {
    handleTabChange?.(tabId)
  }

  const handleLogoutLocal = async () => {
    if (onLogout) {
      onLogout()
    } else {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
    }
  }

  const toggleThemeLocal = () => {
    toggleTheme?.()
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      {/* Top Bar - Logo and Auth */}
      <div className="px-6 py-4 flex items-center justify-between gap-4 border-b border-border/50">
        {/* Left: Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center border border-primary/30">
            <span className="font-bold text-primary-foreground text-lg">D</span>
          </div>
          <div className="flex flex-col leading-tight">
            <p className="font-bold text-foreground text-base">DTOOLTRADES</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Platform</p>
          </div>
        </div>

        {/* Center: Market Info */}
        <div className="flex items-center gap-8 flex-1 ml-12">
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase text-muted-foreground font-semibold">Market</p>
            <p className="text-sm font-bold text-foreground">{market.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase text-muted-foreground font-semibold">Price</p>
            <p className="text-sm font-bold text-primary">{(currentPrice || 0).toFixed(2)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase text-muted-foreground font-semibold">Last Digit</p>
            <div className="px-2.5 py-0.5 rounded-md border border-secondary/50 bg-secondary/10">
              <p className="text-sm font-bold text-secondary">{lastDigit !== undefined ? lastDigit : "-"}</p>
            </div>
          </div>
        </div>

        {/* Right: Auth & Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Account Button */}
          <button className="px-4 py-2 rounded-md border border-border text-sm font-bold text-foreground hover:bg-border/50 hover:border-border transition-all uppercase tracking-wider">
            Account
          </button>

          {/* Risk Button */}
          <button className="px-4 py-2 rounded-md border border-destructive/60 text-sm font-bold text-destructive hover:bg-destructive/10 transition-all uppercase tracking-wider flex items-center gap-2">
            <span>⚠</span>
            Risk
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleThemeLocal}
            className="p-2 rounded-md border border-border text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Sign Up Button */}
          <button className="px-4 py-2 rounded-md border border-accent/60 text-sm font-bold text-accent hover:bg-accent/10 transition-all uppercase tracking-wider">
            Sign Up
          </button>

          {/* Login Button */}
          <button className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all uppercase tracking-wider">
            Login
          </button>
        </div>
      </div>

      {/* Trading Tabs Bar */}
      <div className="px-6 py-0 border-b border-border/50 overflow-x-auto">
        <div className="flex gap-0 min-w-min">
          {TRADING_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChangeLocal(tab.id)}
              className={`py-3 px-4 text-sm font-bold whitespace-nowrap transition-all relative uppercase tracking-wide border-b-2 ${
                activeTab === tab.id
                  ? "text-primary border-b-primary bg-primary/5"
                  : "text-muted-foreground border-b-transparent hover:text-foreground hover:bg-primary/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Market Info Bar - Detailed */}
      <div className="px-6 py-3 flex items-center justify-start gap-8 flex-wrap border-b border-border/50">
        {/* Market Selection */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm font-bold text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all uppercase tracking-wider"
          >
            <span className="text-xs text-muted-foreground">Symbol</span>
            <span>{market.symbol}</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-full mt-2 left-0 w-80 bg-card border border-border rounded-md shadow-2xl z-50 overflow-hidden">
              {MARKET_SYMBOLS.map((market) => (
                <button
                  key={market.symbol}
                  onClick={() => handleMarketSelect(market.symbol)}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-primary/20 border-b border-border/50 last:border-b-0 transition-colors"
                >
                  <p className="font-bold text-foreground uppercase tracking-wide">{market.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{market.symbol}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ticks Info */}
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Ticks</p>
          <p className="text-sm font-bold text-foreground">{ticks}</p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <p className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Live</p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogoutLocal}
          className="p-2 rounded-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-all"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
