import { useState, useEffect } from "react";
import axios from "axios";
import MapContainer from "./components/MapContainer";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";

function App() {
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
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <div className="flex w-full h-[calc(100vh-4rem)] bg-background">
                {/* Sidebar with modern styling */}
                <div className="w-[400px] border-r bg-card">
                  <div className="p-4 h-full overflow-hidden flex flex-col">
                    <div className="space-y-2 mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        매물 목록
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        총 {properties.length}개의 매물이 있습니다
                      </p>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <Sidebar properties={properties} onFilter={() => {}} />
                    </div>
                  </div>
                </div>

                {/* Map Container with modern styling */}
                <div className="flex-1 relative">
                  <div className="absolute inset-0">
                    <MapContainer properties={properties} />
                  </div>
                </div>
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
