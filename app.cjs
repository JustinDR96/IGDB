// app.cjs
const express = require("express");
const app = express();
const authMiddleware = require("./middleware/auth.cjs"); // Importez le middleware d'authentification
const gamesRouter = require("./routes/fetchGames.cjs");
const searchGamesRouter = require("./routes/searchGames.cjs");
const recentGamesRouter = require("./routes/recentGames.cjs");
const popularGamesRouter = require("./routes/popularGames.cjs");
const bestGamesRouter = require("./routes/bestGames.cjs");
const detailsGameRouter = require("./routes/detailsGame.cjs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);

// Utilisation du routeur des jeux
app.use("/games", gamesRouter);
app.use(searchGamesRouter);
app.use(recentGamesRouter);
app.use(popularGamesRouter);
app.use(bestGamesRouter);
app.use(detailsGameRouter);

// Définition d'une route de base
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon serveur Express !");
});

// Lancement du serveur à partir du port 3000
app.listen(3000, () => {
  console.log("Le serveur est en écoute sur le port 3000");
});
