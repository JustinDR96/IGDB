// Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const bestGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/best");
        setGameList(response.data);
        console.log(gameList);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    bestGames();
  }, []);

  return (
    <div>
      <h1>Home page</h1>
      <h2>Liste de jeux</h2>
      <ul>
        {gameList.map((game) => (
          <li key={game.id}>
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_720p/${
                game.cover.image_id
              }.jpg`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
