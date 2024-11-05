import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function CreateCrewmate() {
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");
  const [color, setColor] = useState("Red");

  const handleCreate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("crewmates")
      .insert([{ name, speed: parseFloat(speed), color }]);

    if (error) console.error("Error creating crewmate:", error);
    else console.log("Crewmate created:", data);
  };

  return (
    <form className="form" onSubmit={handleCreate}>
      <h2>Create a New Crewmate</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Speed (mph)"
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
        required
      />
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        {[
          "Red",
          "Green",
          "Blue",
          "Yellow",
          "Pink",
          "Purple",
          "Orange",
          "Rainbow",
        ].map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button type="submit">Create Crewmate</button>
    </form>
  );
}

export default CreateCrewmate;
