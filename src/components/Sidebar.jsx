import React from 'react';
import { MapPin, Search, Settings, Bell } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6 tracking-wide">🗺️ SiteSwiper</h2>

      <nav className="flex flex-col gap-4">
        <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded">
          <MapPin size={20} /> <span>Campgrounds</span>
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded">
          <Search size={20} /> <span>Search</span>
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded">
          <Bell size={20} /> <span>Alerts</span>
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded mt-auto">
          <Settings size={20} /> <span>Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
