import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import useAuth from "../../hook/auth";

export default function Cta() {
  const [game, setGame] = useState(null);
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const accessToken = useAuth();

  useEffect(() => {
    const fetchTrendingGame = async () => {
      try {
        const threeMonthsAgo = Math.floor(
          (Date.now() - 3 * 30 * 24 * 60 * 60 * 1000) / 1000
        ); // Date Unix d'il y a trois mois
        const currentDate = Math.floor(Date.now() / 1000); // Date Unix actuelle

        const response = await axios({
          method: "post",
          url: "https://gamecenter-git-deploy-justindr96s-projects.vercel.app",
          headers: {
            Accept: "application/json",
            "Client-ID": clientId,
            Authorization: `Bearer ${accessToken}`,
          },
          data: `fields *, cover.*, videos.*,screenshots.*;limit: 50;sort follows desc;where first_release_date >= ${threeMonthsAgo} & first_release_date <= ${currentDate} & rating >= 70;`,
        });

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

    if (accessToken) {
      fetchTrendingGame();
    }
  }, [accessToken]);

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
