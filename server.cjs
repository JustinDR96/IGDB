const express = require("express");
const connectToDatabase = require("./db_connect.cjs");
const authMiddleware = require("./middleware/auth.cjs");
const axios = require("axios");
const app = express();
const cors = require("cors");

// import route
const gamesRouter = require("./routes/getGamesToDB.cjs");

app.use(authMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route use
app.use("/", gamesRouter);

app.listen(3000, () => {
  console.log("Le serveur est en écoute sur le port 3000");
});

