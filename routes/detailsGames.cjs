const axios = require("axios");
const express = require("express");
const authMiddleware = require("../middleware/auth.cjs");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const gameId = req.params.id; // Récupérez l'ID du jeu de la route
  try {
    const igdbResponse = await axios.post(
      "https://api.igdb.com/v4/games",
      `fields *; where id = ${gameId};`, // Utilisez l'ID du jeu dans la requête à l'API IGDB
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
