import axios from "axios";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
let accessToken = null;
let tokenGenerationTime = null;
let tokenExpiresIn = null;

async function fetchTwitchAccessToken() {
  try {
    const responseToken = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
    );
    accessToken = responseToken.data.access_token;
    tokenGenerationTime = Date.now();
    tokenExpiresIn = responseToken.data.expires_in;
    console.log("Access Token obtained successfully:", accessToken);
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
}

export async function getTwitchAccessToken() {
  // Obtain the Twitch Access Token if not available or expired
  if (
    !accessToken ||
    Date.now() > tokenGenerationTime + tokenExpiresIn * 1000
  ) {
    await fetchTwitchAccessToken();
  }
  return accessToken;
}
