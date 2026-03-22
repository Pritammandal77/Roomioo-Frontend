import { axiosInstance } from "@/lib/axiosInstance";


export const registerUser = async (data: FormData) => {
    const res = await axiosInstance.post("/api/user/register", data);
    return res.data;
};

export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/api/user/me");
    return res.data;
};

export const logOutUser = async () => {
    const res = await axiosInstance.post("api/user/logout")
    return res.data
}


export const logInUser = async (data: any) => {
  const res = await axiosInstance.post("/api/user/login", data);
  return res.data;
};