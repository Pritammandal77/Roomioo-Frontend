import { axiosInstance } from "@/lib/axiosInstance";


export const registerUser = async (data: FormData) => {
    const res = await axiosInstance.post("/api/user/register", data);
    return res.data;
};

export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/api/user/me");
    return res.data;
};