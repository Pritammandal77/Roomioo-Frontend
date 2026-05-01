import { axiosInstance } from "@/lib/axiosInstance";
import { EditProfile } from "@/types/user";


export const registerUser = async (data: FormData) => {
    const res = await axiosInstance.post("/api/user/register", data);
    return res.data;
};

export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/api/user/me");
    return res.data;
};

export const getUserById = async (id: any) => {
    const res = await axiosInstance.get(`/api/user/${id}`)
    return res.data;
}

export const logOutUser = async () => {
    const res = await axiosInstance.post("api/user/logout")
    return res.data
}

export const logInUser = async (data: any) => {
    const res = await axiosInstance.post("/api/user/login", data);
    return res.data;
};


export const editProfile = async (data: EditProfile) => {
    const formData = new FormData();
    
    // Append all text fields
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && key !== 'profilePicture') {
            formData.append(key, value);
        }
    });

    // Append the file
    if (data.profilePicture) {
        formData.append("profilePicture", data.profilePicture);
    }

    const res = await axiosInstance.put("/api/user/edit-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};