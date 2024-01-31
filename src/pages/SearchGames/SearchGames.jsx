import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../hook/auth";

const SearchGames = () => {
  const { name: gameName } = useParams();
  const [games, setGames] = useState(null);
  const [error, setError] = useState(null);
  const ApiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchGameSearch = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${ApiKey}&search=${gameName}&ordering=-added&page_size=10`
        );
        console.log(response.data);
        const games = response.data.results; // Définissez games comme un tableau de jeux
        setGames(games);
      } catch (error) {
        console.error("Erreur lors de la recherche du jeu :", error.message);
        console.error("Erreur complète : ", error);
        setError(error.message);
      }
    };

    fetchGameSearch();
  }, [gameName]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!games) {
    return <Loading />; // Affiche un message de chargement tant que les détails du jeu ne sont pas chargés
  }
  console.log(games);
  return (
    <div className="searchGames">
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
};

export default SearchGames;
