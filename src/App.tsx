import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import FindWithMapPage from "./pages/FindWithMapPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PropertyProcessPage from "./pages/PropertyProcessPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<FindWithMapPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route
            path="/property-process/:id"
            element={<PropertyProcessPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
