// api/searchGames.js
import axios from "axios";
import { getTwitchAccessToken } from "../middleware/auth.js";

export default async (req, res) => {
  const gameName = req.query.name; // Récupérez le nom du jeu de la route
  const accessToken = await getTwitchAccessToken();
  const clientId = import.meta.env.VITE_CLIENT_ID;

  try {
    const igdbResponse = await axios.post(
      "https://api.igdb.com/v4/games",
      `fields *,cover.image_id,follows,hypes;limit:20;search "${gameName}";where follows != null | hypes != null;`,
      {
        headers: {
          Accept: "application/json",
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const uniqueGames = igdbResponse.data.reduce((unique, game) => {
      if (!unique.find((item) => item.name === game.name)) {
        unique.push(game);
      }
      return unique;
    }, []);

    res.json(uniqueGames);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Erreur lors de la récupération des données de l'API IGDB");
  }
};
