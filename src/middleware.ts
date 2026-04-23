import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token")?.value;
    const { pathname } = req.nextUrl;
    const publicRoutes = ["/", "/signin", "/signup"];
    const protectedRoutes = ["/profile", "/chats", "/rooms", "/listings"];

    console.log("middleware runned")

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (
        token &&
        (pathname === "/signin" || pathname === "/signup")
    ) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}


export const config = {
  matcher: [
    "/profile/:path*",
    "/chats/:path*",
    "/dashboard",  
    "/rooms/:path*",
    "/signin",
    "/signup",
  ],
};