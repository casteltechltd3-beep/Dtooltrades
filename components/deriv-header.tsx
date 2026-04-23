"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { fetchActiveSymbols, groupSymbolsByMarket, type ActiveSymbol } from "@/lib/active-symbols"
import type { DerivSymbol } from "@/hooks/use-deriv"

interface DerivHeaderProps {
  theme?: "light" | "dark"
  currentSymbol?: string
  onSymbolChange?: (symbol: string) => void
  symbols?: DerivSymbol[]
}

export function DerivHeader({ 
  theme = "dark",
  currentSymbol = "R_100",
  onSymbolChange,
  symbols: externalSymbols = []
}: DerivHeaderProps) {
  const [showSymbolDropdown, setShowSymbolDropdown] = useState(false)
  const [symbols, setSymbols] = useState<ActiveSymbol[]>([])
  const [groupedSymbols, setGroupedSymbols] = useState<Map<string, ActiveSymbol[]>>(new Map())
  const [isLoading, setIsLoading] = useState(!externalSymbols.length)

  useEffect(() => {
    if (externalSymbols && externalSymbols.length > 0) {
      // Use external symbols from page context
      const mappedSymbols: ActiveSymbol[] = externalSymbols.map(sym => ({
        symbol: sym.symbol,
        display_name: sym.display_name,
        market_display_name: sym.market_display_name || '',
        submarket_display_name: '',
        market: sym.market || '',
        submarket: '',
        pip: sym.pip_size?.toString() || '0.0001',
        intraday_interval_minutes: [1, 5, 15, 30, 60]
      }))
      setSymbols(mappedSymbols)
      setGroupedSymbols(groupSymbolsByMarket(mappedSymbols))
      setIsLoading(false)
    } else {
      // Fallback to fetching
      const loadSymbols = async () => {
        setIsLoading(true)
        const activeSymbols = await fetchActiveSymbols()
        setSymbols(activeSymbols)
        setGroupedSymbols(groupSymbolsByMarket(activeSymbols))
        setIsLoading(false)
      }
      loadSymbols()
    }
  }, [externalSymbols])

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
          } w-80 max-h-96 overflow-y-auto`}>
            {isLoading ? (
              <div className="px-4 py-6 text-center text-xs text-muted-foreground">Loading symbols...</div>
            ) : groupedSymbols.size > 0 ? (
              Array.from(groupedSymbols.entries()).map(([market, marketSymbols]) => (
                <div key={market}>
                  <div className="px-4 py-2.5 bg-border/30 border-b border-border/50">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{market}</p>
                  </div>
                  {marketSymbols.map((sym) => (
                    <button
                      key={sym.symbol}
                      onClick={() => {
                        onSymbolChange?.(sym.symbol)
                        setShowSymbolDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left text-sm transition-all border-b border-border/30 last:border-b-0 ${
                        currentSymbol === sym.symbol
                          ? theme === "dark"
                            ? "bg-primary/20 text-primary font-bold"
                            : "bg-blue-100 text-blue-700"
                          : theme === "dark"
                            ? "text-foreground hover:bg-primary/10 hover:text-primary"
                            : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{sym.display_name}</span>
                        <span className="text-xs text-muted-foreground font-semibold">{sym.symbol}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-xs text-muted-foreground">No symbols available</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
