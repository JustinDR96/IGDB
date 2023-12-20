const express = require("express");
const router = express.Router();
// const connectToDatabase = require("../db_connect.cjs"); // Assurez-vous que le chemin est correct
const authMiddleware = require("../middleware/auth.cjs");
const axios = require("axios");
// Route pour récupérer les jeux depuis l'API
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Obtenez l'access token à partir de req.accessToken
    const accessToken = req.accessToken;
    console.log("Access Token:", accessToken);
    // Utilisez l'access token pour effectuer une requête à l'API IGDB
    const igdbResponse = await axios.post(
      "https://api.igdb.com/v4/games",
      {},
      {
        headers: {
          Accept: "application/json",
          "Client-ID": req.clientId,
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          fields: `id,name,cover.*,screenshots.*,genres.*,rating_count,age_ratings.*,hypes,follows,release_dates.* ,multiplayer_modes.*,collections.*,videos.*,summary,franchises.*;`,
        },
      }
    );
    res.json(igdbResponse.data);
  } catch (error) {
    console.error("Erreur dans l'endpoint sécurisé :", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
