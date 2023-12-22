const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/auth.cjs");
const router = express.Router();

// Utilisez le middleware d'authentification
router.use(authMiddleware);

// Route pour récupérer les jeux depuis l'API
router.get("/", async (req, res) => {
  try {
    const responseIGDB = await axios({
      method: "post",
      url: "https://api.igdb.com/v4/games",
      headers: {
        Accept: "application/json",
        "Client-ID": req.clientId,
        Authorization: `Bearer ${req.accessToken}`,
      },
      data: "fields *,screenshots.*;",
    });

    // Filtrer les jeux qui ont des screenshots
    const gamesWithScreenshots = responseIGDB.data.filter(
      (game) => game.screenshots && game.screenshots.length > 0
    );
    // Générer un index aléatoire
    const randomIndex = Math.floor(Math.random() * responseIGDB.data.length);

    // Sélectionner un jeu au hasard
    const randomGame = gamesWithScreenshots[randomIndex];

    res.json(randomGame);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
