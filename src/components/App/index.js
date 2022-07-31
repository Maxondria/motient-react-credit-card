import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "../../styles/index.scss";
import CreditCard from "../../containers/CreditCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/add-card" replace={true} />} />
        <Route path="/add-card" element={<CreditCard />} />
      </Routes>
    </Router>
  );
}

export default App;
