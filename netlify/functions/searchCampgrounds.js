// netlify/functions/searchCampgrounds.js
const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { lat, lng, radius = 50 } = event.queryStringParameters;

  if (!lat || !lng) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing lat/lng" }),
    };
  }

  const url = `https://www.recreation.gov/api/camps/campgrounds?latitude=${lat}&longitude=${lng}&radius=${radius}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const campgrounds = data.campgrounds.map((camp) => ({
      id: camp.campground_id,
      name: camp.campground_name,
      lat: camp.latitude,
      lng: camp.longitude,
      source: "recreation.gov",
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(campgrounds),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch campground data" }),
    };
  }
};
