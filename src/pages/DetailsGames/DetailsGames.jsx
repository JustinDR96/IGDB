import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

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
          <h1 className="game_title">{game[0].name}</h1>
          <p>{game[0].summary}</p>
          <p>{game[0].first_release_dates}</p>
          <p>{game[0].age_ratings[0].category.name}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsGames;
