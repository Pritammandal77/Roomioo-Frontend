import axios from 'axios';
import { axiosInstance } from '../lib/axiosInstance.js';

export const registerUser = async (data: any) => {
    const res = await axios.post(
        "http://localhost:8000/api/user/register",
        data,
        {
            withCredentials: true,
        }
    );

    return res.data;
};

export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/api/user/me");
    return res.data;
};

export const refreshAccessToken = async () => {
    const res = await axiosInstance.post("/api/user/refresh-token");
    return res.data;
};