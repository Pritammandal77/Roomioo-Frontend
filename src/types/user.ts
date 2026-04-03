

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

export type FiltersType = {
  minRent: string;
  maxRent: string;

  city: string;
  area: string;

  roomType: string[];

  AC?: boolean;
  parking?: boolean;
  refrigerator?: boolean;

  furnishedLevel: string;
  isPersonalRoomAvailable?: boolean;

  // preferences
  smoking?: boolean;
  drinking?: boolean;
  pets?: boolean;

  sleepSchedule: string;
  foodPreference: string;
  preferredGender: string;
  occupation: string;
  workStyle: string;
};