import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/games");
        setGames(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {games.map((game) => (
        <div key={game._id}>{game.name}</div>
      ))}
    </div>
  );
}

export default App;
