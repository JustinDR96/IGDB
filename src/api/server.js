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
app.use(authMiddleware);
app.options("*", cors());
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
