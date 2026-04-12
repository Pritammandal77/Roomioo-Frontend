import { axiosInstance } from "@/lib/axiosInstance";

export const sendOtp = (data: any) => {
    const res = axiosInstance.post("/api/otp/send", data);
    return res;
}

export const verifyOtp = (data: any) => {
    const res = axiosInstance.post("/api/otp/verify", data);
    return res;
}

export const resendOtp = (data: any) => {
    const res = axiosInstance.post("/api/otp/resend", data);
    return res;
}