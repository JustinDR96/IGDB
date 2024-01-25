// api/detailsGames.js
import axios from "axios";
import { getTwitchAccessToken } from "../middleware/auth.js";

export default async (req, res) => {
  const gameId = req.query.id; // Récupérez l'ID du jeu de la route
  const accessToken = await getTwitchAccessToken();
  const clientId = process.env.VITE_CLIENT_ID;

  try {
    console.log(
      `Game ID: ${gameId}, Client ID: ${clientId}, Access Token: ${accessToken}`
    );
    const igdbResponse = await axios.post(
      "https://api.igdb.com/v4/games",
      `fields id,name,platforms.*,themes.name,similar_games.*,similar_games.cover.*,player_perspectives.name,storyline,game_modes.name,platforms.platform_logo.image_id,bundles.*,bundles.cover.*,dlcs.*,cover.*,involved_companies.*,involved_companies.company.*,first_release_date,genres.name,summary,videos.*,aggregated_rating,expansions.*,screenshots.*;limit:1; where id = ${gameId};`, // Utilisez l'ID du jeu dans la requête à l'API IGDB
      {
        headers: {
          Accept: "application/json",
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(igdbResponse.data);
  } catch (error) {
    console.error("test");
    if (error.response) {
      console.error("IGDB response:", error.response.data);
    }
    console.error(error);
    res
      .status(500)
      .send("Erreur lors de la récupération des données de l'API IGDB");
  }
};
