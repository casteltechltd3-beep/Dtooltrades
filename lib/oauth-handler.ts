import { DERIV_APP_ID, DERIV_API } from "./deriv-config"

export interface UserAccount {
  account: string
  token: string
  currency: string
}

export interface ParsedOAuthParams {
  accounts: UserAccount[]
  error?: string
}

/**
 * Initiates OAuth login by redirecting user to Deriv OAuth provider
 */
export function initiateOAuthLogin() {
  if (typeof window === "undefined") {
    console.error("[v0] Cannot initiate OAuth login on server side")
    return
  }

  const redirectUri = `${window.location.origin}/api/auth/oauth-callback`
  const oauthUrl = new URL(DERIV_API.OAUTH_AUTHORIZE)
  
  oauthUrl.searchParams.set("app_id", DERIV_APP_ID)
  oauthUrl.searchParams.set("scope", "trade")

  console.log("[v0] Redirecting to Deriv OAuth:", oauthUrl.toString())
  window.location.href = oauthUrl.toString()
}

/**
 * Parses OAuth callback parameters from URL
 * Expected format: ?acct1=account&token1=token&cur1=currency&acct2=account&token2=token&cur2=currency...
 */
export function parseOAuthParams(searchString: string): ParsedOAuthParams {
  const params = new URLSearchParams(searchString)
  const accounts: UserAccount[] = []

  // Extract all account/token/currency combinations
  const accountMap = new Map<number, Partial<UserAccount>>()

  for (const [key, value] of params.entries()) {
    const match = key.match(/^(acct|token|cur)(\d+)$/)
    if (!match) continue

    const [, type, number] = match
    const idx = parseInt(number, 10)

    if (!accountMap.has(idx)) {
      accountMap.set(idx, {})
    }

    const account = accountMap.get(idx)!
    
    if (type === "acct") {
      account.account = value
    } else if (type === "token") {
      account.token = value
    } else if (type === "cur") {
      account.currency = value
    }
  }

  // Convert map to array and filter valid entries
  for (const account of accountMap.values()) {
    if (account.account && account.token && account.currency) {
      accounts.push(account as UserAccount)
    }
  }

  return { accounts }
}

/**
 * Stores OAuth accounts in localStorage
 */
export function storeOAuthAccounts(accounts: UserAccount[]) {
  if (typeof window === "undefined") return
  
  localStorage.setItem("deriv_oauth_accounts", JSON.stringify(accounts))
  
  // Store the first account as the current one
  if (accounts.length > 0) {
    localStorage.setItem("deriv_current_account", accounts[0].account)
    localStorage.setItem("deriv_current_token", accounts[0].token)
    localStorage.setItem("deriv_current_currency", accounts[0].currency)
  }
}

/**
 * Retrieves stored OAuth accounts from localStorage
 */
export function getStoredOAuthAccounts(): UserAccount[] {
  if (typeof window === "undefined") return []
  
  const stored = localStorage.getItem("deriv_oauth_accounts")
  return stored ? JSON.parse(stored) : []
}

/**
 * Gets the current OAuth token
 */
export function getCurrentOAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("deriv_current_token")
}
