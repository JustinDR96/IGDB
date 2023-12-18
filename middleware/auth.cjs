// middleware/auth.js
const axios = require("axios");

const clientId = "mygig6l4lhpm5i6qe787vr0imqisnv";
const clientSecret = "qadwupd2esu3u9j2i3fhbrt6ouwttm";
let accessToken = null;

const authMiddleware = async (req, res, next) => {
  try {
    if (!accessToken) {
      const responseToken = await axios.post(
        `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
      );
      accessToken = responseToken.data.access_token;
    }
    // Attach the accessToken to the request object
    req.accessToken = accessToken;
    req.clientId = clientId;

    next();
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = authMiddleware;
