const axios = require("axios");
const express = require("express");
const authMiddleware = require("../middleware/auth.cjs");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("Access Token:", req.accessToken);
    // Utilisez l'access token pour effectuer une requête à l'API IGDB
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
          fields: ` id,name,cover.*,screenshots.*,genres.*,rating_count,age_ratings.*,hypes,follows,release_dates.* ,multiplayer_modes.*,collections.*,videos.*,summary,franchises.*;`,
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
