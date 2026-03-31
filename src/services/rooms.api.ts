import { axiosInstance } from "@/lib/axiosInstance";

export const listNewRoom = async (form: RoomForm) => {
    let res = await axiosInstance.post("/api/rooms/list-new-room", form, {
        withCredentials: true,
    });

    return res.data
}