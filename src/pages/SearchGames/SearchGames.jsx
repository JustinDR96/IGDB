import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const SearchGames = () => {
  const { name: gameName } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameSearch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/search/${gameName}`
        );
        console.log(response.data);
        const game = response.data;
        setGame(game);
      } catch (error) {
        console.error("Error fetching game search:", error.message);
        console.error("Full error: ", error);
      }
    };

    fetchGameSearch();
  }, [gameName]);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!game) {
    return <div>Loading...</div>; // Affiche un message de chargement tant que les détails du jeu ne sont pas chargés
  }
  console.log(game);
  return (
    <div className="searchGames">
      {game
        .filter(
          (gameItem) =>
            gameItem.game && gameItem.game.cover && gameItem.game.cover.image_id
        )
        .map((gameItem) => (
          <Link to={`/games/${gameItem.game.id}`}>
            <div className="gameItem" key={gameItem.id}>
              {gameItem.game.cover && gameItem.game.cover.image_id ? (
                <img
                  className="gameItem_cover"
                  src={`https://images.igdb.com/igdb/image/upload/t_720p/${gameItem.game.cover.image_id}.jpg`}
                  alt=""
                />
              ) : (
                <div>Cover not available</div>
              )}
              <div className="gameItem_content">
                <h1>{gameItem.name}</h1>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SearchGames;
