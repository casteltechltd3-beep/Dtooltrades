"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Zap, Globe, Cpu, Rocket, Loader } from "lucide-react"
import Image from "next/image"

interface LoadingStep {
  id: string
  label: string
  status: "pending" | "loading" | "complete"
  icon: any
}

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isInitializing, setIsInitializing] = useState(true)
  const [cardPhase, setCardPhase] = useState<"build" | "fill" | "complete">("build")
  const [steps, setSteps] = useState<LoadingStep[]>([
    { id: "connect", label: "Establishing Link", status: "pending", icon: Globe },
    { id: "markets", label: "Loading Symbols", status: "pending", icon: Zap },
    { id: "analyze", label: "Initializing Engine", status: "pending", icon: Cpu },
    { id: "account", label: "Verifying Account", status: "pending", icon: Shield },
    { id: "finalize", label: "Ready to Trade", status: "pending", icon: Rocket },
  ])

  useEffect(() => {
    const sequence = async () => {
      // Phase 0: Card Building (350ms)
      setCardPhase("build")
      await new Promise(resolve => setTimeout(resolve, 350))
      
      // Phase 1: Card Filling (800ms)
      setCardPhase("fill")
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Phase 2: Card Complete (200ms)
      setCardPhase("complete")
      await new Promise(resolve => setTimeout(resolve, 200))
      
      // Phase 3: Show loading
      setIsInitializing(false)

      // Phase 4: Progressive Loading
      for (let i = 0; i < steps.length; i++) {
        setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: "loading" } : s))
        const stepProgress = (i + 1) * (100 / steps.length)
        await animateTo(stepProgress, 600)
        setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: "complete" } : s))
      }

      await new Promise(resolve => setTimeout(resolve, 600))
      onComplete()
    }

    sequence()
  }, [])

  const animateTo = (target: number, duration: number) => {
    return new Promise<void>(resolve => {
      const start = progress
      const startTime = Date.now()

      const update = () => {
        const elapsed = Date.now() - startTime
        const ratio = Math.min(elapsed / duration, 1)
        const current = start + (target - start) * ratio
        setProgress(current)
        if (ratio < 1) requestAnimationFrame(update)
        else resolve()
      }
      requestAnimationFrame(update)
    })
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05010a] overflow-hidden">
      {/* Dynamic Background Elements - Premium Heritage Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Indigo Glow */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/8 blur-[150px] rounded-full animate-pulse" />
        {/* Secondary Purple Glow */}
        <div className="absolute bottom-1/4 right-1/3 w-[700px] h-[700px] bg-purple-600/6 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        {/* Gold Accent Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-75" />
      </div>

      <AnimatePresence mode="wait">
        {isInitializing ? (
          <motion.div
            key="init"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-8 sm:space-y-10"
          >
            {/* Card Initialization Animation */}
            <motion.div 
              className="relative w-48 sm:w-64"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {/* Card Container */}
              <motion.div
                className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                }}
              >
                {/* Card Border Animation */}
                {cardPhase !== "build" && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 opacity-0"
                    style={{ padding: "2px" }}
                    initial={{ opacity: 0 }}
                    animate={cardPhase === "fill" ? { opacity: 0.6 } : { opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                )}

                {/* Card Content */}
                <motion.div 
                  className="relative z-10 p-8 sm:p-10 flex flex-col items-center justify-center aspect-[2/3] bg-[#0a0a0f]"
                  initial={{ opacity: 0 }}
                  animate={cardPhase === "fill" ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                >
                  {/* Logo */}
                  <motion.div
                    className="mb-6"
                    initial={{ scale: 0 }}
                    animate={cardPhase === "fill" ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.45, type: "spring", stiffness: 200 }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                      <Loader className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-spin" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    className="text-xl sm:text-2xl font-bold text-white text-center mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={cardPhase === "fill" ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.55, duration: 0.5 }}
                  >
                    Expertool
                  </motion.h2>

                  {/* Subtitle */}
                  <motion.p
                    className="text-xs sm:text-sm text-indigo-300/70 text-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={cardPhase === "fill" ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.65, duration: 0.4 }}
                  >
                    Initializing...
                  </motion.p>

                  {/* Progress Bar */}
                  <motion.div
                    className="w-full h-1 bg-white/10 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={cardPhase === "fill" ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: "0%" }}
                      animate={cardPhase === "complete" ? { width: "100%" } : { width: "30%" }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Status Text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={cardPhase === "complete" ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <p className="text-sm text-indigo-300/60 tracking-widest uppercase">Powered by</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-sm font-bold text-white">Deriv</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl px-6 sm:px-8 flex flex-col items-center"
          >
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-2"
              >
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">Expertool</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-indigo-300/60 uppercase tracking-widest"
              >
                Initializing system
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent mt-4"
              />
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 w-full mb-12 sm:mb-16">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className={`relative p-3 sm:p-4 rounded-xl border transition-all duration-500 overflow-hidden ${
                    step.status === "complete"
                      ? "bg-indigo-600/10 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                      : step.status === "loading"
                        ? "bg-gradient-to-br from-slate-700 to-slate-800 border-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.2)]"
                        : "bg-slate-900/50 border-white/10"
                    }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                    <motion.div 
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${
                        step.status === "complete" 
                          ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white" 
                          : step.status === "loading" 
                            ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                            : "bg-white/10 text-slate-400"
                      }`}
                      animate={step.status === "loading" ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <step.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.div>
                    <div>
                      <h3 className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-tight ${
                        step.status === "loading" ? "text-amber-300" : "text-white/60"
                      }`}>
                        {step.label}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-semibold text-indigo-300/70 uppercase tracking-widest">Progress</span>
                <span className="text-lg sm:text-xl font-black text-white">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Powered by Deriv */}
            <motion.div
              className="mt-8 sm:mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Powered by</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-coral-500 to-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">D</span>
                </div>
                <span className="text-sm sm:text-base font-bold text-white">Deriv</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
