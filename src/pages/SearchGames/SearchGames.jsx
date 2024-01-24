import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const SearchGames = () => {
  const { name: gameName } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameSearch = async () => {
      try {
        const response = await axios.get(
          `https://gamecenter-git-deploy-justindr96s-projects.vercel.app/games/search/${gameName}`
        );
        console.log(response.data);
        const game = response.data;
        setGame(game);
      } catch (error) {
        console.error("Error fetching game search:", error.message);
        console.error("Full error: ", error);
        setError(error.message); // Ajoutez cette ligne
      }
    };

    fetchGameSearch();
  }, [gameName]);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!game) {
    return <Loading />; // Affiche un message de chargement tant que les détails du jeu ne sont pas chargés
  }
  console.log(game);
  return (
    <div className="searchGames">
      {game
        .filter(
          (gameItem) => gameItem && gameItem.cover && gameItem.cover.image_id
        )
        .map((gameItem) => (
          <Link to={`/games/${gameItem.id}`} key={gameItem.id}>
            <div className="gameItem">
              {gameItem.cover && gameItem.cover.image_id ? (
                <img
                  className="gameItem_cover"
                  src={`https://images.igdb.com/igdb/image/upload/t_720p/${gameItem.cover.image_id}.jpg`}
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
};

export default SearchGames;
