import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Skip middleware for login page and public routes
    if (pathname === "/admin/login" || pathname.startsWith("/api/admin/login")) {
        return NextResponse.next()
    }

    // Check if accessing admin routes
    if (pathname.startsWith("/admin")) {
        const sessionCookie = request.cookies.get("admin_session")

        if (!sessionCookie) {
            return NextResponse.redirect(new URL("/admin/login", request.url))
        }

        try {
            const session = JSON.parse(sessionCookie.value)
            if (!session.authenticated) {
                return NextResponse.redirect(new URL("/admin/login", request.url))
            }
        } catch (error) {
            console.error("[Middleware] Invalid session cookie:", error)
            return NextResponse.redirect(new URL("/admin/login", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"],
}
