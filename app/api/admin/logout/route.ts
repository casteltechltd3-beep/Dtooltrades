import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const response = NextResponse.json({ success: true })

    // Clear the session cookie
    response.cookies.set("admin_session", "", {
        path: "/",
        httpOnly: true,
        maxAge: 0,
    })

    return response
}
