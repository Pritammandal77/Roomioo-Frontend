import { axiosInstance } from "@/lib/axiosInstance";
import { RoomForm } from "@/types/rooms";

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

export const fetchPropertyData = async (id: any) => {
    const res = await axiosInstance.get(`/api/rooms/listing/${id}`)
    return res;
}

export const filterListings = async (filter: any) => {
    const res = await axiosInstance.post("/api/rooms/filter", filter)
    return res.data;
}