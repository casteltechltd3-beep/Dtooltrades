"use client"

import { Button } from "@/components/ui/button"
import { DERIV_CONFIG } from "@/lib/deriv-config"

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

interface DerivHeaderProps {
  activeTab: DerivTab
  setActiveTab: (tab: DerivTab) => void
  theme?: "light" | "dark"
}

export function DerivHeader({ activeTab, setActiveTab, theme = "dark" }: DerivHeaderProps) {
  return (
    <div
      className={`flex space-x-2 px-4 py-3 border-b backdrop-blur-xl transition-all duration-300 ${
        theme === "dark" 
          ? "bg-[#0a0a0a]/95 border-white/8" 
          : "bg-white/98 border-gray-200"
        }`}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 ${activeTab.id === tab.id
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-95"
            : theme === "dark"
              ? "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:border-indigo-500/30 hover:text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-sm"
            }`}
        >
          {tab.name}
        </Button>
      ))}
    </div>
  )
}

export { tabs }
export type { DerivTab }
