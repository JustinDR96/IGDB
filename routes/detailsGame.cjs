const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/auth.cjs");
const router = express.Router();

// Utilisez le middleware d'authentification
router.use(authMiddleware);

// route pour recuperer les details d'un jeu
// route pour recuperer les details d'un jeu
router.get("/:id", async (req, res) => {
  try {
    const gameId = req.params.id; // Récupère l'ID du jeu à partir de l'URL
    const fields = [
      "id,name,cover.*,screenshots.*,genres.*,rating_count,age_ratings.*,hypes,follows,release_dates.* ,multiplayer_modes.*,collections.*,videos.*,summary,franchises.*",
    ]; // Récupère tous les champs
    const responseIGDB = await axios({
      method: "post",
      url: "https://api.igdb.com/v4/games",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Client-ID": req.clientId,
        Authorization: `Bearer ${req.accessToken}`,
      },
      data: `fields ${fields.join(",")}; where id = ${gameId};`,
    });

    res.send(responseIGDB.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
});

module.exports = router;
