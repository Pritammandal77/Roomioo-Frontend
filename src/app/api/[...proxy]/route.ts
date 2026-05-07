// app/api/[...proxy]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function handler(req: NextRequest) {
    const { pathname, search } = req.nextUrl;

    const backendPath = pathname.replace(/^\/api/, "");
    const url = `${BACKEND_URL}/api${backendPath}${search}`;

    const isFormData = req.headers.get("content-type")?.includes("multipart/form-data");

    const body = req.method === "GET" || req.method === "HEAD"
        ? undefined
        : isFormData
            ? await req.blob()
            : await req.text();

    const headers = new Headers();
    headers.set("content-type", req.headers.get("content-type") || "application/json");
    headers.set("accept-encoding", "identity");  // tells Render: no compression
    const cookies = req.headers.get("cookie");
    if (cookies) {
        headers.set("cookie", cookies);
    }

    const backendRes = await fetch(url, {
        method: req.method,
        headers,
        body,
        credentials: "include",
    });

    const response = new NextResponse(backendRes.body, {
        status: backendRes.status,
        headers: backendRes.headers,
    });

    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
        response.headers.set("set-cookie", setCookie);
    }

    return response;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;