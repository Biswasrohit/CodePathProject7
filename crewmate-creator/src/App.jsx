// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateCrewmate from "./pages/CreateCrewmate";
import CrewGallery from "./pages/CrewGallery";
import CrewDetails from "./pages/CrewDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create">Create a Crewmate</Link>
          <Link to="/gallery">Crewmate Gallery</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/gallery" element={<CrewGallery />} />
          <Route path="/crewmate/:id" element={<CrewDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
