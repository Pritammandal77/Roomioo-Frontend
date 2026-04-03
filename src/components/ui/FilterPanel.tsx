"use client";
import { FilterPanelProps, FiltersType } from "@/types/rooms";

function FilterPanel({
  filters,
  handleChange,
  handleRoomType,
  applyFilters,
  handleClearFilters,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Filters</h2>

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
        <input
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleChange}
          className="w-full border p-2 mb-2 rounded-lg"
        />
        <input
          name="area"
          placeholder="Area"
          value={filters.area}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {/* 🏠 ROOM TYPE */}
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
      <div className="flex gap-2">
        <button
          onClick={applyFilters}
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
