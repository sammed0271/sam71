// src/Map.jsx
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine'; // Import Leaflet Routing Machine

// Fix for default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom hook to move map to the user's location
function SetViewOnLocation({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 13);
    }
  }, [lat, lng, map]);

  return null;
}

const Map = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [markers, setMarkers] = useState([]); // Store all markers
  const [currentMarker, setCurrentMarker] = useState(null); // Store the most recent marker to render
  const [placeName, setPlaceName] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  
  const routingControlRef = useRef(null); // Ref for routing control
  const routingMapRef = useRef();

  const YOUR_MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2FtbWVkNzEiLCJhIjoiY2x6enBvYzc5MWN6dTJtc2EzYW1vM25qNSJ9.X9RMoWfI8Mdmrm8LGoxmwQ';

  // Get user location on component mount with real-time tracking
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });

          const userMarker = { lat: latitude, lng: longitude, name: 'You are here' };

          // Update the user marker's position as they move
          setMarkers((prevMarkers) => {
            const existingUserMarker = prevMarkers.find(marker => marker.name === 'You are here');
            if (existingUserMarker) {
              return prevMarkers.map(marker => 
                marker.name === 'You are here' ? userMarker : marker
              );
            } else {
              return [...prevMarkers, userMarker];
            }
          });

          setCurrentMarker(userMarker); 
        },
        (err) => {
          setError(err.message);
        },
        { enableHighAccuracy: true, maximumAge: 1000}
      );

      // Clean up the geolocation watch when component unmounts
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Handle search place by name
  const handlePlaceSearch = async () => {
    if (placeName) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${placeName}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newMarker = { lat: parseFloat(lat), lng: parseFloat(lon), name: display_name };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]); // Store the new marker
        setCurrentMarker(newMarker); // Only render the most recent marker
        setSearchResult(newMarker);  // Update search result state
      } else {
        alert('Location not found');
      }
    }
  };

  // // Automatically call handleRoute when searchResult is updated
  // useEffect(() => {
  //   if (searchResult) {
  //     handleRoute();
  //   }
  // }, [searchResult]);

  // Routing logic
  // Routing logic without showing any attributes on the map
const handleRoute = () => {
  // Ensure position, search result, and the map ref are available
  if (!position || !searchResult || !routingMapRef.current) {
    alert("Both your location and the search result are required for routing.");
    return;
  }

  // Check that position and searchResult contain lat/lng
  console.log("Start position: ", position);
  console.log("Search result: ", searchResult);

  const start = L.latLng(position.lat, position.lng);
  const end = L.latLng(searchResult.lat, searchResult.lng);

  // Check the map and current routing control references
  if (!routingMapRef.current) {
    console.error("Map ref is not defined!");
    return;
  }

  // Remove the existing route before creating a new one (if any)
  if (routingControlRef.current) {
    routingControlRef.current.getPlan().setWaypoints([]); // Clear waypoints first
    routingControlRef.current.remove(); // Then remove the control
    routingControlRef.current = null; // Ensure we reset the control ref
  }

  // Create a new routing control instance and add it to the map
  routingControlRef.current = L.Routing.control({
    waypoints: [start, end], // Start and end points
    router: L.Routing.mapbox('pk.eyJ1Ijoic2FtbWVkNzEiLCJhIjoiY2x6enBvYzc5MWN6dTJtc2EzYW1vM25qNSJ9.X9RMoWfI8Mdmrm8LGoxmwQ'), // Make sure your token is correct here
    lineOptions: {
      styles: [{ color: 'blue', weight: 4 }] // Style the route line
    },
    addWaypoints: false, // Disable adding waypoints interactively by users
    routeWhileDragging: false, // Disable rerouting while dragging
    show: false // Hide the route instructions panel
  }).addTo(routingMapRef.current); // Add the route to the map

  // Log to check if the routing control has been added correctly
  console.log("Routing control added to the map:", routingControlRef.current);
};


  return (
    <div className='w-full h-screen flex items-center justify-center gap-10 bg-zinc-200'>
      <div className='w-fit h-4/5 bg-zinc-100 rounded-lg overflow-hidden p-4'>
        <h2>Current Location</h2>
        {position ? (
          <div>
            <p><strong>Latitude:</strong> {position.lat}</p>
            <p><strong>Longitude:</strong> {position.lng}</p>
          </div>
        ) : (
          <p>Loading location data...</p>
        )}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <h2>Search for a Place</h2>
        <input
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          placeholder="Enter place name"
          style={{ width: '100%', padding: '10px' }}
        />
        <button onClick={handlePlaceSearch} style={{ marginTop: '10px', padding: '10px', width: '100%' }}>
          Search
        </button>
        
        {searchResult ? (
          <div>
            <p><strong>Latitude:</strong> {searchResult.lat}</p>
            <p><strong>Longitude:</strong> {searchResult.lng}</p>
          </div>
        ) : placeName ? <p>Searching for location...</p> : null}

        <button 
          onClick={handleRoute} 
          style={{ marginTop: '10px', padding: '10px', width: '100%' }} 
          disabled={!position || !searchResult}
        >
          Show Route
        </button>
      </div>

      <MapContainer className='w-3/4 h-4/5 bg-zinc-100 rounded-lg overflow-hidden' center={[51.505, -0.09]} zoom={13} ref={routingMapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Render all markers */}
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>
              {marker.name} <br /> Latitude: {marker.lat}, Longitude: {marker.lng}
            </Popup>
          </Marker>
        ))}
        
        {/* Render popup for search result */}
        {searchResult && (
          <Marker position={[searchResult.lat, searchResult.lng]}>
            <Popup>
              Found: {searchResult.name} <br /> Latitude: {searchResult.lat}, Longitude: {searchResult.lng}
            </Popup>
          </Marker>
        )}

        {/* Adjust map view when the user changes their location */}
        {position && <SetViewOnLocation lat={position.lat} lng={position.lng} />}
        {searchResult && <SetViewOnLocation lat={searchResult.lat} lng={searchResult.lng} />}
      </MapContainer>
    </div>
  );
};

export default Map;
