import { useCallback, useState, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

interface Property {
  RegionID: string;
  latitude: string;
  longitude: string;
  City: string;
  State: string;
  zipcode: string;
  price: number;
}

interface MapContainerProps {
  properties: Property[];
}

const MapContainer = ({ properties }: MapContainerProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: "100%",
    }),
    []
  );

  const center = useMemo(
    () => ({
      lat: 36.7783,
      lng: -119.4179,
    }),
    []
  );

  const handleLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const handleUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError)
    return (
      <div className="p-4 text-red-500">지도를 불러오는데 실패했습니다</div>
    );
  if (!isLoaded) return <div className="p-4">지도를 불러오는 중...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      onLoad={handleLoad}
      onUnmount={handleUnmount}
    >
      {properties?.map((property) => (
        <MarkerF
          key={property.RegionID}
          position={{
            lat: Number(property.latitude),
            lng: Number(property.longitude),
          }}
          onClick={() => setSelectedProperty(property)}
        />
      ))}
      {selectedProperty && (
        <InfoWindowF
          position={{
            lat: Number(selectedProperty.latitude),
            lng: Number(selectedProperty.longitude),
          }}
          onCloseClick={() => setSelectedProperty(null)}
        >
          <div className="max-w-[200px]">
            <h3 className="font-semibold mb-2">
              {selectedProperty.City}, {selectedProperty.State}
            </h3>
            <p className="mb-1">우편번호: {selectedProperty.zipcode}</p>
            <p className="font-bold text-blue-700">
              가격: ${selectedProperty.price.toLocaleString()}
            </p>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
};

export default MapContainer;
