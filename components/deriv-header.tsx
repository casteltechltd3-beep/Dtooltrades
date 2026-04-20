"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DERIV_CONFIG } from "@/lib/deriv-config"
import { ChevronDown } from "lucide-react"

interface DerivTab {
  id: string
  name: string
  url: string
}

const tabs: DerivTab[] = [
  { id: "trader", name: "DTrader", url: `https://app.deriv.com/dtrader?app_id=${DERIV_CONFIG.APP_ID}` },
  { id: "smarttrader", name: "SmartTrader", url: `https://smarttrader.deriv.com?app_id=${DERIV_CONFIG.APP_ID}` },
  {
    id: "copytrading",
    name: "Copy Trading",
    url: `https://app.deriv.com/appstore/traders-hub?app_id=${DERIV_CONFIG.APP_ID}`,
  },
]

// Popular active symbols
const POPULAR_SYMBOLS = [
  { symbol: "R_100", name: "R/100 VOL", category: "Synthetics" },
  { symbol: "EURUSD", name: "EUR/USD", category: "Forex" },
  { symbol: "GBPUSD", name: "GBP/USD", category: "Forex" },
  { symbol: "USDJPY", name: "USD/JPY", category: "Forex" },
  { symbol: "BTCUSD", name: "BTC/USD", category: "Crypto" },
  { symbol: "ETHUSD", name: "ETH/USD", category: "Crypto" },
  { symbol: "GOLD", name: "Gold", category: "Commodities" },
  { symbol: "OIL", name: "Oil", category: "Commodities" },
]

interface DerivHeaderProps {
  activeTab: DerivTab
  setActiveTab: (tab: DerivTab) => void
  theme?: "light" | "dark"
  currentSymbol?: string
  onSymbolChange?: (symbol: string) => void
}

export function DerivHeader({ 
  activeTab, 
  setActiveTab, 
  theme = "dark",
  currentSymbol = "R_100",
  onSymbolChange
}: DerivHeaderProps) {
  const [showSymbolDropdown, setShowSymbolDropdown] = useState(false)

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 border-b backdrop-blur-xl transition-all duration-300 ${
        theme === "dark" 
          ? "bg-gradient-to-r from-[#0a0a0a]/95 to-[#0f0f15]/95 border-white/8" 
          : "bg-white/98 border-gray-200"
        }`}
    >
      {/* Main Navigation Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
              activeTab.id === tab.id
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-95"
                : theme === "dark"
                  ? "bg-slate-800/40 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:border-indigo-500/30 hover:text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
              }`}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-white/10 hidden sm:block" />

      {/* Symbol Selector */}
      <div className="relative ml-auto">
        <Button
          onClick={() => setShowSymbolDropdown(!showSymbolDropdown)}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            theme === "dark"
              ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 hover:border-indigo-500/50"
              : "bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200"
          }`}
        >
          <span>{currentSymbol}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showSymbolDropdown ? "rotate-180" : ""}`} />
        </Button>

        {/* Dropdown Menu */}
        {showSymbolDropdown && (
          <div className={`absolute right-0 top-full mt-2 rounded-lg shadow-xl z-50 border ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-gray-200"
          } w-56 max-h-96 overflow-y-auto`}>
            {POPULAR_SYMBOLS.map((sym) => (
              <button
                key={sym.symbol}
                onClick={() => {
                  onSymbolChange?.(sym.symbol)
                  setShowSymbolDropdown(false)
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex justify-between items-center hover:bg-indigo-600/20 ${
                  currentSymbol === sym.symbol
                    ? "bg-indigo-600/30 text-indigo-300"
                    : theme === "dark"
                      ? "text-slate-300"
                      : "text-gray-700"
                }`}
              >
                <span className="font-medium">{sym.name}</span>
                <span className="text-xs opacity-60">{sym.category}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { tabs }
export type { DerivTab }
