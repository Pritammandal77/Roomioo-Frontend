import { axiosInstance } from "@/lib/axiosInstance";
import { PreferencePayload } from "@/types/user";


export const addPreference = async (data: PreferencePayload) => {
    const res = await axiosInstance.post("/api/preference/add", data);
    return res.data;
}

export const getPreference = async () => {
    const res = await axiosInstance.get("/api/preference/get");
    return res.data;
}


export interface PreferenceData {
    _id: string;
    user: string;

    budget: {
        min: number;
        max: number;
    };

    occupation: string;
    personality: string;

    lifestyle: {
        smoking: boolean;
        drinking: boolean;
        sleepSchedule: "early" | "late";
        cleanliness: number; // 1–5
        foodPreference: "veg" | "non-veg";
        pets: boolean;
    };

    gender: "male" | "female" | "others";
    workStyle: "WFO" | "WFH" | "Hybrid" | "";

    createdAt: string;
    updatedAt: string;

    __v: number;
}