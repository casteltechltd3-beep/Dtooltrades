'use client'

import React, { useState } from 'react'
import { Sun, Moon, LogOut, ChevronDown, Activity } from 'lucide-react'
import { POPULAR_SYMBOLS, SYMBOL_CATEGORIES } from '@/lib/symbols-helper'

interface ModernHeaderProps {
  theme?: 'light' | 'dark'
  toggleTheme?: () => void
  currentSymbol: string
  onSymbolChange?: (symbol: string) => void
  currentPrice: number
  lastDigit?: number
  ticks: number | string
  activeTab?: string
  onTabChange?: (tab: string) => void
  onLogout?: () => void
}

export function ModernHeader({
  theme = 'dark',
  toggleTheme,
  currentSymbol = 'EURUSD',
  onSymbolChange,
  currentPrice = 0,
  lastDigit,
  ticks = 0,
  activeTab,
  onTabChange,
  onLogout,
}: ModernHeaderProps) {
  const [symbolDropdownOpen, setSymbolDropdownOpen] = useState(false)

  const TRADING_TABS = [
    { id: 'autobot', label: 'AutoBot' },
    { id: 'automated', label: 'Automated' },
    { id: 'signals', label: 'Signals' },
    { id: 'super-signals', label: 'Super Signals' },
    { id: 'advanced-signals', label: 'Advanced Signals' },
  ]

  const getSymbolColor = (symbol: string) => {
    const found = POPULAR_SYMBOLS.find(s => s.symbol === symbol)
    return found?.color || '#6366f1'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-6 pb-4">
      {/* Glassmorphic background */}
      <div className="absolute inset-0 glass pointer-events-none rounded-2xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Top Section - Logo & Market Info Cards */}
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl glass neumi-sm flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">DToolTrades</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Trading Platform</p>
            </div>
          </div>

          {/* Market Info Cards - 1 Line, Equal Spacing */}
          <div className="flex-1 mx-8 flex items-center gap-3">
            {/* Symbol Card */}
            <div className="glass neumi-sm px-4 py-3 rounded-xl flex-1 hover-lift transition-smooth">
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-wide mb-1">Market</p>
              <div className="relative">
                <button
                  onClick={() => setSymbolDropdownOpen(!symbolDropdownOpen)}
                  className="w-full flex items-center justify-between text-lg font-bold text-foreground hover:text-primary transition-colors"
                  style={{ color: getSymbolColor(currentSymbol) }}
                >
                  {currentSymbol}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>

                {/* Symbol Dropdown */}
                {symbolDropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 right-0 glass rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
                    {Object.entries(SYMBOL_CATEGORIES).map(([catKey, category]) => {
                      const catSymbols = POPULAR_SYMBOLS.filter(s => s.category === catKey)
                      return catSymbols.length > 0 ? (
                        <div key={catKey}>
                          <div className="px-4 py-2.5 border-b border-border/30 bg-white/5">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                              {category.icon} {category.name}
                            </p>
                          </div>
                          {catSymbols.map(sym => (
                            <button
                              key={sym.symbol}
                              onClick={() => {
                                onSymbolChange?.(sym.symbol)
                                setSymbolDropdownOpen(false)
                              }}
                              className="w-full px-4 py-2.5 text-left border-b border-border/20 hover:bg-white/10 transition-colors"
                            >
                              <p className="text-sm font-bold" style={{ color: sym.color }}>
                                {sym.symbol}
                              </p>
                              <p className="text-xs text-muted-foreground">{sym.name}</p>
                            </button>
                          ))}
                        </div>
                      ) : null
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Price Card */}
            <div className="glass neumi-sm px-4 py-3 rounded-xl flex-1 hover-lift transition-smooth bg-gradient-cyan">
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-wide mb-1">Price</p>
              <p className="text-lg font-bold text-foreground">${currentPrice.toFixed(2)}</p>
            </div>

            {/* Last Digit Card */}
            <div className="glass neumi-sm px-4 py-3 rounded-xl flex-1 hover-lift transition-smooth bg-gradient-orange">
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-wide mb-1">Last Digit</p>
              <p className="text-lg font-bold text-foreground">{lastDigit !== undefined ? lastDigit : '-'}</p>
            </div>

            {/* Ticks Card */}
            <div className="glass neumi-sm px-4 py-3 rounded-xl flex-1 hover-lift transition-smooth bg-gradient-purple">
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-wide mb-1">Ticks</p>
              <p className="text-lg font-bold text-foreground">{ticks}</p>
            </div>

            {/* Status Card */}
            <div className="glass neumi-sm px-4 py-3 rounded-xl flex-1 hover-lift transition-smooth bg-gradient-green">
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-wide mb-1">Status</p>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-success animate-pulse" />
                <span className="text-sm font-bold text-success">Live</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="glass neumi-sm p-2.5 rounded-xl hover-lift transition-smooth hover:hover-glow"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={onLogout}
              className="glass neumi-sm p-2.5 rounded-xl hover-lift transition-smooth hover:hover-glow"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto">
          {TRADING_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`glass neumi-sm px-6 py-3 rounded-xl font-bold uppercase tracking-wide text-sm transition-smooth hover-lift whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-cyan text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
