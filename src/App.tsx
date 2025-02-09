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
