
export interface User {
    _id: string;
    email: string;
    fullName: string;
    profilePicture: string;
    dob: string;
    gender: string;
    mobileNumber: string;
    instagramLink?: string;
    aboutUser?: string;
    authProvider: string;
    googleId: string | null;
    createdAt: string;
    updatedAt: string;
}


export interface EditProfile {
    fullName: string;
    dob: string;
    mobileNumber?: string;
    gender?: "male" | "female" | "others";
    instagramLink?: string;
    aboutUser?: string;
    profilePicture?: File; // Note: This is a File object
}