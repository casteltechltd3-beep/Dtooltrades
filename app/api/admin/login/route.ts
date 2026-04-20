import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json()

        if (!username || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
        }

        // Hardcode admin verify to avoid SQLite breaking on Vercel deployment
        // Make it robust to copy-paste trailing spaces and case sensitivity
        const cleanUser = username.trim().toLowerCase()
        const cleanPass = password.trim()

        const isValid = cleanUser === "admin" && cleanPass === "Dtool@2026"

        if (!isValid) {
            console.log(`[Login Failed] Invalid attempt. User: '${username}', Pass length: ${password.length}`)
            return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
        }

        const response = NextResponse.json({ success: true, user: { username: "admin", role: "admin" } })

        // Set secure httpOnly cookie for session management
        response.cookies.set("admin_session", JSON.stringify({ authenticated: true, timestamp: Date.now() }), {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1 day
        })

        return response
    } catch (error) {
        console.error("[Login API] Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
