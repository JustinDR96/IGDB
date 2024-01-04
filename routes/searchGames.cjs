const axios = require("axios");
const express = require("express");
const authMiddleware = require("../middleware/auth.cjs");
const router = express.Router();

// route pour récupérer un jeu via son nom
router.get("/:name", async (req, res) => {
  const gameName = req.params.name; // Récupérez le nom du jeu de la route
  try {
    const igdbResponse = await axios.post(
      "https://api.igdb.com/v4/search",
      `fields *;limit:20; search "${gameName}";`,
      {
        headers: {
          Accept: "application/json",
          "Client-ID": req.clientId,
          Authorization: `Bearer ${req.accessToken}`,
        },
      }
    );
    res.json(igdbResponse.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Erreur lors de la récupération des données de l'API IGDB");
  }
});

module.exports = router;
