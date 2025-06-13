// netlify/functions/searchCampgrounds.js  – CommonJS version
const fetch = require('node-fetch');   // ✅ v2 works with require()

exports.handler = async (event) => {
  const { lat, lng } = event.queryStringParameters;

  // Guard-rail if env var isn’t set
  if (!process.env.RECREATION_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing RECREATION_API_KEY env variable' }),
    };
  }

  try {
    // ► RIDB “facilities” endpoint gives campground metadata
    const url = `https://ridb.recreation.gov/api/v1/facilities?latitude=${lat}&longitude=${lng}&radius=50`;
    const response = await fetch(url, {
      headers: { apikey: process.env.RECREATION_API_KEY },
    });

    const json = await response.json();

    const campgrounds = json.RECDATA.map((fac) => ({
      id:   fac.FacilityID,
      name: fac.FacilityName,
      lat:  fac.FacilityLatitude,
      lng:  fac.FacilityLongitude,
      src:  'recreation.gov',
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(campgrounds),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Fetch failed', detail: err.message }),
    };
  }
};

