import axios from "axios";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

async function getAccessToken() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

app.post("/api/proxy", async (req, res) => {
  let accessToken = req.cookies.accessToken;

  if (!accessToken) {
    accessToken = await getAccessToken();
    if (!accessToken) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération du token" });
    }

    // Stockez le token d'accès dans un cookie
    res.cookie("accessToken", accessToken, { httpOnly: true });
  }

  try {
    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Client-ID": import.meta.env.VITE_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
