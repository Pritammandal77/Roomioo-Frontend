"use client";
import { FilterPanelProps, FiltersType } from "@/types/rooms";
import { useState } from "react";

function FilterPanel({
  filters,
  handleChange,
  handleRoomType,
  applyFilters,
  handleClearFilters,
  listedCities,
  setIsShowFiltersPanel,
}: FilterPanelProps) {
  const [locationStatus, setLocationStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleLocation = () => {
    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handleChange({
          target: {
            name: "lat",
            value: pos.coords.latitude.toString(),
          },
        } as any);

        handleChange({
          target: {
            name: "lng",
            value: pos.coords.longitude.toString(),
          },
        } as any);

        setLocationStatus("success");
      },
      () => {
        setLocationStatus("error");
      },
    );
  };

  return (
    <div className="flex flex-col gap-3 px-4 xl:px-0 bg-white text-gray-600 z-10">
      <h2 className="text-xl font-semibold hidden xl:inline text-black">
        Filters
      </h2>

      {/* RENT */}
      <div>
        <p className="text-sm font-medium mb-2">Budget</p>
        <div className="flex gap-2">
          <input
            type="number"
            name="minRent"
            placeholder="Min"
            value={filters.minRent}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
          <input
            type="number"
            name="maxRent"
            placeholder="Max"
            value={filters.maxRent}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>
      </div>

      {/* 📍 LOCATION */}
      <div>
        <p className="text-sm font-medium mb-2">Location</p>
        <select
          name="city"
          value={filters.city}
          onChange={handleChange}
          className="w-full border p-2 mb-2 rounded-lg bg-white"
        >
          <option value="">Select City ({listedCities.length})</option>

          {listedCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input
          name="area"
          placeholder="Area"
          value={filters.area}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {/* NEARBY FILTER */}
      <div className="bg-green-50 p-3 rounded-xl border border-green-100">
        <p className="text-sm font-medium mb-2">
          Nearby :
          <span className="text-green-700 font-semibold pl-1">
            {filters.radius || 5} km
          </span>
        </p>

        {/* Location Button */}
        <button
          type="button"
          onClick={handleLocation}
          className={`w-full text-sm font-medium py-2 rounded-lg transition ${
            locationStatus === "success"
              ? "bg-green-600 text-white"
              : locationStatus === "error"
                ? "bg-red-500 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {locationStatus === "loading"
            ? "Detecting location..."
            : locationStatus === "success"
              ? "Location detected"
              : locationStatus === "error"
                ? "Permission denied"
                : "Use my current location"}
        </button>

        {/* Slider */}
        <div className="mt-3">
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={filters.radius || 5}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "radius",
                  value: e.target.value,
                },
              } as any)
            }
            className="w-full accent-green-600 cursor-pointer"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1km</span>
            <span>5km</span>
            <span>10km</span>
            <span>15km</span>
            <span>20km</span>
          </div>
        </div>

        {/* Status Message */}
        {locationStatus === "success" && (
          <p className="text-xs text-green-600 mt-2">
            Showing rooms near your location
          </p>
        )}

        {locationStatus === "error" && (
          <p className="text-xs text-red-500 mt-2">
            Please allow location access in browser
          </p>
        )}
      </div>

      {/* ROOM TYPE */}
      <div>
        <p className="text-sm font-medium mb-2">Room Type</p>
        {["1 BHK", "2 BHK", "Single room", "PG"].map((type) => (
          <label key={type} className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.roomType.includes(type)}
              onChange={() => handleRoomType(type)}
            />
            {type}
          </label>
        ))}
      </div>

      {/* 🛋 AMENITIES */}
      <div>
        <p className="text-sm font-medium mb-2">Amenities</p>

        {[
          { name: "AC", label: "AC" },
          { name: "parking", label: "Parking" },
          { name: "refrigerator", label: "Fridge" },
          { name: "isPersonalRoomAvailable", label: "Personal Room" },
        ].map((item) => (
          <label key={item.name} className="flex gap-2 text-sm">
            <input
              type="checkbox"
              name={item.name}
              checked={filters[item.name as keyof FiltersType] === true}
              onChange={handleChange}
            />
            {item.label}
          </label>
        ))}
      </div>

      {/* 🛋 FURNISHED */}
      <div>
        <p className="text-sm font-medium mb-2">Furnished</p>
        <select
          name="furnishedLevel"
          value={filters.furnishedLevel}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        >
          <option value="">Select</option>
          <option value="full furnished">Full</option>
          <option value="semi furnished">Semi</option>
          <option value="non furnished">None</option>
        </select>
      </div>

      {/* 👤 PREFERENCES */}
      <div>
        <p className="text-sm font-medium mb-2">Lifestyle</p>

        {[
          { name: "smoking", label: "Smoking" },
          { name: "drinking", label: "Drinking" },
          { name: "pets", label: "Pets" },
        ].map((item) => (
          <label key={item.name} className="flex gap-2 text-sm">
            <input
              type="checkbox"
              name={item.name}
              checked={filters[item.name as keyof FiltersType] === true}
              onChange={handleChange}
            />
            {item.label}
          </label>
        ))}
      </div>

      {/* ⚡ DROPDOWNS */}
      <div className="space-y-2">
        <select
          name="preferredGender"
          value={filters.preferredGender}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          name="occupation"
          value={filters.occupation}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        >
          <option value="">Occupation</option>
          <option value="student">Student</option>
          <option value="working professional">Working</option>
        </select>

        <select
          name="workStyle"
          value={filters.workStyle}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        >
          <option value="">Work Style</option>
          <option value="WFH">WFH</option>
          <option value="WFO">WFO</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* 🚀 BUTTONS */}
      <div className="flex gap-2 sticky bottom-0 bg-white p-3 shadow-md xl:static xl:shadow-none xl:p-0">
        <button
          onClick={() => {
            applyFilters();
            setIsShowFiltersPanel((prev) => !prev);
          }}
          className="w-full bg-green-600 text-white p-2 rounded-lg"
        >
          Apply
        </button>

        <button
          onClick={handleClearFilters}
          className="w-full border p-2 rounded-lg"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default FilterPanel;
