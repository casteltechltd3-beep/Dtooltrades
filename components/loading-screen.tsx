"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Zap, Globe, Cpu, Rocket } from "lucide-react"
import Image from "next/image"

interface LoadingStep {
  id: string
  label: string
  status: "pending" | "loading" | "complete"
  icon: any
  color: string
}

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isInitializing, setIsInitializing] = useState(true)
  const [steps, setSteps] = useState<LoadingStep[]>([
    { id: "connect", label: "Establishing Secure Link", status: "pending", icon: Globe, color: "from-indigo-500 to-indigo-600" },
    { id: "markets", label: "Calibrating Market Feeds", status: "pending", icon: Zap, color: "from-amber-500 to-amber-600" },
    { id: "analyze", label: "Quantum Analysis Engaged", status: "pending", icon: Cpu, color: "from-purple-500 to-purple-600" },
    { id: "account", label: "Verifying Authentication", status: "pending", icon: Shield, color: "from-indigo-400 to-indigo-500" },
    { id: "finalize", label: "Launching Interface", status: "pending", icon: Rocket, color: "from-amber-400 to-amber-500" },
  ])

  useEffect(() => {
    const sequence = async () => {
      // Phase 0: Initializing Glow
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsInitializing(false)

      // Phase 1: Progressive Loading
      for (let i = 0; i < steps.length; i++) {
        setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: "loading" } : s))
        const stepProgress = (i + 1) * (100 / steps.length)
        await animateTo(stepProgress, 800)
        setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: "complete" } : s))
      }

      await new Promise(resolve => setTimeout(resolve, 800))
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center space-y-6 sm:space-y-8"
          >
            <div className="relative">
              {/* Animated Gradient Ring */}
              <motion.div 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 p-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full bg-[#05010a]" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/ph-logo.png"
                  alt="PH Logo"
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-bold tracking-[0.3em] text-white uppercase italic">Initializing System</h2>
              <p className="text-[9px] sm:text-[10px] text-indigo-400/60 tracking-[0.5em] mt-2 uppercase">Heritage Protocol V2.0</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl px-6 sm:px-8 flex flex-col items-center"
          >
            {/* Header */}
            <div className="text-center mb-8 sm:mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-4 sm:mb-6 flex justify-center"
              >
                <Image
                  src="/ph-logo.png"
                  alt="PH Logo"
                  width={64}
                  height={64}
                  className="w-9 h-9 sm:w-16 sm:h-16 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                />
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-black italic tracking-tighter text-white sm:text-6xl"
              >
                PROFIT<span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">HUB</span>
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent mt-4 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              />
            </div>

            {/* Glowing Step Cards - Premium Heritage Theme */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 w-full mb-8 sm:mb-12">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative p-3 sm:p-6 rounded-2xl border transition-all duration-500 overflow-hidden group ${step.status === "complete"
                    ? "bg-gradient-to-br from-indigo-600/15 to-purple-600/10 border-indigo-500/30 shadow-[0_0_25px_rgba(99,102,241,0.15)]"
                    : step.status === "loading"
                      ? "bg-gradient-to-br from-slate-800 to-slate-900 border-indigo-500/60 shadow-[0_0_40px_rgba(99,102,241,0.25)] scale-105 z-10"
                      : "bg-black/20 border-white/5 opacity-50"
                    } ${idx === 4 && steps.length % 2 !== 0 ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  {/* Subtle Glow Overlay */}
                  {step.status === "loading" && (
                    <motion.div
                      layoutId="glow"
                      className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-10 animate-pulse`}
                    />
                  )}

                  <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 relative z-10">
                    <div className={`w-7 h-7 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all ${
                      step.status === "complete" 
                        ? `bg-gradient-to-br ${step.color} text-white shadow-lg` 
                        : step.status === "loading" 
                          ? `bg-gradient-to-br ${step.color} text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]` 
                          : "bg-white/5 text-slate-500"
                      }`}>
                      <step.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${step.status === "loading" ? "animate-bounce" : ""}`} />
                    </div>
                    <div>
                      <h3 className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${step.status === "loading" ? "text-amber-400" : "text-white/70"
                        }`}>
                        {step.label.split(' ')[0]}
                      </h3>
                      <p className="text-[7px] sm:text-[8px] text-white/40 truncate mt-0.5 sm:mt-1">{step.label.split(' ').slice(1).join(' ')}</p>
                    </div>
                  </div>

                  {step.status === "loading" && (
                    <motion.div 
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${step.color} animate-[loading-bar_1.5s_infinite]`}
                      style={{ width: "100%" }} 
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Master Progress */}
            <div className="w-full max-w-md">
              <div className="flex justify-between items-end mb-2 sm:mb-3">
                <span className="text-[9px] sm:text-[10px] font-bold bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent tracking-[0.15em] sm:tracking-[0.2em] uppercase">Integration</span>
                <span className="text-lg sm:text-xl font-black text-white italic">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 sm:h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px] sm:p-[2px] border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 sm:bottom-12 text-center opacity-40">
        <p className="text-[8px] sm:text-[9px] text-indigo-200 uppercase tracking-[0.3em] sm:tracking-[0.5em] font-medium">Heritage Protocol Enabled</p>
      </div>

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
