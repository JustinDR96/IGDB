// Home.js
import React from "react";
import DisplayPopularGames from "../../components/DisplayPopularGames/DisplayPopularGames";
import DisplayPreorderGames from "../../components/DisplayPreorderGames/DisplayPreorderGames";

function Home() {
  return (
    <div className="home">
      <h1>page Home</h1>
      <DisplayPopularGames />
      <DisplayPreorderGames />
    </div>
  );
}

export default Home;
