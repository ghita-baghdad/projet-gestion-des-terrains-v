import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  userLatitude?: number; // Optional user latitude
  userLongitude?: number; // Optional user longitude
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, userLatitude, userLongitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add the routing control
    if (userLatitude && userLongitude) {
      L.Routing.control({
        waypoints: [
          L.latLng(userLatitude, userLongitude), // User's location
          L.latLng(latitude, longitude), // Selected terrain location
        ],
        routeWhileDragging: true,
      }).addTo(map);
    }

    return () => {
      // Cleanup when the component unmounts
      map.remove();
    };
  }, [latitude, longitude, userLatitude, userLongitude]);

  return <div ref={mapRef} style={{ height: '700px', width: '100%' }} />;
};

export default MapComponent;
