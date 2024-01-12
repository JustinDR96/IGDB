import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cta() {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchTrendingGame = async () => {
      try {
        const response = await axios.get("http://localhost:3000/trending");
        const gamesWithScreenshots = response.data.filter(
          (game) => game.screenshots && game.screenshots[0]?.image_id
        );
        const randomGame =
          gamesWithScreenshots[
            Math.floor(Math.random() * gamesWithScreenshots.length)
          ];
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

  if (!game) return "Chargement...";
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
          {game.screenshots?.[0]?.image_id ? (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.screenshots[0].image_id}.jpg`}
              alt=""
            />
          ) : (
            <div>Screenshot not available</div>
          )}
        </div>
      </Link>
    </div>
  );
}
