import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient.js";
import { useParams, useNavigate } from "react-router-dom";

function CrewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");
  const [color, setColor] = useState("Red");

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching crewmate:", error);
      } else {
        setCrewmate(data);
        setName(data.name);
        setSpeed(data.speed);
        setColor(data.color);
      }
    };
    fetchCrewmate();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("crewmates")
      .update({ name, speed: parseFloat(speed), color })
      .eq("id", id);

    if (error) {
      console.error("Error updating crewmate:", error);
    } else {
      setCrewmate(data[0]);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this crewmate?"
    );
    if (confirmed) {
      const { error } = await supabase.from("crewmates").delete().eq("id", id);
      if (error) {
        console.error("Error deleting crewmate:", error);
      } else {
        navigate("/gallery");
      }
    }
  };

  if (!crewmate) return <p>Loading...</p>;

  return (
    <div>
      <h2>Crewmate: {crewmate.name}</h2>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
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
          <button className="edit-btn" type="submit">
            Update Crewmate
          </button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Speed: {crewmate.speed} mph</p>
          <p>Color: {crewmate.color}</p>
          <button className="edit-btn" onClick={handleEditClick}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default CrewDetails;
