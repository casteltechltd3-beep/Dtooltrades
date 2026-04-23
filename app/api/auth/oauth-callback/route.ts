import { NextRequest, NextResponse } from 'next/server'
import { parseOAuthParams } from '@/lib/oauth-handler'

/**
 * OAuth Callback Handler for Deriv
 * Receives account and token parameters from Deriv OAuth provider
 * Query parameters format: acct1, token1, cur1, acct2, token2, cur2, etc.
 * Redirects to home with OAuth data passed via client-side script
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const queryString = request.nextUrl.search
    const error = searchParams.get('error')

    console.log('[v0] OAuth callback received')

    // Handle OAuth errors
    if (error) {
      console.error('[v0] OAuth Error:', error)
      return NextResponse.redirect(
        new URL('/?error=oauth_error', request.nextUrl.origin)
      )
    }

    // Parse OAuth parameters (acct1, token1, cur1, etc.)
    const { accounts } = parseOAuthParams(queryString)

    if (!accounts || accounts.length === 0) {
      console.error('[v0] No valid accounts found in OAuth callback')
      return NextResponse.redirect(
        new URL('/?error=no_accounts', request.nextUrl.origin)
      )
    }

    console.log('[v0] OAuth authentication successful, accounts found:', accounts.length)

    // Return HTML that stores accounts in localStorage and redirects
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authenticating...</title>
        </head>
        <body>
          <p>Authenticating with Deriv...</p>
          <script>
            try {
              const accounts = ${JSON.stringify(accounts)};
              localStorage.setItem('deriv_oauth_accounts', JSON.stringify(accounts));
              
              if (accounts.length > 0) {
                const firstAccount = accounts[0];
                localStorage.setItem('deriv_current_account', firstAccount.account);
                localStorage.setItem('deriv_current_token', firstAccount.token);
                localStorage.setItem('deriv_current_currency', firstAccount.currency);
                localStorage.setItem('deriv_oauth_authenticated', 'true');
                console.log('[v0] OAuth authentication successful');
              }
              
              // Redirect to home
              window.location.href = '/';
            } catch (error) {
              console.error('[v0] Error storing OAuth data:', error);
              window.location.href = '/?error=storage_failed';
            }
          </script>
        </body>
      </html>
    `

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('[v0] OAuth callback error:', error)
    return NextResponse.redirect(
      new URL('/?error=oauth_failed', request.nextUrl.origin)
    )
  }
}
