// auth.cjs

const axios = require("axios");

require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
let accessToken = null;

const getTwitchAccessToken = async () => {
  try {
    const responseToken = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
    );
    accessToken = responseToken.data.access_token;
    console.log("Access Token obtained successfully:", accessToken);
    // insertDB(accessToken, clientId);
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    // Obtain the Twitch Access Token if not available
    if (!accessToken) {
      await getTwitchAccessToken();
    }
    // Attach the accessToken to the request object
    req.accessToken = accessToken;
    req.clientId = clientId;
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = authMiddleware;
