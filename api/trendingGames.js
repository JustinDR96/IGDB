// api/trendingGames.js
import axios from "axios";
import { getTwitchAccessToken } from "../middleware/auth.js";

export default async (req, res) => {
  const accessToken = await getTwitchAccessToken();
  const clientId = process.env.VITE_CLIENT_ID;

  try {
    const threeMonthsAgo = Math.floor(
      (Date.now() - 3 * 30 * 24 * 60 * 60 * 1000) / 1000
    ); // Date Unix d'il y a trois mois
    const currentDate = Math.floor(Date.now() / 1000); // Date Unix actuelle

    const responseIGDB = await axios({
      method: "post",
      url: "https://api.igdb.com/v4/games",
      headers: {
        Accept: "application/json",
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      data: `fields *, cover.*, videos.*,screenshots.*;limit: 50;sort follows desc;where first_release_date >= ${threeMonthsAgo} & first_release_date <= ${currentDate} & rating >= 70;`,
    });

    res.json(responseIGDB.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Internal Server Error");
  }
};
