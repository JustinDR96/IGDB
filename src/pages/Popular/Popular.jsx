import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Popular() {
  const [games, setGames] = useState([]);
  const ApiKey = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=${ApiKey}&ordering=-added&page_size=30`
    )
      .then((response) => response.json())
      .then((data) => {
        setGames(data.results);
        console.log(data.results);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="popular">
      {games
        .filter((gameItem) => gameItem && gameItem.background_image)
        .map((gameItem) => (
          <Link to={`/games/${gameItem.id}`} key={gameItem.id}>
            <div className="gameItem">
              {gameItem.background_image ? (
                <img
                  className="gameItem_cover"
                  src={gameItem.background_image}
                  alt=""
                />
              ) : (
                <div>Cover not available</div>
              )}
            </div>
          </Link>
        ))}
    </div>
  );
}
