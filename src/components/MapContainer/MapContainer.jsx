// src/components/MapContainer/MapContainer.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapContainer.css';
import stationsData from '../../public/stations.geojson';

// Fix Leaflet's default icon issue with Webpack
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapContainer = ({ showStations, showCars }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch or generate cars data
    // For demonstration, we'll use static data
    const fetchedCars = [
      {
        id: 1,
        position: [34.0522, -118.2437], // Los Angeles
        info: 'Car 1: Downtown LA'
      },
      {
        id: 2,
        position: [40.7128, -74.0060], // New York
        info: 'Car 2: Times Square'
      },
      {
        id: 3,
        position: [41.8781, -87.6298], // Chicago
        info: 'Car 3: Millennium Park'
      }
      // Add more cars as needed
    ];
    setCars(fetchedCars);
  }, []);

  return (
    <div className="map-container">
      <LeafletMap center={[39.8283, -98.5795]} zoom={4} className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="https://arcgis.com">ArcGIS</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />
        {showStations && (
          <GeoJSON data={stationsData} onEachFeature={(feature, layer) => {
            if (feature.properties && feature.properties.name) {
              layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
            }
          }} />
        )}
        {showCars && cars.map(car => (
          <Marker key={car.id} position={car.position}>
            <Popup>{car.info}</Popup>
          </Marker>
        ))}
      </LeafletMap>
    </div>
  );
};

export default MapContainer;
