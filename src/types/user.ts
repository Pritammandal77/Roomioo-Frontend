

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


export interface PreferencePayload {
  minBudget: number;
  maxBudget: number;
  occupation: string;
  personality: string;
  smoking: boolean;
  drinking: boolean;
  sleepSchedule: string;
  cleanliness: number;
  foodPreference: string;
  pets: boolean;
  gender: string;
  workStyle: string;
}
