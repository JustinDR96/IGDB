import axios from "axios";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/proxy", async (req, res) => {
  const { accessToken } = req.body;
  console.log(req.body);
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
  console.log(process.env.VITE_CLIENT_ID);
  console.log(accessToken);
});
