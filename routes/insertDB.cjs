// insertDB.cjs
const axios = require('axios');
const connectToDatabase =require("../db_connect.cjs");

// inserer les jeux dans la base de données
async function insertDB(accessToken, clientId) {
    try {
      console.log("Access Token:", accessToken);
      // const gameName = "";
      // Utilisez l'access token pour effectuer une requête à l'API IGDB
      const igdbResponse = await axios.post(
        "https://api.igdb.com/v4/games",
        {},
        {
          headers: {
            Accept: "application/json",
            "Client-ID": clientId,
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            fields: ` id,name,cover.*,screenshots.*,genres.*,rating_count,age_ratings.*,hypes,follows,release_dates.* ,multiplayer_modes.*,collections.*,videos.*,summary,franchises.*;limit:10;sort follows desc;`,
          },
        }
      );

      // Logique pour insérer les données dans MongoDB
      const db = await connectToDatabase();
      const collection = db.collection("Games");

      // Avant chaque insertion, vider la collection
      await collection.deleteMany({});

      // Insérer les données dans la collection
      for (const game of igdbResponse.data) {
        // Vérifier si le jeu existe déjà dans la collection par son ID, par exemple
        const existingGame = await collection.findOne({ id: game.id });

        // Si le jeu n'existe pas, l'ajouter à la collection
        if (!existingGame) {
          await collection.insertOne(game);
        }
        }
    } catch (error) {
      console.error(error);
    }
}

module.exports = insertDB;