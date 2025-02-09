import MapContainer from "@/components/MapContainer";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

const FindWithMapPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/properties"
        );
        console.log("Properties:", response.data); // 데이터 확인용 로그
        setProperties(response.data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);
  return (
    <div className="flex w-full h-[calc(100vh-4rem)] bg-background">
      <Sidebar properties={properties} onFilter={() => {}} />
      <MapContainer properties={properties} />
    </div>
  );
};

export default FindWithMapPage;
