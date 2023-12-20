// insertDB.cjs
const axios = require("axios");
// const connectToDatabase = require("../db_connect.cjs");
const authMiddleware = require("../middleware/auth.cjs");
// inserer les jeux dans la base de données
async function insertDB(accessToken, clientId) {
  try {
    console.log("Access Token:", accessToken);
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
  } catch (error) {
    console.error(error);
  }
}

module.exports = insertDB;
