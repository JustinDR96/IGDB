// Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/games/");
        setGameList(response.data);
        console.log(gameList);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  return (
    <div>
      <h2>Liste de jeux</h2>
      <ul>
        {gameList.map((game) => (
          <li key={game.id}>
            <Link to={`/game/${game.id}`}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
