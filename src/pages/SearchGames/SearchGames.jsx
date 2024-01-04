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
    <div className="detailsGames">
      <h1>search Games</h1>

      <h1>{game[0].name}</h1>
    </div>
  );
};

export default SearchGames;
