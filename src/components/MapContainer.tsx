import { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { Property } from "@/types/property";
import { usePropertyStore } from "@/store/propertyStore";

interface MapContainerProps {
  properties: Property[];
}

// Move constants outside of component
const GOOGLE_MAPS_LIBRARIES: "marker"[] = ["marker"];

const MapContainer = ({ properties }: MapContainerProps) => {
  console.log("Properties received:", properties); // Check if data is properly passed

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
    libraries: GOOGLE_MAPS_LIBRARIES,
    language: "en",
  });

  const navigate = useNavigate();
  const { selectedProperty, setSelectedProperty } = usePropertyStore();

  const [propertyImage, setPropertyImage] = useState<string>("");
  const [center, setCenter] = useState(
    properties.length > 0
      ? {
          lat: properties[0].position.lat,
          lng: properties[0].position.lng,
        }
      : {
          lat: 34.0522,
          lng: -118.2437,
        }
  );

  const getRandomPropertyImage = () => {
    // Picsum Photos API - Random property image (800x600)
    return `https://picsum.photos/seed/${Math.random()}/800/600`;
  };

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
    setPropertyImage(getRandomPropertyImage());
    setCenter({
      lat: property.position.lat,
      lng: property.position.lng,
    });
  };

  const handlePropertyClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
  };

  const onLoad = (map: google.maps.Map) => {
    if (!properties || properties.length === 0) return;
    console.log("Map loaded with properties:", properties);
  };

  useEffect(() => {
    if (!properties.length) return;

    // Marker creation logic
    properties.forEach((property) => {
      console.log(
        "Creating marker for:",
        property.city,
        property.position.lat,
        property.position.lng
      );
      // Marker creation code
    });
  }, [properties]);

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
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={{
              lat: property.position.lat,
              lng: property.position.lng,
            }}
            onClick={() => handleMarkerClick(property)}
            title={property.title}
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={{
              lat: selectedProperty.position.lat,
              lng: selectedProperty.position.lng,
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
                {selectedProperty.address}
              </p>
              <p className="text-lg font-bold text-blue-600">
                ${selectedProperty.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Region: {selectedProperty.state}
              </p>
              <p className="text-sm text-gray-500">
                Metro: {selectedProperty.city}
              </p>
              <button
                onClick={() => handlePropertyClick(selectedProperty.id)}
                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
