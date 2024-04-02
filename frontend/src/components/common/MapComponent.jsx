import React from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

// const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const MapComponent = ({ locationsList }) => {
  const containerStyle = {
    width: "100%",
    height: "60vh",
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = React.useState(null);
  const [activeMarker, setActiveMarker] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    if (
      locationsList &&
      Array.isArray(locationsList.locations) &&
      locationsList.locations.length > 0
    ) {
      const bounds = new window.google.maps.LatLngBounds();
      locationsList.locations.forEach((location) => {
        bounds.extend(location.position);
      });

      map.fitBounds(bounds);
    } else {
      const bufferPositions = [
        {
          lat: locationsList.position.lat + 0.02,
          lng: locationsList.position.lng,
        },
        {
          lat: locationsList.position.lat - 0.02,
          lng: locationsList.position.lng,
        },
        {
          lat: locationsList.position.lat,
          lng: locationsList.position.lng + 0.02,
        },
        {
          lat: locationsList.position.lat,
          lng: locationsList.position.lng - 0.02,
        },
      ];

      const bounds = new window.google.maps.LatLngBounds(
        locationsList.position
      );

      bufferPositions.forEach((buffer) => {
        bounds.extend(buffer);
      });

      map.fitBounds(bounds);
    }

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
      center={
        locationsList &&
        Array.isArray(locationsList.locations) &&
        locationsList.locations.length > 0
          ? locationsList.locations[0].position
          : locationsList.position
      }
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locationsList && Array.isArray(locationsList.locations)
        ? locationsList.locations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              onClick={() => handleMarkerClick(location)}
            />
          ))
        : locationsList && (
            <Marker
              key={locationsList.id}
              position={locationsList.position}
              onClick={() => handleMarkerClick(locationsList)}
            />
          )}

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
  ) : (
    <></>
  );
};

export default React.memo(MapComponent);
