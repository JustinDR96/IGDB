// Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [gameList, setGameList] = useState([]);
  const [popularGames, setPopularGames] = useState([]);

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

    const fetchPopularGames = async () => {
      // Ajoutez une nouvelle fonction pour récupérer les jeux populaires
      try {
        const response = await axios.get("http://localhost:3000/popular");
        setPopularGames(response.data);
        console.log(popularGames);
      } catch (error) {
        console.error("Error fetching popular games:", error);
      }
    };
    fetchGames();
    fetchPopularGames();
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
      <h2>Jeux les plus populaires</h2>{" "}
      {/* Ajoutez une nouvelle liste pour les jeux populaires */}
      <ul>
        {popularGames.map((game) => (
          <li key={game.id}>
            <Link to={`/game/${game.id}`}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
