"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  Play,
  Square,
  Zap,
  Grid3x3,
  TrendingUp,
  AlertCircle,
  Settings,
} from "lucide-react"

const BOT_STRATEGIES = [
  { id: 1, name: "EVEN/ODD Bot", status: "idle", accuracy: 71, trades: 245 },
  { id: 2, name: "OVER3/UNDER6 Bot", status: "idle", accuracy: 68, trades: 189 },
  { id: 3, name: "OVER2/UNDER7 Bot", status: "idle", accuracy: 65, trades: 156 },
  { id: 4, name: "OVER1/UNDER8 Bot", status: "idle", accuracy: 72, trades: 198 },
  { id: 5, name: "UNDER6 Bot", status: "idle", accuracy: 67, trades: 142 },
  { id: 6, name: "DIFFERS Bot", status: "idle", accuracy: 69, trades: 167 },
  { id: 7, name: "SUPER DIFFERS Bot", status: "idle", accuracy: 74, trades: 203 },
  { id: 8, name: "PRO NEURAL Bot", status: "idle", accuracy: 76, trades: 221 },
  { id: 9, name: "QUANTUM Bot", status: "idle", accuracy: 78, trades: 267 },
]

export function AutoBotRedesigned() {
  const [runningBots, setRunningBots] = useState<number[]>([])
  const [activeBots, setActiveBots] = useState(BOT_STRATEGIES.map((b) => ({ ...b })))

  const toggleBot = (id: number) => {
    if (runningBots.includes(id)) {
      setRunningBots(runningBots.filter((b) => b !== id))
    } else {
      setRunningBots([...runningBots, id])
    }
  }

  const totalStats = {
    activeCount: runningBots.length,
    totalTrades: activeBots.reduce((sum, b) => sum + b.trades, 0),
    avgAccuracy: (activeBots.reduce((sum, b) => sum + b.accuracy, 0) / activeBots.length).toFixed(1),
    totalProfit: 15420.75,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030712] via-[#0a0f1a] to-[#030712] p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Active Bots", value: totalStats.activeCount, color: "blue" },
            { label: "Total Trades", value: totalStats.totalTrades, color: "cyan" },
            { label: "Avg Accuracy", value: `${totalStats.avgAccuracy}%`, color: "green" },
            { label: "Total Profit", value: `$${totalStats.totalProfit.toFixed(0)}`, color: "purple" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-blue-500/20 rounded-lg p-4 backdrop-blur-xl"
            >
              <p className="text-xs text-gray-500 font-bold">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Bot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeBots.map((bot) => {
            const isRunning = runningBots.includes(bot.id)
            return (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl overflow-hidden hover:border-blue-500/50 transition-colors h-full">
                  {/* Running indicator */}
                  {isRunning && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-cyan-500 to-green-500 animate-pulse" />
                  )}

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-sm sm:text-base mb-1">
                          {bot.name}
                        </CardTitle>
                        <Badge
                          className={`text-xs ${
                            isRunning
                              ? "bg-green-500/20 text-green-400 animate-pulse"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {isRunning ? "● Running" : "○ Idle"}
                        </Badge>
                      </div>
                      <div className="text-2xl">🤖</div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/[0.03] rounded p-2">
                        <p className="text-gray-500 text-xs font-bold">Accuracy</p>
                        <p className="text-green-400 font-bold">{bot.accuracy}%</p>
                      </div>
                      <div className="bg-white/[0.03] rounded p-2">
                        <p className="text-gray-500 text-xs font-bold">Trades</p>
                        <p className="text-cyan-400 font-bold">{bot.trades}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Performance</span>
                        <span>{bot.accuracy}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all"
                          style={{ width: `${bot.accuracy}%` }}
                        />
                      </div>
                    </div>

                    {/* Control Button */}
                    <Button
                      onClick={() => toggleBot(bot.id)}
                      className={`w-full h-9 font-bold text-sm ${
                        isRunning
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {isRunning ? (
                        <>
                          <Square className="w-4 h-4 mr-2" />
                          Stop Bot
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Bot
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Control Panel */}
        <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Settings className="w-5 h-5 text-blue-400" />
              Bot Management
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3 flex-wrap">
            <Button
              onClick={() => {
                setRunningBots(activeBots.map((b) => b.id))
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className="w-4 h-4 mr-2" />
              Start All
            </Button>
            <Button
              onClick={() => setRunningBots([])}
              className="bg-red-600 hover:bg-red-700"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop All
            </Button>
            <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
