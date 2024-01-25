// Home.js
import React from "react";
import DisplayGames from "../../components/DisplayGames/DisplayGames";
import Cta from "../../components/CTA/Cta";

function Home() {
  return (
    <div className="home">
      {/* <Cta /> */}
      <DisplayGames />
    </div>
  );
}

export default Home;
