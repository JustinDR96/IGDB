import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../hook/auth";

const SearchGames = () => {
  const { name: gameName } = useParams();
  const [game, setGame] = useState([]);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchGameSearch = async () => {
      try {
        const igdbResponse = await axios.post(
          "/api/proxy",
          {
            body: `fields *,cover.image_id,follows,hypes;limit:20;search "${gameName}";where follows != null | hypes != null;`,
            accessToken,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        console.log(igdbResponse.data); // Affichez les données récupérées dans la console

        setGame(igdbResponse.data); // Définissez tous les jeux, pas seulement le premier
      } catch (error) {
        console.error("Erreur lors de la requête à l'API IGDB", error);
      }
    };

    fetchGameSearch();
  }, [accessToken, gameName]);

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
                  src={`https://images.igdb.com/igdb/image/upload/t_720p/${
                    gameItem.cover.image_id
                  }.jpg`}
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
