const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const authMiddleware = require("./middleware/auth.cjs");
const bodyParser = require("body-parser");

// import route
const gamesRouter = require("./routes/fetchGames.cjs");
const popularGamesRouter = require("./routes/popularGames.cjs");

app.use(authMiddleware);
app.use(cors());
app.use(express.json()); // Utilisez express.json() comme middleware directement
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// routes
app.use("/", gamesRouter);
app.use(popularGamesRouter);

app.listen(3000, () => {
  console.log("Le serveur est en écoute sur le port 3000");
});
