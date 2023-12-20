const express = require("express");
// const connectToDatabase = require("./db_connect.cjs");
// const connectToDatabase = require("./db_connect.cjs");
const authMiddleware = require("./middleware/auth.cjs");
const axios = require("axios");
const app = express();
const cors = require("cors");
const authMiddleware = require("./middleware/auth.cjs");
// import route
const gamesRouter = require("./routes/fetchGames.cjs"); // Assurez-vous que le chemin est correct
// const gamesDetailsRouter = require("./routes/detailsGames.cjs");

// app.use(authMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authMiddleware);
app.use("/", gamesRouter);
// app.use("/id", gamesDetailsRouter);

app.listen(3000, () => {
  console.log("Le serveur est en écoute sur le port 3000");
});
