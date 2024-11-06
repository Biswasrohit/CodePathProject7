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
      <div className="app-container">
        <aside className="sidebar">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create">Create a Crewmate!</Link>
              </li>
              <li>
                <Link to="/gallery">Crewmate Gallery</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<CrewGallery />} />
            <Route path="/crewmate/:id" element={<CrewDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
