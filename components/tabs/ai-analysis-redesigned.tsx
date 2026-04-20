"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import {
  Brain,
  Zap,
  TrendingUp,
  BarChart3,
  Search,
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react"

const AI_MODELS = [
  { id: "gpt4", name: "GPT-4 Turbo", confidence: 94, avgAccuracy: 82.5 },
  { id: "claude", name: "Claude 3 Opus", confidence: 91, avgAccuracy: 80.2 },
  { id: "gemini", name: "Gemini Pro", confidence: 88, avgAccuracy: 78.9 },
  { id: "ensemble", name: "Ensemble Model", confidence: 96, avgAccuracy: 85.7 },
]

export function AIAnalysisRedesigned() {
  const [selectedModel, setSelectedModel] = useState("ensemble")
  const [selectedSymbol, setSelectedSymbol] = useState("EURUSD")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analysisResults = {
    symbol: "EURUSD",
    timestamp: new Date().toLocaleTimeString(),
    sentiment: 75, // bullish
    trend: "UPTREND",
    signals: {
      bullish: 12,
      bearish: 5,
      neutral: 3,
    },
    confidence: 87,
    recommendation: "BUY",
    targetPrice: 1.1025,
    stopLoss: 1.0885,
  }

  const analysisHistory = [
    {
      id: 1,
      symbol: "EURUSD",
      time: "14:35:22",
      sentiment: "Bullish",
      accuracy: 84,
      action: "BUY",
      profit: "+$125.50",
    },
    {
      id: 2,
      symbol: "GBPUSD",
      time: "14:32:15",
      sentiment: "Bearish",
      accuracy: 79,
      action: "SELL",
      profit: "+$89.25",
    },
    {
      id: 3,
      symbol: "USDJPY",
      time: "14:28:43",
      sentiment: "Bullish",
      accuracy: 81,
      action: "BUY",
      profit: "+$156.75",
    },
    {
      id: 4,
      symbol: "AUDUSD",
      time: "14:25:10",
      sentiment: "Neutral",
      accuracy: 62,
      action: "HOLD",
      profit: "+$12.00",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030712] via-[#0a0f1a] to-[#030712] p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Analysis Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Model Selection */}
          <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Brain className="w-5 h-5 text-blue-400" />
                AI Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-white/5 border-blue-500/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0f1a] border-blue-500/30">
                  {AI_MODELS.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex items-center gap-2">
                        <span>{model.name}</span>
                        <span className="text-xs text-gray-500">({model.avgAccuracy}%)</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-blue-500/10">
                {AI_MODELS.find((m) => m.id === selectedModel) && (
                  <>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Confidence</span>
                      <span className="font-bold text-cyan-400">
                        {AI_MODELS.find((m) => m.id === selectedModel)?.confidence}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{
                          width: `${AI_MODELS.find((m) => m.id === selectedModel)?.confidence}%`,
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Symbol Selection */}
          <Card className="bg-white/5 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-sm text-white">Market Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Symbol</label>
                <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                  <SelectTrigger className="bg-white/5 border-blue-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0f1a] border-blue-500/30">
                    {["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "XAUUSD", "BTC"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => setIsAnalyzing(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 h-10 font-bold"
              >
                <Zap className="w-4 h-4 mr-2" />
                {isAnalyzing ? "Analyzing..." : "Run Analysis"}
              </Button>
            </CardContent>
          </Card>

          {/* Current Analysis Info */}
          <Card className="bg-white/5 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-sm text-white">Latest Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Signal</span>
                <Badge className="bg-green-500/20 text-green-400">
                  {analysisResults.recommendation}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Trend</span>
                <span className="font-bold text-cyan-400">{analysisResults.trend}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Confidence</span>
                <span className="font-bold text-purple-400">
                  {analysisResults.confidence}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CENTER & RIGHT: Results & History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Analysis Result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-blue-500/30 rounded-lg p-6 backdrop-blur-xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-black text-white mb-2">{analysisResults.symbol}</h2>
                <p className="text-sm text-gray-500">Analysis updated at {analysisResults.timestamp}</p>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400 text-lg px-4 py-2 h-fit">
                {analysisResults.recommendation}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Sentiment */}
              <div className="bg-white/[0.03] rounded-lg p-4 border border-blue-500/10">
                <p className="text-xs text-gray-500 font-bold mb-2">SENTIMENT</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-black text-white">{analysisResults.sentiment}%</p>
                  <div className="text-3xl">📊</div>
                </div>
                <p className="text-xs text-green-400 mt-2">Bullish Dominance</p>
              </div>

              {/* Signals */}
              <div className="bg-white/[0.03] rounded-lg p-4 border border-blue-500/10">
                <p className="text-xs text-gray-500 font-bold mb-2">SIGNALS</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bullish</span>
                    <span className="font-bold text-green-400">{analysisResults.signals.bullish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bearish</span>
                    <span className="font-bold text-red-400">{analysisResults.signals.bearish}</span>
                  </div>
                </div>
              </div>

              {/* Targets */}
              <div className="bg-white/[0.03] rounded-lg p-4 border border-blue-500/10">
                <p className="text-xs text-gray-500 font-bold mb-2">TARGETS</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target</span>
                    <span className="font-bold text-cyan-400">{analysisResults.targetPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stop Loss</span>
                    <span className="font-bold text-red-400">{analysisResults.stopLoss}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence Bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Analysis Confidence</span>
                <span className="font-bold text-purple-400">{analysisResults.confidence}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all"
                  style={{ width: `${analysisResults.confidence}%` }}
                />
              </div>
            </div>
          </motion.div>

          {/* Analysis History */}
          <Card className="bg-white/5 border-blue-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-blue-400" />
                Analysis History
              </CardTitle>
              <CardDescription>Recent AI predictions and outcomes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {analysisHistory.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-blue-500/10 hover:border-blue-500/30 transition-colors group cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{item.symbol}</span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge
                        className={`text-xs ${
                          item.sentiment === "Bullish"
                            ? "bg-green-500/20 text-green-400"
                            : item.sentiment === "Bearish"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {item.sentiment}
                      </Badge>
                      <span className="text-gray-500">Accuracy: {item.accuracy}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500/20 text-blue-400">{item.action}</Badge>
                    <span className="font-bold text-green-400">{item.profit}</span>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
