const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/auth.cjs");
const router = express.Router();

// Utilisez le middleware d'authentification
router.use(authMiddleware);

// Route pour récupérer les jeux tendances depuis l'api
router.get("/trending", async (req, res) => {
  try {
    const threeMonthsAgo = Math.floor(
      (Date.now() - 3 * 30 * 24 * 60 * 60 * 1000) / 1000
    ); // Date Unix d'il y a trois mois
    const currentDate = Math.floor(Date.now() / 1000); // Date Unix actuelle
    const responseIGDB = await axios({
      method: "post",
      url: "https://api.igdb.com/v4/games",
      headers: {
        Accept: "application/json",
        "Client-ID": req.clientId,
        Authorization: `Bearer ${req.accessToken}`,
      },
      data: `fields *, cover.*, videos.*;sort follows desc;where first_release_date >= ${threeMonthsAgo} & first_release_date <= ${currentDate} & rating >= 70;`,
    });
    res.json(responseIGDB.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
