import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function CreateCrewmate() {
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");
  const [color, setColor] = useState("Red");
  const [category, setCategory] = useState("Developer");

  const categories = {
    Developer: {
      speeds: [1, 2, 3],
      colors: ["Blue", "Green"],
    },
    Designer: {
      speeds: [2, 4],
      colors: ["Yellow", "Pink"],
    },
    Warrior: {
      speeds: [5, 6, 7],
      colors: ["Red", "Black"],
    },
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("crewmates")
      .insert([{ name, speed: parseFloat(speed), color, category }]);

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
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {Object.keys(categories).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select value={speed} onChange={(e) => setSpeed(e.target.value)} required>
        {categories[category].speeds.map((s) => (
          <option key={s} value={s}>
            {s} mph
          </option>
        ))}
      </select>

      <select value={color} onChange={(e) => setColor(e.target.value)} required>
        {categories[category].colors.map((c) => (
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
