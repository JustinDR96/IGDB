const express = require("express");
const connectToDatabase = require("./db_connect.cjs");
const authMiddleware = require("./middleware/auth.cjs");
const axios = require("axios");
const app = express();
const cors = require("cors");

// import route
const gamesRouter = require("./routes/fetchGames.cjs"); // Assurez-vous que le chemin est correct

app.use(authMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// inserer les jeux dans la base de données
app.get("/", authMiddleware, async (req, res) => {
  try {
    // Obtenez l'access token à partir de req.accessToken
    const accessToken = req.accessToken;
    console.log("Access Token:", accessToken);
    const gameName = "Grand theft auto V";
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
          fields: `id,name,platforms.name,platforms.platform_logo.image_id ,cover.image_id,hypes,genres.name,age_ratings.content_descriptions.category,hypes; limit:1;where name ~ *"${gameName}"*;`,
        },
      }
    );

    // Logique pour insérer les données dans MongoDB
    const db = await connectToDatabase();
    const collection = db.collection("Games"); // Remplacez par le nom de votre collection

    // Avant chaque insertion, vider la collection
    await collection.deleteMany({});
    // Exemple : Insérer les documents récupérés de l'API IGDB dans la collection MongoDB
    for (const game of igdbResponse.data) {
      // Vérifier si le jeu existe déjà dans la collection par son ID, par exemple
      const existingGame = await collection.findOne({ id: game.id });

      // Si le jeu n'existe pas, l'ajouter à la collection
      if (!existingGame) {
        await collection.insertOne(game);
      }
    }
    // Exemple : Envoyer la réponse de l'API IGDB en tant que réponse de votre endpoint
    res.json(igdbResponse.data);
  } catch (error) {
    console.error("Erreur dans l'endpoint sécurisé :", error);
    res.status(500).send("Internal Server Error");
  }
});

// route use
app.use("/games", gamesRouter);

app.listen(3000, () => {
  console.log("Le serveur est en écoute sur le port 3000");
});
