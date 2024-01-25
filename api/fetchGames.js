// api/fetchGames.js

import axios from "axios";
import { getTwitchAccessToken } from "../middleware/auth.js";

export default async (req, res) => {
  const accessToken = await getTwitchAccessToken();
  const clientId = import.meta.env.VITE_CLIENT_ID;

  const response = await axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": clientId,
      Authorization: `Bearer ${accessToken}`,
    },
    data: "fields name,genres.name,rating; limit 50;",
  });

  res.send(response.data);
};
