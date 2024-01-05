import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const DetailsGames = () => {
  const { id } = useParams(); // Récupère l'ID du jeu à partir de la route
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${id}`);
        const game = response.data;
        setGame(game); // Met à jour l'état du jeu avec les données obtenues
      } catch (error) {
        console.error("Error fetching game details:", error.message);
        console.error("Full error: ", error);
      }
    };

    fetchGameDetails();
  }, [id]); // Exécutez cette fonction chaque fois que l'ID du jeu change

  if (!game) {
    return <div>Loading...</div>; // Affiche un message de chargement tant que les détails du jeu ne sont pas chargés
  }
  console.log(game);
  return (
    <div className="details_games">
      <div className="screenshot">
        {game[0].screenshots && game[0].screenshots[0].image_id ? (
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_original/${game[0].screenshots[0].image_id}.jpg`}
            alt=""
          />
        ) : (
          <div>Screenshot not available</div>
        )}
      </div>
      <div className="game_content">
        <img
          className="cover"
          src={`https://images.igdb.com/igdb/image/upload/t_720p/${game[0].cover.image_id}.jpg`}
          alt=""
        />
        <div className="game_content_card">
          <h1 className="game_title">{game[0]?.name || ""}</h1>

          <p className="game_release">
            {game[0]?.first_release_date
              ? format(
                  new Date(game[0].first_release_date * 1000),
                  "dd MMMM yyyy"
                )
              : ""}
          </p>
          <div className="game_select">
            <select className="game_platform">
              {game[0]?.platforms?.map((platform, index) => (
                <option key={index} value={platform.name}>
                  {platform.name}
                </option>
              ))}
            </select>
            <select className="game_edition">
              <option value={game[0]?.name}>{game[0]?.name}</option>
              {game[0]?.bundles?.map((bundle, index) => (
                <option key={index} value={bundle.name}>
                  {bundle.name}
                </option>
              ))}
            </select>
          </div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"
                fill="black"
              />
            </svg>
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsGames;

{
  /* <p className="game_age_rating">
            {game[0]?.age_ratings[0]?.category || ""} age rating
          </p> */
}
