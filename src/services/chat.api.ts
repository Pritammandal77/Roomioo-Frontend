import { axiosInstance } from "@/lib/axiosInstance"
import { sendMessagePayload } from "@/types/chat"
import axios from "axios"


export const createOrFetchChat = async (userId: string) => {
    const res = await axiosInstance.post("/api/chats/new", { userId })
    return res.data
}

export const fetchAllChatsList = async () => {
    const res = await axiosInstance.get("/api/chats/all")
    return res.data
}

export const sendNewMessage = async (data: sendMessagePayload) => {
    const res = await axiosInstance.post("/api/chats/message/new", data)
    return res.data
}

export const fetchAllMessages = async (chatId: string) => {
    const res = await axiosInstance.get(`/api/message/messages/all/${chatId}`)
    return res.data
}