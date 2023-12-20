const express = require("express");
// const connectToDatabase = require("./db_connect.cjs");
const axios = require("axios");
const app = express();
const cors = require("cors");
const authMiddleware = require("./middleware/auth.cjs");

// import route
const gamesRouter = require("./routes/fetchGames.cjs"); // Assurez-vous que le chemin est correct
const detailsGamesRouter = require("./routes/detailsGames.cjs");
const searchGamesRouter = require("./routes/searchGames.cjs");

app.use(authMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", gamesRouter);
app.use("/:id", detailsGamesRouter);
app.use("/:name", searchGamesRouter);

app.listen(3000, () => {
  console.log("Le serveur est en écoute sur le port 3000");
});
