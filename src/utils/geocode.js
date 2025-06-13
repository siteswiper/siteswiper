// src/utils/geocode.js
export async function geocodeLocation(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}
