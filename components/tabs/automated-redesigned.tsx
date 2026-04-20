"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import {
  Play,
  Square,
  Zap,
  AlertTriangle,
  Clock,
  DollarSign,
  Settings,
  Power,
  TrendingDown,
  Shield,
} from "lucide-react"

export function AutomatedRedesigned() {
  const [isActive, setIsActive] = useState(false)
  const [dailyLimit, setDailyLimit] = useState(5000)
  const [autoRecovery, setAutoRecovery] = useState(true)
  const [emergencyStop, setEmergencyStop] = useState(false)

  const automationRules = [
    {
      id: 1,
      name: "Daily Loss Limit",
      description: "Stop trading if daily loss exceeds limit",
      value: `$${dailyLimit}`,
      status: "active",
      icon: "📊",
    },
    {
      id: 2,
      name: "Auto Recovery Mode",
      description: "Automatically adjust stake after losing trades",
      value: autoRecovery ? "Enabled" : "Disabled",
      status: autoRecovery ? "active" : "inactive",
      icon: "🔄",
    },
    {
      id: 3,
      name: "Winning Streak Lock",
      description: "Increase stake on consecutive wins",
      value: "1.5x Per Win",
      status: "active",
      icon: "📈",
    },
    {
      id: 4,
      name: "Time-Based Shutdown",
      description: "Auto stop trading at specified time",
      value: "02:00 UTC",
      status: "scheduled",
      icon: "⏰",
    },
  ]

  const activeTrades = [
    {
      id: 1,
      time: "14:32:15",
      symbol: "EURUSD",
      type: "Auto Rise",
      amount: 50,
      result: "WINNING",
      profit: 45.50,
    },
    {
      id: 2,
      time: "14:31:42",
      symbol: "GBPUSD",
      type: "Auto Fall",
      amount: 50,
      result: "WINNING",
      profit: 38.75,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030712] via-[#0a0f1a] to-[#030712] p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Settings & Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Master Toggle */}
          <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Power className="w-5 h-5 text-blue-400" />
                Automation Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-blue-500/20">
                <div>
                  <p className="font-bold text-white">Automation</p>
                  <p className="text-xs text-gray-500">Master control</p>
                </div>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
              </div>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-green-400">System Active</span>
                  </div>

                  {/* Daily Limit */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Daily Loss Limit</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={dailyLimit}
                        onChange={(e) => setDailyLimit(parseInt(e.target.value))}
                        className="bg-white/5 border-blue-500/30 h-10"
                      />
                      <span className="text-white font-bold pt-2">USD</span>
                    </div>
                  </div>

                  {/* Auto Recovery */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-blue-500/20">
                    <div>
                      <p className="text-sm font-bold text-white">Auto Recovery</p>
                      <p className="text-xs text-gray-500">Adjust stakes</p>
                    </div>
                    <Switch
                      checked={autoRecovery}
                      onCheckedChange={setAutoRecovery}
                    />
                  </div>
                </motion.div>
              )}

              {/* Emergency Stop */}
              <Button
                onClick={() => setEmergencyStop(!emergencyStop)}
                className={`w-full h-11 font-bold text-base ${
                  emergencyStop
                    ? "bg-orange-600 hover:bg-orange-700 animate-pulse"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                {emergencyStop ? "EMERGENCY STOP ACTIVE" : "Emergency Stop"}
              </Button>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-white/5 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-sm text-white">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Automation</span>
                <Badge
                  className={isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20"}
                >
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Today's Loss</span>
                <span className="font-bold text-orange-400">$1,250.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Remaining</span>
                <span className="font-bold text-green-400">${dailyLimit - 1250.5}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CENTER & RIGHT: Rules & Active Trades */}
        <div className="lg:col-span-2 space-y-6">
          {/* Automation Rules */}
          <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Settings className="w-5 h-5 text-blue-400" />
                Automation Rules
              </CardTitle>
              <CardDescription>Active trading parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {automationRules.map((rule) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-lg bg-white/[0.03] border border-blue-500/10 hover:border-blue-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">{rule.icon}</span>
                      <div>
                        <p className="font-bold text-white">{rule.name}</p>
                        <p className="text-xs text-gray-500">{rule.description}</p>
                      </div>
                    </div>
                    <Badge
                      className={`text-xs ${
                        rule.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : rule.status === "inactive"
                          ? "bg-gray-500/20 text-gray-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {rule.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-cyan-400">{rule.value}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Active Trades */}
          <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="w-5 h-5 text-blue-400" />
                Active Automated Trades
              </CardTitle>
              <CardDescription>Currently executing contracts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {activeTrades.map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-blue-500/10 hover:border-blue-500/20 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">{trade.symbol}</span>
                      <span className="text-xs text-gray-500">{trade.type}</span>
                      <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                        ${trade.amount}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{trade.time}</span>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500/20 text-green-400 text-xs mb-1 block">
                      {trade.result}
                    </Badge>
                    <span className="text-sm font-bold text-green-400">
                      +${trade.profit.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Safety Panel */}
          <Card className="bg-white/5 border-yellow-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5 text-yellow-400" />
                Safety Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 rounded bg-white/[0.03]">
                <span className="text-gray-400">Slippage Protection</span>
                <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/[0.03]">
                <span className="text-gray-400">Position Lock</span>
                <Badge className="bg-green-500/20 text-green-400">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/[0.03]">
                <span className="text-gray-400">Drawdown Monitor</span>
                <Badge className="bg-yellow-500/20 text-yellow-400">Alert</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
