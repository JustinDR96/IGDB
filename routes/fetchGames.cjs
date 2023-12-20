const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.cjs");
const axios = require("axios");

// Route pour récupérer les jeux depuis l'API
router.get("/", async (req, res) => {
  try {
    const igdbResponse = await axios.post(
      "https://api.igdb.com/v4/games",
      {},
      {
        headers: {
          Accept: "application/json",
          "Client-ID": req.clientId,
          Authorization: `Bearer ${req.accessToken}`,
        },
        params: {
          fields: ` *;limit:10;`,
        },
      }
    );
    res.json(igdbResponse.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    res.status(500).send("Erreur du serveur");
  }
});

module.exports = router;
