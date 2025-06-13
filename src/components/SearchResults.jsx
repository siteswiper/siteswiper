import React from 'react';

const SearchResults = ({ filters }) => {
  if (!filters) return null; // <== this line prevents the crash

  const { query, nights, vehicleLength, startDays } = filters;

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h2 className="text-lg font-semibold mb-2">🔍 Search Results</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Query: {query}</li>
        <li>Nights: {nights}</li>
        <li>Vehicle Length: {vehicleLength} ft</li>
        <li>Start Days: {startDays.filter(Boolean).join(', ') || 'None selected'}</li>
      </ul>
    </div>
  );
};

export default SearchResults;




