// src/pages/Dashboard.jsx
import React, { useState } from "react";
import SearchPanel from "../components/SearchPanel";
import MapPanel from "../components/MapPanel";
import AlertToggle from "../components/AlertToggle";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useState({
    results: [],
  });

  const [zoomTo, setZoomTo] = useState(null); // ✅ this was previously outside the component — fixed now

  const handleLocationSelect = (location) => {
    setZoomTo(location);
  };

  const handleSearch = (filters) => {
    console.log("🔍 Search submitted with:", filters);

    // Temporary dummy results for testing pins
    const dummyResults = [
      {
        name: "Yosemite National Park",
        lat: 37.7459,
        lng: -119.5332,
      },
      {
        name: "Zion Campground",
        lat: 37.2982,
        lng: -113.0263,
      },
    ];

    setSearchParams({
      ...filters,
      results: dummyResults,
    });
  };

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">SiteSwiper Dashboard</h1>
      <SearchPanel onSearch={handleSearch} onLocationSelect={handleLocationSelect} />
      <AlertToggle />
      <MapPanel searchParams={searchParams} zoomTo={zoomTo} />
    </div>
  );
};

export default Dashboard;
