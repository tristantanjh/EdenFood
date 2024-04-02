import React from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

// const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const MapComponent = ({ locationsList }) => {
  const containerStyle = {
    width: '100%',
    height: '60vh',
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = React.useState(null);
  const [activeMarker, setActiveMarker] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    locationsList.locations.forEach((location) => {
      bounds.extend(location.position);
    });
  
    map.fitBounds(bounds);
  
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  const handleCloseInfoWindow = () => {
    setActiveMarker(null);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={locationsList.locations[0].position}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locationsList.locations.map((location) => (
        <Marker key={location.id} position={location.position} onClick={() => handleMarkerClick(location)}/>
      ))}

      {activeMarker && (
        <InfoWindow
          position={activeMarker.position}
          onCloseClick={handleCloseInfoWindow}
        >
          <div>
            <h3>{activeMarker.name}</h3>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>;
};

export default React.memo(MapComponent);
