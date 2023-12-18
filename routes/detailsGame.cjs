const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/auth.cjs");
const router = express.Router();

// Utilisez le middleware d'authentification
router.use(authMiddleware);

// route pour recuperer les details d'un jeu
router.post("/:id", async (req, res) => {
  try {
    const gameId = req.body.id;
    const fields = Array.isArray(req.body.fields) ? req.body.fields : ["*"];
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
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
