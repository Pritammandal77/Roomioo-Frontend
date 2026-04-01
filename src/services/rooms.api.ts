import { axiosInstance } from "@/lib/axiosInstance";

export const listNewRoom = async (form: RoomForm) => {
    const res = await axiosInstance.post("/api/rooms/list-new-room", form, {
        withCredentials: true,
    });

    return res.data
}

export const fetchAllListings = async () => {
    const res = await axiosInstance.get("/api/rooms/all-listings")
    return res.data
}