import { useState, useEffect } from "react";
import axios from "axios";
import MapContainer from "./components/MapContainer";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import FindWithMapPage from "./pages/FindWithMapPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<FindWithMapPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
