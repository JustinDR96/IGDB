import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Cta() {
  const [game, setGame] = useState(null);
  const ApiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTrendingGame = async () => {
      try {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        const currentDate = new Date();

        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${ApiKey}&dates=${
            threeMonthsAgo.toISOString().split("T")[0]
          },${
            currentDate.toISOString().split("T")[0]
          }&ordering=-suggestions_count&page_size=10`
        );

        const games = response.data.results;
        const randomGame = games[Math.floor(Math.random() * games.length)];
        setGame(randomGame);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du jeu tendance :",
          error
        );
      }
    };

    fetchTrendingGame();
  }, []);

  if (!game) return <Loading />;
  return (
    <div className="CTA">
      <Link to={`/games/${game.id}`}>
        <div className="cta-content">
          <h1 className="cta-title">{game.name}</h1>
          <div className="cta-price">
            <h1 className="price-sold">-25%</h1>
            <h1 className="price">50€</h1>
          </div>
        </div>

        <div className="cta-screenshot">
          {game.background_image ? (
            <img src={game.background_image} alt="" />
          ) : (
            <div>Screenshot not available</div>
          )}
        </div>
      </Link>
    </div>
  );
}
