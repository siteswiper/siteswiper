// src/components/SearchPanel.jsx
import React, { useState } from "react";

const MOCK_CAMPGROUND_SUGGESTIONS = [
  { name: "Yosemite National Park", lat: 37.7459, lng: -119.5332 },
  { name: "Zion National Park", lat: 37.2982, lng: -113.0263 },
  { name: "Grand Canyon", lat: 36.1069, lng: -112.1129 },
  { name: "Yellowstone", lat: 44.4280, lng: -110.5885 },
  { name: "Joshua Tree", lat: 33.8734, lng: -115.9010 },
];

const SearchPanel = ({ onSearch, onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [nights, setNights] = useState("");
  const [vehicleLength, setVehicleLength] = useState("");
  const [startDays, setStartDays] = useState([]);
  const [siteType, setSiteType] = useState("");
  const [hookups, setHookups] = useState({
    electric: false,
    water: false,
    sewer: false,
  });

  const toggleDay = (day) => {
    setStartDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleHookup = (type) => {
    setHookups((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSearchClick = () => {
    onSearch({
      query,
      nights,
      vehicleLength,
      startDays,
      siteType,
      hookups,
    });
  };

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const matches = MOCK_CAMPGROUND_SUGGESTIONS.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleSuggestionClick = (item) => {
    setQuery(item.name);
    setSuggestions([]);

    if (onLocationSelect) {
      onLocationSelect({ lat: item.lat, lng: item.lng });
    }

    if (onSearch) {
      onSearch({
        query: item.name,
        nights: "",
        vehicleLength: "",
        startDays: [],
        siteType: "",
        hookups: {},
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <label className="block font-medium text-black">Campground Name:</label>
      <input
        type="text"
        placeholder="Campground name"
        className="w-full border p-2 rounded text-black"
        value={query}
        onChange={handleQueryChange}
      />
      {suggestions.length > 0 && (
        <ul className="border border-gray-300 rounded bg-white text-black">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      <label className="block font-medium text-black">Trip Filters:</label>
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Min Nights"
          className="border p-2 rounded text-black w-1/3"
          value={nights}
          onChange={(e) => setNights(e.target.value)}
        />
        <input
          type="number"
          placeholder="Vehicle Length"
          className="border p-2 rounded text-black w-1/3"
          value={vehicleLength}
          onChange={(e) => setVehicleLength(e.target.value)}
        />
        <select
          value={siteType}
          onChange={(e) => setSiteType(e.target.value)}
          className="border p-2 rounded text-black w-1/3"
        >
          <option value="">Any Type</option>
          <option value="tent">Tent</option>
          <option value="rv">RV</option>
          <option value="trailer">Trailer</option>
          <option value="walk-in">Walk-in</option>
          <option value="group">Group</option>
        </select>
      </div>

      <label className="block font-medium text-black">Start Days:</label>
      <div className="flex flex-wrap gap-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`px-2 py-1 rounded border ${
              startDays.includes(day)
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <label className="block font-medium text-black">Hookups:</label>
      <div className="flex flex-wrap gap-4">
        {["electric", "water", "sewer"].map((type) => (
          <label key={type} className="flex items-center gap-2 text-black">
            <input
              type="checkbox"
              checked={hookups[type]}
              onChange={() => toggleHookup(type)}
            />
            <span className="capitalize">{type}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleSearchClick}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Search
      </button>
    </div>
  );
};

export default SearchPanel;



















