import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

function CrewGallery() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase.from("crewmates").select("*");
      if (error) console.error("Error fetching crewmates:", error);
      else setCrewmates(data);
    };
    fetchCrewmates();
  }, []);

  return (
    <div>
      <h2>Your Crewmate Gallery</h2>
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
