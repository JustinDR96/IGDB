const express = require("express");
const connectToDatabase = require("./db_connect.cjs");
const authMiddleware = require("./middleware/auth.cjs");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(authMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import route
const gamesRouter = require("./routes/fetchGames.cjs");
const insertDB = require("./routes/insertDB.cjs");




// route use
app.use("/games", gamesRouter);

app.listen(3000, () => {
  console.log("Le serveur est en écoute sur le port 3000");
  insertDB(req.accessToken, req.clientId);
});
