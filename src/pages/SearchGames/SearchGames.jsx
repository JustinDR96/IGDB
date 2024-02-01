import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const SearchGames = () => {
  const { name: gameName } = useParams();
  const [games, setGames] = useState(null);
  const [error, setError] = useState(null);
  const ApiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchGameSearch = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${ApiKey}&search=${gameName}&page_size=20&exclude_additions&exclude_collection`
        );
        let games = response.data.results; // Définissez games comme un tableau de jeux

        games = games.filter((game) =>
          game.name.toLowerCase().includes(gameName.toLowerCase())
        ); // Filtrer les jeux dont le nom contient gameName

        games = games.sort((a, b) => {
          // Trie d'abord par added en ordre décroissant
          const addedComparison = b.added - a.added;

          // Extraire l'année de la date de sortie
          const yearA = new Date(a.released).getFullYear();
          const yearB = new Date(b.released).getFullYear();

          // Ensuite, trie par année de sortie en ordre décroissant, si les jeux ont le même added
          const yearComparison = yearB - yearA;

          return addedComparison === 0 ? yearComparison : addedComparison;
        });

        games = games.filter((game) => game.added !== 0); // Filtrer les jeux dont added n'est pas égal à 0

        const parentGames = games.filter((game) => game.parent_platforms); // Filtrer les jeux qui ont des plateformes parentes
        setGames(parentGames);
        console.log(parentGames);
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
