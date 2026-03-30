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