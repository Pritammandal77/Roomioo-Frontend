import { axiosInstance } from "@/lib/axiosInstance"


export const fetchInterests = async () => {
    const res = await axiosInstance.get("/api/interests/fetch-interests")
    return res.data
}


export const addInterest = async(data: any) => {
    const res = await axiosInstance.post("/api/interests/add-new-interest",
        data
    )
    return res.data
}