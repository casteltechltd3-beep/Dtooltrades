"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

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
  theme?: "light" | "dark"
  currentSymbol?: string
  onSymbolChange?: (symbol: string) => void
}

export function DerivHeader({ 
  theme = "dark",
  currentSymbol = "R_100",
  onSymbolChange
}: DerivHeaderProps) {
  const [showSymbolDropdown, setShowSymbolDropdown] = useState(false)

  return (
    <div
      className={`flex items-center justify-between gap-4 px-6 py-3 border-b backdrop-blur-xl transition-all duration-300 ${
        theme === "dark" 
          ? "bg-background border-border/50" 
          : "bg-white border-gray-200"
        }`}
    >
      {/* Active Symbols Label */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Symbols</span>
      </div>

      {/* Symbol Selector */}
      <div className="relative ml-auto">
        <Button
          onClick={() => setShowSymbolDropdown(!showSymbolDropdown)}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-bold transition-all uppercase tracking-wider ${
            theme === "dark"
              ? "bg-primary/15 text-primary border border-primary/40 hover:bg-primary/25 hover:border-primary/60"
              : "bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200"
          }`}
        >
          <span>{currentSymbol}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showSymbolDropdown ? "rotate-180" : ""}`} />
        </Button>

        {/* Dropdown Menu */}
        {showSymbolDropdown && (
          <div className={`absolute right-0 top-full mt-2 rounded-md shadow-2xl z-50 border ${
            theme === "dark"
              ? "bg-card border-border"
              : "bg-white border-gray-200"
          } w-72 max-h-96 overflow-y-auto`}>
            {/* Categories */}
            {["Synthetics", "Forex", "Crypto", "Commodities"].map((category) => {
              const items = POPULAR_SYMBOLS.filter(s => s.category === category)
              return items.length > 0 ? (
                <div key={category}>
                  <div className="px-4 py-2.5 bg-border/30 border-b border-border/50">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{category}</p>
                  </div>
                  {items.map((sym) => (
                    <button
                      key={sym.symbol}
                      onClick={() => {
                        onSymbolChange?.(sym.symbol)
                        setShowSymbolDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left text-sm transition-all border-b border-border/30 last:border-b-0 flex justify-between items-center ${
                        currentSymbol === sym.symbol
                          ? theme === "dark"
                            ? "bg-primary/20 text-primary font-bold"
                            : "bg-blue-100 text-blue-700"
                          : theme === "dark"
                            ? "text-foreground hover:bg-primary/10 hover:text-primary"
                            : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-bold">{sym.name}</span>
                      <span className="text-xs text-muted-foreground font-semibold">{sym.symbol}</span>
                    </button>
                  ))}
                </div>
              ) : null
            })}
          </div>
        )}
      </div>
    </div>
  )
}
