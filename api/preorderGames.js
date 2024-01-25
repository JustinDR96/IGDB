// api/preorderGames.js
import axios from "axios";
import { getTwitchAccessToken } from "../middleware/auth.js";

export default async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed");
    return;
  }
  try {
    const currentDateTimestamp = Math.floor(Date.now() / 1000);
    const nextYearDate = Math.floor(
      (Date.now() + 365 * 24 * 60 * 60 * 1000) / 1000
    ); // Date Unix de l'année suivante

    const accessToken = await getTwitchAccessToken();
    const clientId = import.meta.env.VITE_CLIENT_ID;

    const responseIGDB = await axios({
      method: "post",
      url: "https://api.igdb.com/v4/games",
      headers: {
        Accept: "application/json",
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      data: `fields *, cover.*, videos.*, first_release_date;sort hypes desc;limit:15; where first_release_date > ${currentDateTimestamp} & first_release_date <= ${nextYearDate};`,
    });
    console.log(`Response from IGDB:`, responseIGDB.data);
    res.json(responseIGDB.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Internal Server Error");
  }
};
