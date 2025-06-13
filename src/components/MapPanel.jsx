// src/components/MapPanel.jsx
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const FlyToLocation = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 10); // zoom level 10
    }
  }, [location, map]);

  return null;
};

const MapPanel = ({ searchParams, zoomTo }) => {
  const { results = [] } = searchParams || {};
  const mapRef = useRef();

  return (
    <div className="h-[500px] w-full z-0">
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={4}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {zoomTo && <FlyToLocation location={zoomTo} />}
        {results.map((site, i) => (
          <Marker key={i} position={[site.lat, site.lng]}>
            <Popup>{site.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPanel;


