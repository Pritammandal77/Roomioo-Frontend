import { axiosInstance } from "@/lib/axiosInstance";
import { PreferencePayload } from "@/types/preference";


export const addPreference = async (data: PreferencePayload) => {
    const res = await axiosInstance.post("/api/preference/add", data);
    return res.data;
}

export const getPreference = async () => {
    const res = await axiosInstance.get("/api/preference/get");
    return res.data;
}

export const upsertPreference = async (data: PreferencePayload) => {
    const res = await axiosInstance.post("/api/preference/upsert", data);
    return res.data;
}
