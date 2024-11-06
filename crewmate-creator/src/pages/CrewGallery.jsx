import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

function CrewGallery() {
  const [crewmates, setCrewmates] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase.from("crewmates").select("*");
      if (error) console.error("Error fetching crewmates:", error);
      else {
        setCrewmates(data);
        calculateStats(data);
      }
    };
    fetchCrewmates();
  }, []);

  const calculateStats = (data) => {
    const total = data.length;
    const categoryCounts = data.reduce((acc, crewmate) => {
      acc[crewmate.category] = (acc[crewmate.category] || 0) + 1;
      return acc;
    }, {});

    const percentageByCategory = {};
    for (const category in categoryCounts) {
      percentageByCategory[category] = (
        (categoryCounts[category] / total) *
        100
      ).toFixed(1);
    }

    // Custom success metric (e.g., more Warriors means higher success)
    const successScore = ((categoryCounts["Warrior"] || 0) / total) * 100;

    setStats({
      total,
      percentageByCategory,
      successScore: successScore.toFixed(1),
    });
  };

  return (
    <div>
      <h2>Your Crewmate Gallery</h2>

      <div className="stats">
        <p>Total Crewmates: {stats.total}</p>
        {Object.entries(stats.percentageByCategory || {}).map(
          ([category, percent]) => (
            <p key={category}>
              {category}: {percent}%
            </p>
          )
        )}
        <p>Success Metric: {stats.successScore}%</p>
      </div>

      <ul>
        {crewmates.length === 0 ? (
          <p>No crewmates found.</p>
        ) : (
          crewmates.map((crewmate) => (
            <li key={crewmate.id}>
              <Link to={`/crewmate/${crewmate.id}`}>
                {crewmate.name} ({crewmate.color})
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CrewGallery;
