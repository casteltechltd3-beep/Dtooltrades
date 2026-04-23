"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Key, ExternalLink, LogIn } from "lucide-react"
import { initiateOAuthLogin } from "@/lib/oauth-handler"

interface ApiTokenModalProps {
  open: boolean
  onSubmit: (token: string) => void
  theme?: "light" | "dark"
}

export function ApiTokenModal({ open, onSubmit, theme = "dark" }: ApiTokenModalProps) {
  const [tokenInput, setTokenInput] = useState("")
  const [loginMethod, setLoginMethod] = useState<"oauth" | "token">("oauth")

  const handleSubmit = () => {
    if (tokenInput.trim().length < 10) {
      alert("Please enter a valid API token (at least 10 characters)")
      return
    }
    onSubmit(tokenInput.trim())
  }

  const handleOAuthLogin = () => {
    console.log("[v0] OAuth login initiated from modal")
    initiateOAuthLogin()
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className={`sm:max-w-md ${theme === "dark" ? "bg-[#0a0e27] border-blue-500/30 text-white" : "bg-white border-gray-200"}`}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>
            <div className="flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              Connect to Deriv
            </div>
          </DialogTitle>
        <DialogDescription className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
          Choose your preferred authentication method to connect to Deriv.
        </DialogDescription>
        </DialogHeader>

        {/* OAuth Login Option */}
        <div className={`p-4 rounded-lg border ${loginMethod === "oauth" ? (theme === "dark" ? "bg-blue-500/10 border-blue-500/50" : "bg-blue-50 border-blue-300") : (theme === "dark" ? "bg-gray-900/50 border-gray-700" : "bg-gray-100 border-gray-300")}`}>
          <button
            onClick={() => setLoginMethod("oauth")}
            className="w-full text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-semibold ${loginMethod === "oauth" ? (theme === "dark" ? "text-blue-400" : "text-blue-700") : (theme === "dark" ? "text-gray-300" : "text-gray-700")}`}>
                Deriv OAuth Login (Recommended)
              </h3>
              <span className={`text-xs px-2 py-1 rounded ${theme === "dark" ? "bg-blue-500/30 text-blue-300" : "bg-blue-200 text-blue-800"}`}>
                Secure
              </span>
            </div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Sign in with your Deriv account directly
            </p>
          </button>
          {loginMethod === "oauth" && (
            <Button
              onClick={handleOAuthLogin}
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login with Deriv
            </Button>
          )}
        </div>

        {/* Token Option */}
        <div className={`p-4 rounded-lg border ${loginMethod === "token" ? (theme === "dark" ? "bg-amber-500/10 border-amber-500/50" : "bg-amber-50 border-amber-300") : (theme === "dark" ? "bg-gray-900/50 border-gray-700" : "bg-gray-100 border-gray-300")}`}>
          <button
            onClick={() => setLoginMethod("token")}
            className="w-full text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-semibold ${loginMethod === "token" ? (theme === "dark" ? "text-amber-400" : "text-amber-700") : (theme === "dark" ? "text-gray-300" : "text-gray-700")}`}>
                Legacy API Token
              </h3>
              <span className={`text-xs px-2 py-1 rounded ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-300 text-gray-700"}`}>
                Alternative
              </span>
            </div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Use your Deriv API token directly
            </p>
          </button>
        </div>

        {loginMethod === "token" && (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="api-token" className={theme === "dark" ? "text-white" : "text-gray-900"}>
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                Deriv Legacy API Token
              </div>
            </Label>
            <Input
              id="api-token"
              type="password"
              placeholder="Enter your Deriv API token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit()
              }}
              className={
                theme === "dark"
                  ? "bg-[#0f1629] border-blue-500/30 text-white placeholder:text-gray-500"
                  : "bg-white border-gray-300"
              }
            />
          </div>

          <div
            className={`text-sm p-3 rounded-lg ${theme === "dark" ? "bg-amber-500/10 border border-amber-500/30" : "bg-amber-50 border border-amber-200"}`}
          >
            <p className={`font-semibold mb-1 ${theme === "dark" ? "text-amber-400" : "text-amber-700"}`}>
              How to get your API token:
            </p>
            <ol
              className={`list-decimal list-inside space-y-1 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
            >
              <li>Log in to your Deriv account</li>
              <li>Go to Settings → API Tokens</li>
              <li>Create a new token with "Trade" permissions</li>
              <li>Copy and paste the token here</li>
            </ol>
            <a
              href="https://app.deriv.com/account/api-token"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 mt-2 text-xs font-medium ${theme === "dark" ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"}`}
            >
              Go to Deriv API Tokens <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={tokenInput.trim().length < 10}
          >
            Connect
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
