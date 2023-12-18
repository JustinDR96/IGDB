const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/auth.cjs");
const router = express.Router();

// Utilisez le middleware d'authentification
router.use(authMiddleware);

// Route pour récupérer les jeux depuis l'API
router.get("/", async (req, res) => {
  try {
    // Utilisez l'accessToken dans la requête vers l'API IGDB
    const responseIGDB = await axios({
      method: "post",
      url: "https://api.igdb.com/v4/games",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Client-ID": req.clientId,
        Authorization: `Bearer ${req.accessToken}`,
      },
      data: "fields cover.*,*;limit:10;",
    });

    res.send(responseIGDB.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
