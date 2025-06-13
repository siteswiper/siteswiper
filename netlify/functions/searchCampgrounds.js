import fetch from 'node-fetch';

export async function handler(event) {
  const { lat, lng } = event.queryStringParameters;

  try {
    const response = await fetch(`https://ridb.recreation.gov/api/v1/campsites?latitude=${lat}&longitude=${lng}`, {
      headers: {
        apikey: process.env.RECREATION_API_KEY
      }
    });

    const data = await response.json();

    const campgrounds = data.campsites.map((camp) => ({
      name: camp.Name,
      lat: camp.Latitude,
      lng: camp.Longitude,
      source: "recreation.gov"
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(campgrounds)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch campground data" })
    };
  }
}

