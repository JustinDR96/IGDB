const express = require("express");
const router = express.Router();
const connectToDatabase = require("../db_connect.cjs"); // Assurez-vous que le chemin est correct

// Route pour récupérer les jeux depuis l'API
router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("Games");

    // Exemple: récupérer tous les documents dans la collection
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    res.status(500).send("Erreur du serveur");
  }
});

module.exports = router;
