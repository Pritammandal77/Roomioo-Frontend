
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

