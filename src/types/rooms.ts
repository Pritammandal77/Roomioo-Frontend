
export interface RoomForm {
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
  occupation: "student" | "working professional" | "others"
  workStyle: "WFO" | "WFH" | "Hybrid";
  roomType: string;
  AC: boolean,
  refrigerator: boolean,
  parking: boolean,
  furnishedLevel: string,
  isPersonalRoomAvailable: boolean,
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

  // location
  lat?: number | "";
  lng?: number | "";
  radius?: number | "";

  sleepSchedule: string;
  foodPreference: string;
  preferredGender: string;
  occupation: string;
  workStyle: string;
};

export type FilterPanelProps = {
  filters: FiltersType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleRoomType: (type: string) => void;
  applyFilters: () => void;
  handleClearFilters: () => void;
  listedCities: string[];
  setIsShowFiltersPanel: React.Dispatch<React.SetStateAction<boolean>>;
};
