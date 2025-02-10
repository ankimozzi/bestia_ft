import MapContainer from "@/components/MapContainer";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Property } from "@/types/property";

const FindWithMapPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/properties"
        );
        console.log("Properties from server:", response.data); // Debug log
        setProperties(response.data.properties);
        // Extract unique cities
        const uniqueCities = response.data.properties
          .map((p) => p.city)
          .filter((city, index, self) => self.indexOf(city) === index)
          .sort();
        setCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="flex w-full h-[calc(100vh-4rem)] bg-background">
      <Sidebar cities={cities} onFilter={() => {}} />
      <MapContainer properties={properties} />
    </div>
  );
};

export default FindWithMapPage;
