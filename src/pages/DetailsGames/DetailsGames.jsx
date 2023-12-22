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
    <div>
      <h1>{game[0].name}</h1>
      <p>ID du jeu : {game[0].id}</p>
      <p>Description : {game[0].description}</p>
    </div>
  );
};

export default DetailsGames;
