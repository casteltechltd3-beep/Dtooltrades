"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import {
  Play,
  Square,
  Zap,
  TrendingUp,
  Clock,
  BarChart3,
  AlertCircle,
  Cpu,
} from "lucide-react"

const STRATEGIES = [
  { id: "even-odd", name: "Even/Odd Analysis", description: "Analyzes even/odd digit patterns" },
  { id: "over-under", name: "Over/Under Range", description: "Range-based trading strategy" },
  { id: "differ-match", name: "Differ/Match Logic", description: "Detects digit differences" },
  { id: "hybrid", name: "Hybrid Multi", description: "Combines multiple strategies" },
]

export function SmartAuto24Redesigned() {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState("even-odd")
  const [analysisTime, setAnalysisTime] = useState(30)

  const consoleOutput = [
    "[ INFO ] SmartAuto24 v4.2.1 initialized",
    "[ SUCCESS ] Connected to Deriv API",
    "[ INFO ] Analysis engine loaded: Even/Odd",
    "[ SIGNAL ] BUY signal detected on EURUSD",
    "[ TRADE ] Contract #1 executed: Rise for 5 ticks",
    "[ RESULT ] Contract #1 WON +$45.50",
    "[ SIGNAL ] SELL signal on GBPUSD",
    "[ TRADE ] Contract #2 executed: Fall for 3 ticks",
  ]

  const activeTrades = [
    {
      id: 1,
      symbol: "EURUSD",
      type: "Rise",
      entry: 1.0945,
      current: 1.0952,
      profit: 45.50,
      ticks: "3/5",
      status: "WINNING",
    },
    {
      id: 2,
      symbol: "GBPUSD",
      type: "Fall",
      entry: 1.2847,
      current: 1.2838,
      profit: 32.25,
      ticks: "2/3",
      status: "WINNING",
    },
  ]

  const performance = {
    totalTrades: 156,
    wins: 108,
    losses: 48,
    accuracy: 69.2,
    totalProfit: 4850.75,
    avgWin: 32.5,
    avgLoss: -18.75,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030712] via-[#0a0f1a] to-[#030712] p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT: Strategy Selector & Controls */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Cpu className="w-5 h-5 text-blue-400" />
                Strategy Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Active Strategy</label>
                <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                  <SelectTrigger className="bg-white/5 border-blue-500/30 h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0f1a] border-blue-500/30">
                    {STRATEGIES.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  {STRATEGIES.find((s) => s.id === selectedStrategy)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">
                  Analysis Time: {analysisTime}m
                </label>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={analysisTime}
                  onChange={(e) => setAnalysisTime(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex-1 h-11 font-bold ${
                    isRunning
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Square className="w-4 h-4 mr-2" />
                      STOP
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      START
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card className="bg-white/5 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-sm text-white">24h Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Win Rate</span>
                <span className="font-bold text-green-400">{performance.accuracy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Profit</span>
                <span className="font-bold text-cyan-400">${performance.totalProfit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Trades</span>
                <span className="font-bold text-white">{performance.totalTrades}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                  style={{ width: `${performance.accuracy}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CENTER: Live Trading Console */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Trades */}
          <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Active Trades
              </CardTitle>
              <CardDescription>Real-time execution monitor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeTrades.map((trade) => (
                <motion.div
                  key={trade.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-lg bg-white/[0.03] border border-blue-500/20 hover:border-blue-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-lg">{trade.symbol}</span>
                      <Badge className={`text-xs px-2 ${
                        trade.type === "Rise"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {trade.type}
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                        {trade.ticks}
                      </Badge>
                    </div>
                    <span className={`font-bold text-lg ${
                      trade.profit >= 0 ? "text-green-400" : "text-red-400"
                    }`}>
                      {trade.profit > 0 ? "+" : ""}{trade.profit.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Entry: {trade.entry}</span>
                    <span>Current: {trade.current}</span>
                    <Badge className="bg-green-500/20 text-green-400">{trade.status}</Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Trading Console Output */}
          <Card className="bg-[#0a0f1a]/50 border-blue-500/30 backdrop-blur-xl font-mono">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-sm">
                <Zap className="w-4 h-4 text-blue-400" />
                Trading Console
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-[#030712] rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="space-y-1 text-[11px]">
                {consoleOutput.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`${
                      line.includes("SUCCESS") || line.includes("WIN")
                        ? "text-green-400"
                        : line.includes("ERROR") || line.includes("LOSS")
                        ? "text-red-400"
                        : line.includes("SIGNAL") || line.includes("TRADE")
                        ? "text-cyan-400"
                        : "text-gray-500"
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Quick Stats */}
        <div className="lg:col-span-1 space-y-4">
          {[
            { label: "Total Trades", value: performance.totalTrades, icon: "📊", color: "blue" },
            { label: "Wins", value: performance.wins, icon: "🎯", color: "green" },
            { label: "Losses", value: performance.losses, icon: "❌", color: "red" },
            { label: "Avg Win", value: `$${performance.avgWin.toFixed(2)}`, icon: "📈", color: "cyan" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-blue-500/20 rounded-lg p-4 backdrop-blur-xl"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-xs text-gray-500 font-bold">{stat.label}</p>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
