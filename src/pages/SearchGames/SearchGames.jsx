import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const SearchGames = () => {
  const { gameName } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameSearch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/games/${gameName}`
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

  if (!game) {
    return <div>Loading...</div>; // Affiche un message de chargement tant que les détails du jeu ne sont pas chargés
  }
  console.log(game);
  return (
    <div className="detailsGames">
      <h1>search Games</h1>
      <div className="screenshot">
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_original/${
            game[0].screenshots[0].image_id
          }.jpg`}
          alt=""
        />
      </div>

      <div className="gameContent">
        <img
          className="cover"
          src={`https://images.igdb.com/igdb/image/upload/t_720p/${
            game[0].cover.image_id
          }.jpg`}
          alt=""
        />
        <h1>{game[0].name}</h1>
      </div>
    </div>
  );
};

export default SearchGames;
