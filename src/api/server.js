import express, { json, urlencoded } from "express";
import axios from "axios";
import cors from "cors";
import authMiddleware from "./middleware/auth.cjs";

// import route
import gamesRouter from "./routes/fetchGames.cjs";
import popularGamesRouter from "./routes/popularGames.cjs";
import preorderGamesRouter from "./routes/preorderGames.cjs";
import trendingGamesRouter from "./routes/trendingGames.cjs";
import detailsGamesRouter from "./routes/detailsGames.cjs";
import searchGamesRouter from "./routes/searchGames.cjs";

const app = express();
app.post("/games", async (req, res) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://api.igdb.com/v4/games",
      headers: {
        Accept: "application/json",
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      data: req.body,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching games" });
  }
});
app.use(authMiddleware);
app.use(cors());
app.use(json()); // Utilisez express.json() comme middleware directement
app.use(urlencoded({ extended: true }));
// routes
app.use("/", gamesRouter);
app.use(popularGamesRouter);
app.use(preorderGamesRouter);
app.use(trendingGamesRouter);
app.use("/games", detailsGamesRouter);
app.use("/search", searchGamesRouter);

export default (req, res) => {
  const { method, url } = req;
  return app.handle(req, res);
};
