"use client"

import { useState, useEffect } from "react"
import { useDeriv } from "@/hooks/use-deriv"
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, User, AlertTriangle, Menu, TrendingUp, Layers, Eye, Hash, Clock, Activity } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { TradingHeader } from "@/components/header/trading-header"
import { DerivHeader } from "@/components/deriv-header"
import { DigitDistribution } from "@/components/digit-distribution"
import { SignalsTab } from "@/components/tabs/signals-tab"
import { ProSignalsTab } from "@/components/tabs/pro-signals-tab"
import { EvenOddTab } from "@/components/tabs/even-odd-tab"
import { OverUnderTab } from "@/components/tabs/over-under-tab"
import { MatchesTab } from "@/components/tabs/matches-tab"
import { DiffersTab } from "@/components/tabs/differs-tab"
import { StatisticalAnalysis } from "@/components/statistical-analysis"
import { LastDigitsChart } from "@/components/charts/last-digits-chart"
import { LastDigitsLineChart } from "@/components/charts/last-digits-line-chart"
import { AIAnalysisTab } from "@/components/tabs/ai-analysis-tab"
import { HeritageSuperSignals } from "@/components/heritage-super-signals"
import { SuperSignalsTab } from "@/components/tabs/super-signals-tab"
import { LoadingScreen } from "@/components/loading-screen"
import { DerivAuth } from "@/components/deriv-auth"
import { AutoBotTab } from "@/components/tabs/autobot-tab"
import { AutomatedTab } from "@/components/tabs/automated-tab"
import { SmartAuto24Tab } from "@/components/tabs/smartauto24-tab"
import { AdvancedSignalsTab } from "@/components/advanced-signals-tab"
import { useGlobalTradingContext } from "@/hooks/use-global-trading-context"
import { verifier } from "@/lib/system-verifier"
import { ResponsiveTabs } from "@/components/responsive-tabs"
import { MoneyMakerTab } from "@/components/tabs/money-maker-tab"
import { ToolsInfoTab } from "@/components/tabs/tools-info-tab"
import SmartAdaptiveTradingTab from "@/components/tabs/smart-adaptive-trading"
import { RiskDisclaimerModal } from "@/components/modals/risk-disclaimer-modal"
import { MarketSelector } from "@/components/market-selector"
import { FloatingAIScanner } from "@/components/floating-ai-scanner"
import { ApiTokenModal } from "@/components/api-token-modal"
import { useDerivAuth } from "@/hooks/use-deriv-auth"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function DerivAnalysisApp() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [activeTab, setActiveTab] = useState("smart-analysis")
  const [isLoading, setIsLoading] = useState(true)
  const [initError, setInitError] = useState<string | null>(null)
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false)
  const [showRiskModal, setShowRiskModal] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [siteConfig, setSiteConfig] = useState<any>(null)
  const [watchedDigits, setWatchedDigits] = useState<number[]>(() => {
    if (typeof window === "undefined") return []
    const saved = localStorage.getItem("deriv_watched_digits")
    return saved ? JSON.parse(saved) : []
  })
  const globalContext = useGlobalTradingContext()
  const { showTokenModal, submitApiToken, loginWithDeriv } = useDerivAuth()

  // Wrapper to ensure OAuth login is properly triggered
  const handleOAuthLogin = () => {
    console.log("[v0] 🔐 Page: Triggering OAuth login...")
    try {
      loginWithDeriv()
    } catch (error) {
      console.error("[v0] ❌ Page: OAuth login error:", error)
    }
  }

  const {
    connectionStatus,
    currentPrice,
    currentDigit,
    tickCount,
    analysis,
    signals,
    proSignals,
    symbol,
    maxTicks,
    availableSymbols,
    connectionLogs,
    changeSymbol,
    changeMaxTicks,
    getRecentDigits,
  } = useDeriv("R_100")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  useEffect(() => {
    try {
      document.documentElement.classList.add("dark")
      console.log("[v0] App initialization started")
      verifier.markComplete("Core System")
      console.log("[v0] App initialization completed successfully")
    } catch (error) {
      console.error("[v0] Initialization error:", error)
      setInitError(error instanceof Error ? error.message : "Unknown error")
    }

    // Check for risk acceptance
    const accepted = localStorage.getItem("deriv_risk_accepted")
    if (!accepted) {
      setShowRiskModal(true)
    }

    // Fetch site config
    fetch("/api/admin/site-config")
      .then(r => r.json())
      .then(setSiteConfig)
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("deriv_watched_digits", JSON.stringify(watchedDigits))
    }
  }, [watchedDigits])

  // Defensive filtering to prevent `.toString()` crashes in chart components
  const recent100DigitsRaw = getRecentDigits(100)
  const recent100Digits = recent100DigitsRaw.filter((d: any) => d !== undefined && d !== null)
  
  const recent50Digits = recent100Digits.length >= 50 ? recent100Digits.slice(-50) : recent100Digits
  const recent40Digits = recent100Digits.length >= 40 ? recent100Digits.slice(-40) : recent100Digits
  const recentDigits = recent100Digits.length >= 20 ? recent100Digits.slice(-20) : recent100Digits

  const activeSignals = (signals || []).filter((s) => s.status !== "NEUTRAL")
  const powerfulSignalsCount = activeSignals.filter((s) => s.status === "TRADE NOW").length

  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-900 to-red-950">
        <div className="text-center p-8 bg-red-800/50 rounded-xl border border-red-500 max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Initialization Error</h2>
          <p className="text-red-200 mb-6">{initError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <LoadingScreen
        onComplete={() => {
          console.log("[v0] Loading screen completed, showing main app")
          setIsLoading(false)
        }}
      />
    )
  }



  return (
    <div
      className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-linear-to-br from-[#0a0e27] via-[#0f1629] to-[#1a1f3a]" : "bg-linear-to-br from-gray-50 via-white to-gray-100"}`}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col relative">
        {!siteConfig?.headerHidden && (
          <>
            <DerivHeader theme={theme} currentSymbol={symbol} onSymbolChange={changeSymbol} />
            <TradingHeader 
              theme={theme}
              toggleTheme={toggleTheme}
              activeTab={activeTab}
              handleTabChange={setActiveTab}
              currentMarket={{ name: symbol, symbol: symbol }}
              currentPrice={currentPrice || 0}
              lastDigit={currentDigit !== null ? currentDigit : undefined}
              ticks={tickCount}
              handleLogout={() => { /* logout handler */ }}
              siteConfig={siteConfig}
            />
          </>
        )}

        <main className="flex-1 pt-[240px] sm:pt-[320px] pb-4 px-1 sm:px-4 space-y-2 sm:space-y-4 max-w-7xl mx-auto w-full">
          {connectionStatus === "disconnected" && tickCount === 0 ? (
            <div className="text-center py-12 sm:py-20 md:py-32">
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                Connection Failed
              </h2>
              <p className={`text-sm sm:text-base md:text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Unable to connect to Deriv. Please check your internet connection and refresh the page.
              </p>
              <Button 
                onClick={() => window.location.reload()}
                className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold"
              >
                Retry Connection
              </Button>
            </div>
          ) : (
            <>
              {connectionStatus === "reconnecting" && (
                <div className="absolute top-0 left-0 right-0 z-50 bg-yellow-500/20 backdrop-blur-md p-2 text-center text-xs font-bold text-yellow-500 border-b border-yellow-500/30 animate-pulse">
                  Reconnecting to Deriv API... Some data may be delayed.
                </div>
              )}


              <TabsContent value="smart-analysis" className="mt-0 space-y-2 sm:space-y-3 md:space-y-4">
                <div
                  className={`rounded-lg sm:rounded-xl p-2 sm:p-3 border flex items-center justify-between ${theme === "dark" ? "bg-linear-to-br from-[#0f1629]/80 to-[#1a2235]/80 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]" : "bg-white border-gray-200 shadow-lg"}`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse`} />
                    <span className={`text-[10px] font-bold uppercase ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>Market Live</span>
                  </div>
                </div>

                {analysis && analysis.digitFrequencies && (
                  <div
                    className={`rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border ${theme === "dark" ? "bg-linear-to-br from-[#0f1629]/80 to-[#1a2235]/80 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]" : "bg-white border-gray-200 shadow-lg"}`}
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-3">
                      <h3
                        className={`text-sm sm:text-lg md:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        Digits Distribution
                      </h3>
                    </div>

                    <DigitDistribution
                      frequencies={analysis.digitFrequencies}
                      currentDigit={currentDigit}
                      theme={theme}
                      watchedDigits={watchedDigits}
                    />
                  </div>
                )}

                {analysis && recent100Digits.length > 0 && recentDigits.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-4">
                    <div
                      className={`rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-4 border ${theme === "dark" ? "bg-linear-to-br from-[#0f1629]/80 to-[#1a2235]/80 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]" : "bg-white border-gray-200 shadow-lg"}`}
                    >
                      <h3
                        className={`text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        Last Digits Line Chart
                      </h3>
                      <LastDigitsLineChart digits={recentDigits.slice(-10)} />
                    </div>

                    <div
                      className={`rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-4 border ${theme === "dark" ? "bg-linear-to-br from-[#0f1629]/80 to-[#1a2235]/80 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]" : "bg-white border-gray-200 shadow-lg"}`}
                    >
                      <StatisticalAnalysis analysis={analysis} recentDigits={recent100Digits} theme={theme} />
                    </div>
                  </div>
                )}

                {recentDigits.length > 0 && (
                  <div
                    className={`rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border ${theme === "dark" ? "bg-linear-to-br from-[#0f1629]/80 to-[#1a2235]/80 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]" : "bg-white border-gray-200 shadow-lg"}`}
                  >
                    <h3
                      className={`text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      Last 20 Digits Chart
                    </h3>
                    <LastDigitsChart digits={recentDigits} />
                  </div>
                )}

                {analysis && analysis.digitFrequencies && analysis.powerIndex && (
                  <div
                    className={`rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border ${theme === "dark" ? "bg-linear-to-br from-green-500/10 to-green-500/10 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]" : "bg-green-50 border-green-200 shadow-lg"}`}
                  >
                    <h3
                      className={`text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      Frequency Analysis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div
                        className={`text-center rounded-lg p-2 sm:p-3 md:p-4 border ${theme === "dark" ? "bg-blue-500/10" : "bg-blue-50"}`}
                      >
                        <div
                          className={`text-xs sm:text-sm mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Most Frequent
                        </div>
                        <div
                          className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
                        >
                          {analysis.powerIndex.strongest}
                        </div>
                        <div
                          className={`mt-1 text-xs sm:text-sm md:text-base font-bold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
                        >
                          {analysis.digitFrequencies[analysis.powerIndex.strongest]?.percentage.toFixed(1)}%
                        </div>
                      </div>
                      <div
                        className={`text-center rounded-lg p-2 sm:p-3 md:p-4 border ${theme === "dark" ? "bg-red-500/10" : "bg-red-50"}`}
                      >
                        <div
                          className={`text-xs sm:text-sm mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Least Frequent
                        </div>
                        <div
                          className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme === "dark" ? "text-red-400" : "text-red-600"}`}
                        >
                          {analysis.powerIndex.weakest}
                        </div>
                        <div
                          className={`mt-1 text-xs sm:text-sm md:text-base font-bold ${theme === "dark" ? "text-red-400" : "text-red-600"}`}
                        >
                          {analysis.digitFrequencies[analysis.powerIndex.weakest]?.percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="signals" className="mt-0">
                {analysis && <SignalsTab signals={signals} proSignals={proSignals} analysis={analysis} theme={theme} symbol={symbol} currentPrice={currentPrice} currentDigit={currentDigit} tickCount={tickCount} maxTicks={maxTicks} onMaxTicksChange={changeMaxTicks} />}
              </TabsContent>

              <TabsContent value="pro-signals" className="mt-0">
                {analysis && <ProSignalsTab proSignals={proSignals} analysis={analysis} theme={theme} symbol={symbol} currentPrice={currentPrice} currentDigit={currentDigit} tickCount={tickCount} maxTicks={maxTicks} onMaxTicksChange={changeMaxTicks} />}
              </TabsContent>

              <TabsContent value="super-signals" className="mt-0">
                {analysis && (
                  <HeritageSuperSignals 
                    theme={theme} 
                    symbol={symbol} 
                    availableSymbols={availableSymbols} 
                    maxTicks={maxTicks}
                    analysis={analysis}
                    recentDigits={recentDigits}
                    tickCount={tickCount}
                  />
                )}
              </TabsContent>

              <TabsContent value="advanced-signals" className="mt-0">
                <AdvancedSignalsTab theme={theme} availableSymbols={availableSymbols} />
              </TabsContent>

              <TabsContent value="even-odd" className="mt-0">
                {analysis && (
                  <EvenOddTab
                    analysis={analysis}
                    signals={signals}
                    currentDigit={currentDigit}
                    currentPrice={currentPrice}
                    recentDigits={recent40Digits}
                    theme={theme}
                    symbol={symbol}
                    availableSymbols={availableSymbols}
                    onSymbolChange={changeSymbol}
                    tickCount={tickCount}
                  />
                )}
              </TabsContent>

              <TabsContent value="over-under" className="mt-0">
                {analysis && (
                  <OverUnderTab
                    analysis={analysis}
                    signals={signals}
                    currentDigit={currentDigit}
                    currentPrice={currentPrice}
                    recentDigits={recent50Digits}
                    theme={theme}
                    symbol={symbol}
                    availableSymbols={availableSymbols}
                    onSymbolChange={changeSymbol}
                    tickCount={tickCount}
                  />
                )}
              </TabsContent>

              <TabsContent value="advanced-over-under" className="mt-0">
                {analysis && <MoneyMakerTab theme={theme} recentDigits={recent50Digits} symbol={symbol} />}
              </TabsContent>

              <TabsContent value="matches" className="mt-0">
                {analysis && (
                  <MatchesTab analysis={analysis} signals={signals} recentDigits={recentDigits} theme={theme} symbol={symbol} currentPrice={currentPrice} currentDigit={currentDigit} tickCount={tickCount} maxTicks={maxTicks} onMaxTicksChange={changeMaxTicks} />
                )}
              </TabsContent>

              <TabsContent value="differs" className="mt-0">
                {analysis && (
                  <DiffersTab analysis={analysis} signals={signals} recentDigits={recentDigits} theme={theme} symbol={symbol} currentPrice={currentPrice} currentDigit={currentDigit} tickCount={tickCount} maxTicks={maxTicks} onMaxTicksChange={changeMaxTicks} />
                )}
              </TabsContent>

              <TabsContent value="ai-analysis" className="mt-0">
                {analysis && (
                  <AIAnalysisTab
                    analysis={analysis}
                    currentDigit={currentDigit}
                    currentPrice={currentPrice}
                    symbol={symbol}
                    theme={theme}
                    availableSymbols={availableSymbols}
                    onSymbolChange={changeSymbol}
                  />
                )}
              </TabsContent>

              <TabsContent value="autobot" className="mt-0">
                <AutoBotTab theme={theme} symbol={symbol} />
              </TabsContent>

              <TabsContent value="automated" className="mt-0">
                <AutomatedTab theme={theme} symbol={symbol} />
              </TabsContent>

              <TabsContent value="smartauto24" className="mt-0">
                <SmartAuto24Tab
                  theme={theme}
                  symbol={symbol}
                  onSymbolChange={changeSymbol}
                  availableSymbols={availableSymbols}
                  maxTicks={maxTicks}
                  onMaxTicksChange={changeMaxTicks}
                />
              </TabsContent>

              <TabsContent value="smart-adaptive" className="mt-0">
                {analysis && <SmartAdaptiveTradingTab signals={signals} analysis={analysis} symbol={symbol} theme={theme} currentPrice={currentPrice} currentDigit={currentDigit} tickCount={tickCount} />}
              </TabsContent>

              <TabsContent value="tools-info" className="mt-0">
                <ToolsInfoTab theme={theme} connectionLogs={connectionLogs} />
              </TabsContent>
            </>
          )}
        </main>
      </Tabs>

      {!siteConfig?.footerHidden && (
        <footer
          className={`mt-6 py-6 sm:py-8 transition-all duration-300 border-t ${theme === "dark"
            ? "bg-[#0a0a0a] border-white/8"
            : "bg-gray-50 border-gray-200"
            }`}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {/* Brand Section */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-600 text-white"}`}>
                    P
                  </div>
                  <span className={`font-semibold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    Expertool
                  </span>
                </div>
                <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Real-time trading analysis and signals
                </p>
              </div>

              {/* Links Section */}
              <div className="flex flex-col gap-3 sm:col-span-2">
                <div className="flex flex-wrap gap-3 sm:gap-6">
                  <button
                    onClick={() => setIsDisclaimerOpen(true)}
                    className={`text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${theme === "dark" ? "text-gray-400 hover:text-blue-500" : "text-gray-600 hover:text-blue-600"}`}
                  >
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Risk Disclaimer
                  </button>
                  <a href="#" className={`text-xs sm:text-sm font-medium transition-colors ${theme === "dark" ? "text-gray-400 hover:text-blue-500" : "text-gray-600 hover:text-blue-600"}`}>
                    Privacy Policy
                  </a>
                  <a href="#" className={`text-xs sm:text-sm font-medium transition-colors hidden sm:inline-block ${theme === "dark" ? "text-gray-400 hover:text-blue-500" : "text-gray-600 hover:text-blue-600"}`}>
                    Terms of Service
                  </a>
                  <a href="#" className={`text-xs sm:text-sm font-medium transition-colors ${theme === "dark" ? "text-gray-400 hover:text-blue-500" : "text-gray-600 hover:text-blue-600"}`}>
                    Support
                  </a>
                </div>
              </div>
            </div>

            <div className={`mt-6 sm:mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm ${theme === "dark" ? "border-white/8 text-gray-500" : "border-gray-200 text-gray-500"}`}>
              <p>© 2026 Expertool. Powered by Deriv. All rights reserved.</p>
              <p>Trading involves risk. Please read our risk disclaimer.</p>
            </div>
          </div>
        </footer>
      )}

      <Dialog open={isDisclaimerOpen} onOpenChange={setIsDisclaimerOpen}>
        <DialogContent className={`${theme === "dark" ? "bg-[#0a0e27] border-blue-500/30 text-white" : "bg-white"} sm:max-w-2xl`}>
          <DialogHeader>
            <DialogTitle className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
              Risk Disclaimer
            </DialogTitle>
            <DialogDescription className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} text-sm leading-relaxed space-y-4`}>
              <p>
                Deriv offers complex derivatives, such as options and contracts for difference (&quot;CFDs&quot;). These products may not be suitable for all clients, and trading them puts you at risk.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDisclaimerOpen(false)}
              className={theme === "dark" ? "border-gray-500 text-gray-300 hover:bg-gray-800" : ""}
            >
              Close
            </Button>
            <Button
              onClick={() => setIsDisclaimerOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <RiskDisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        theme={theme}
      />

      {/* Floating AI Scanner */}
      <FloatingAIScanner 
        theme={theme} 
        availableSymbols={availableSymbols}
        onScanComplete={(results) => {
          console.log("[v0] AI Scanner results:", results)
        }}
      />

      {/* API Token Modal */}
      <ApiTokenModal
        open={showTokenModal}
        onSubmit={submitApiToken}
        onOAuthLogin={handleOAuthLogin}
        theme={theme}
      />
    </div>
  )
}
