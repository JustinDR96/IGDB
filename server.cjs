const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const authMiddleware = require("./middleware/auth.cjs");

// import route
const gamesRouter = require("./routes/fetchGames.cjs");
const popularGamesRouter = require("./routes/popularGames.cjs");
const preorderGamesRouter = require("./routes/preorderGames.cjs");
const trendingGamesRouter = require("./routes/trendingGames.cjs");
const detailsGamesRouter = require("./routes/detailsGames.cjs");
const searchGamesRouter = require("./routes/searchGames.cjs");

app.use(authMiddleware);
app.use(cors());
app.use(express.json()); // Utilisez express.json() comme middleware directement
app.use(express.urlencoded({ extended: true }));
// routes
app.use("/", gamesRouter);
app.use(popularGamesRouter);
app.use(preorderGamesRouter);
app.use(trendingGamesRouter);
app.use("/games", detailsGamesRouter);
app.use("/search", searchGamesRouter);

app.listen(3000, () => {
  console.log("Le serveur est en écoute sur le port 3000");
});
