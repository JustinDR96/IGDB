// Assurez-vous que le fichier auth.cjs exporte une fonction middleware correcte

// auth.cjs
const axios = require("axios");

const clientId = "mygig6l4lhpm5i6qe787vr0imqisnv";
const clientSecret = "qadwupd2esu3u9j2i3fhbrt6ouwttm";
let accessToken = null;

const getTwitchAccessToken = async () => {
  try {
    const responseToken = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
    );
    accessToken = responseToken.data.access_token;
    console.log("Access Token obtained successfully:", accessToken);
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
