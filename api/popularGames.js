// api/popularGames.js
import axios from "axios";
import { getTwitchAccessToken } from "../middleware/auth.js";

export default async (req, res) => {
  const accessToken = await getTwitchAccessToken();
  const clientId = import.meta.env.VITE_CLIENT_ID;

  try {
    const igdbResponse = await axios(
      "https://api.igdb.com/v4/games",
      `fields *, cover.*, videos.*,genres.*,platforms.*,platforms.platform_logo.*;limit:20;sort hypes desc; where rating >= 90;`,
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
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Internal Server Error");
  }
};
