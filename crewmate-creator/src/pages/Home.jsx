import React from "react";
import crewmatesImage from "../images/home-page.png";

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to the Crewmate Creator!</h2>

      <img src={crewmatesImage} alt="Crewmates" className="crewmates-image" />

      <p>
        This is where you can create your own crewmates and view them in a
        gallery.
      </p>
    </div>
  );
}

export default Home;
