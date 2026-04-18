"use client"
import { useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000"

let socket: Socket | null = null

export const getSocket = (): Socket => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            withCredentials: true,
            transports: ["websocket"],
        })
    }
    return socket
}

export const useSocket = (userId: string | undefined) => {
    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        if (!userId) return
        const s = getSocket()
        socketRef.current = s

        s.emit("user-online", userId)

        return () => {
            // don't disconnect on unmount — keep socket alive across pages
        }
    }, [userId])

    return socketRef.current ?? getSocket()
}