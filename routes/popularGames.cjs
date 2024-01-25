const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/auth.js");
const router = express.Router();

// Utilisez le middleware d'authentification
router.use(authMiddleware);

// Route pour récupérer les jeux depuis l'API
router.get("/popular", async (req, res) => {
  try {
    const responseIGDB = await axios({
      method: "post",
      url: "https://api.igdb.com/v4/games",
      headers: {
        Accept: "application/json",
        "Client-ID": req.clientId,
        Authorization: `Bearer ${req.accessToken}`,
      },
      data: `fields *, cover.*, videos.*,genres.*,platforms.*,platforms.platform_logo.*;limit:20;sort hypes desc; where rating >= 90;`,
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
