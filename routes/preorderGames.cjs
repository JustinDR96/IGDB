const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/auth.cjs");
const router = express.Router();

// Utilisez le middleware d'authentification
router.use(authMiddleware);

// Route pour récupérer les jeux depuis l'API avec filtre de date
router.get("/preorder", async (req, res) => {
  try {
    const currentDateTimestamp = Math.floor(Date.now() / 1000);

    const responseIGDB = await axios({
      method: "post",
      url: "https://api.igdb.com/v4/games",
      headers: {
        Accept: "application/json",
        "Client-ID": req.clientId,
        Authorization: `Bearer ${req.accessToken}`,
      },
      data: `fields *, cover.*, videos.*, first_release_date;sort hypes desc; where first_release_date > ${currentDateTimestamp};`,
    });
    // console.log(currentDateTimestamp);
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
