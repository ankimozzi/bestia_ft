import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

interface Property {
  region_id: number;
  region_name: number;
  city: string;
  state: string;
  metro: string;
  county_name: string;
  price: number;
  latitude: number;
  longitude: number;
}

interface MapContainerProps {
  properties: Property[];
}

// 상수를 컴포넌트 외부로 이동
const GOOGLE_MAPS_LIBRARIES: "marker"[] = ["marker"];

const MapContainer: React.FC<MapContainerProps> = ({ properties }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [propertyImage, setPropertyImage] = useState<string>("");
  const [center, setCenter] = useState(
    properties.length > 0
      ? {
          lat: properties[0].latitude,
          lng: properties[0].longitude,
        }
      : {
          lat: 34.0522,
          lng: -118.2437,
        }
  );

  const getRandomPropertyImage = () => {
    // Picsum Photos API - 무작위 부동산 이미지 (800x600)
    return `https://picsum.photos/seed/${Math.random()}/800/600`;
  };

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
    setPropertyImage(getRandomPropertyImage());
    setCenter({ lat: property.latitude, lng: property.longitude });
  };

  const onLoad = (map: google.maps.Map) => {
    if (!properties || properties.length === 0) return;

    properties.forEach((property) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: {
          lat: property.latitude,
          lng: property.longitude,
        },
        map,
        title: property.city,
      });

      marker.addListener("click", () => handleMarkerClick(property));
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex-1 relative">
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        zoom={6}
        center={center}
        onLoad={onLoad}
        onClick={() => setSelectedProperty(null)}
        options={{
          mapId: "b7b796cbc9406757",
        }}
      >
        {selectedProperty && (
          <InfoWindow
            position={{
              lat: selectedProperty.latitude,
              lng: selectedProperty.longitude,
            }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div className="p-2 max-w-[300px]">
              <div className="relative w-full h-[200px] mb-3 rounded-lg overflow-hidden">
                <img
                  src={propertyImage}
                  alt={`${selectedProperty.city} property`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-1">
                {selectedProperty.city}, {selectedProperty.state}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedProperty.county_name}
              </p>
              <p className="text-lg font-bold text-blue-600">
                ${selectedProperty.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Region: {selectedProperty.region_name}
              </p>
              <p className="text-sm text-gray-500">
                Metro: {selectedProperty.metro}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
