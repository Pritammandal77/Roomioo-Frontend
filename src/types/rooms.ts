

interface RoomForm {
  rent: number | "";
  description: string,
  city: string;
  area: string;
  coordinates: [number, number] | [];
  smoking: boolean;
  drinking: boolean;
  sleepSchedule: "early" | "late";
  cleanliness: number;
  foodPreference: "veg" | "non-veg";
  pets: boolean;
  preferredGender: "male" | "female" | "others";
  workStyle: "WFO" | "WFH" | "Hybrid";
  roomType: string;
  AC: boolean,
  refrigerator: boolean,
  parking: boolean,
  furnishedLevel: string,
  isPersonalRoomAvailable: boolean,
}