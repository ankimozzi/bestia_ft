import MapContainer from "@/components/MapContainer";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import example from "@/assets/example.json";

const FindWithMapPage = () => {
  const [properties, setProperties] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // const response = await axios.get(
        //   "http://localhost:8000/api/properties"
        // );
        console.log("Properties:", example); // 데이터 확인용 로그
        setProperties(example.properties);
        // 도시 목록 추출
        const uniqueCities = example.properties
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
