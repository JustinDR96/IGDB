// db.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://justin:test@igdb.tigeuuy.mongodb.net/";

async function connectToDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connecté à la base de données");
    return client.db();
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
    throw error;
  }
}

module.exports = connectToDatabase;
