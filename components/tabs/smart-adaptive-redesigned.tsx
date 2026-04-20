"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import {
  Play,
  Square,
  Zap,
  TrendingUp,
  Target,
  Activity,
  Settings,
  BarChart3,
  AlertCircle,
} from "lucide-react"

const STRATEGIES = [
  { id: "adaptive", name: "Adaptive Market", description: "Adjusts to market conditions in real-time" },
  { id: "momentum", name: "Momentum Trading", description: "Follows market momentum trends" },
  { id: "reversal", name: "Reversal Pattern", description: "Detects and trades reversals" },
  { id: "breakout", name: "Breakout Strategy", description: "Trades on price breakouts" },
]

export function SmartAdaptiveTrading() {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState("adaptive")
  const [stake, setStake] = useState(0.5)
  const [targetProfit, setTargetProfit] = useState(50)
  const [maxLoss, setMaxLoss] = useState(100)

  const stats = {
    totalTrades: 1250,
    wins: 856,
    losses: 394,
    profit: 25750,
    accuracy: 68.5,
    avgWin: 45.25,
    avgLoss: -25.50,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030712] via-[#0a0f1a] to-[#030712] p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT PANEL: Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Settings className="w-5 h-5 text-blue-400" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Strategy Selection */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Strategy</label>
                <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                  <SelectTrigger className="bg-white/5 border-blue-500/30">
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

              {/* Stake */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">
                  Stake: ${stake.toFixed(2)}
                </label>
                <Slider
                  value={[stake]}
                  onValueChange={(v) => setStake(v[0])}
                  min={0.1}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Target Profit */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">
                  Target Profit: ${targetProfit.toFixed(0)}
                </label>
                <Slider
                  value={[targetProfit]}
                  onValueChange={(v) => setTargetProfit(v[0])}
                  min={10}
                  max={500}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Max Loss */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">
                  Max Loss: ${maxLoss.toFixed(0)}
                </label>
                <Slider
                  value={[maxLoss]}
                  onValueChange={(v) => setMaxLoss(v[0])}
                  min={50}
                  max={1000}
                  step={50}
                  className="w-full"
                />
              </div>

              {/* Control Buttons */}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex-1 ${
                    isRunning
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-white/5 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-sm text-white">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Trading</span>
                <Badge
                  className={isRunning ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}
                >
                  {isRunning ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Account</span>
                <Badge className="bg-blue-500/20 text-blue-400">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Signal Quality</span>
                <span className="font-bold text-cyan-400">85%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT PANEL: Signals & Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Trades", value: stats.totalTrades, icon: Activity, color: "blue" },
              { label: "Win Rate", value: `${stats.accuracy}%`, icon: TrendingUp, color: "green" },
              { label: "Profit", value: `$${(stats.profit / 1000).toFixed(1)}K`, icon: Target, color: "cyan" },
              { label: "Accuracy", value: `${stats.wins}W/${stats.losses}L`, icon: BarChart3, color: "purple" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-blue-500/20 rounded-lg p-4 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                  <p className="text-xs text-gray-500 font-bold">{stat.label}</p>
                </div>
                <p className="text-lg sm:text-xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Signals */}
          <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="w-5 h-5 text-blue-400" />
                Active Signals
              </CardTitle>
              <CardDescription>Real-time trading signals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  symbol: "EURUSD",
                  direction: "BUY",
                  strength: 92,
                  confidence: 87,
                  color: "green",
                },
                {
                  symbol: "GBPUSD",
                  direction: "SELL",
                  strength: 78,
                  confidence: 76,
                  color: "red",
                },
                {
                  symbol: "USDJPY",
                  direction: "BUY",
                  strength: 85,
                  confidence: 81,
                  color: "green",
                },
              ].map((signal) => (
                <div
                  key={signal.symbol}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-blue-500/10 hover:border-blue-500/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{signal.symbol}</span>
                      <Badge
                        className={`text-xs px-2 py-0.5 ${
                          signal.color === "green"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {signal.direction}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Strength: {signal.strength}%</span>
                      <span>Confidence: {signal.confidence}%</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Trade
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Recent Trades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {[
                  { time: "14:32:15", contract: "Rise/Fall", result: "WIN", amount: "+45.50" },
                  { time: "14:31:42", contract: "Even/Odd", result: "WIN", amount: "+32.25" },
                  { time: "14:31:08", contract: "Higher/Lower", result: "LOSS", amount: "-25.00" },
                  { time: "14:30:35", contract: "Rise/Fall", result: "WIN", amount: "+38.75" },
                ].map((trade, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 text-sm rounded hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex-1">
                      <span className="text-gray-400">{trade.time}</span>
                      <span className="text-gray-500 ml-2">•</span>
                      <span className="text-gray-300 ml-2">{trade.contract}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`text-xs ${
                          trade.result === "WIN"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {trade.result}
                      </Badge>
                      <span
                        className={`font-bold ${
                          trade.result === "WIN" ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {trade.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
