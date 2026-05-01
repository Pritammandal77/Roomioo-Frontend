import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token")?.value;
    const { pathname } = req.nextUrl;

    console.log(`Middleware running on: ${pathname} | Token present: ${!!token}`);

    const isAuthPage = pathname === "/signin" || pathname === "/signup";
    
    // Define protected prefixes
    const protectedPrefixes = ["/profile", "/chats", "/listing", "/dashboard"];
    const isProtectedRoute = protectedPrefixes.some(prefix => pathname.startsWith(prefix));

    // 1. If trying to access protected route without token -> Redirect to Sign In
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    // 2. If trying to access Auth pages with a token -> Redirect to Home
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/chats/:path*",
    "/dashboard",  
    "/listing/:path*",
    "/signin",
    "/signup",
  ],
};