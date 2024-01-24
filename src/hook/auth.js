import axios from "axios";
import Cookies from "js-cookie";

export default function authMiddleware(req, res, next) {
  let accessToken = Cookies.get("accessToken");
  const tokenExpiration = Number(Cookies.get("tokenExpiration"));

  // Vérifiez si le token a expiré
  if (!accessToken || (tokenExpiration && Date.now() > tokenExpiration)) {
    const clientId = import.meta.env.CLIENT_ID;
    const clientSecret = import.meta.env.CLIENT_SECRET;

    axios
      .post(
        `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
      )
      .then((response) => {
        accessToken = response.data.access_token;
        Cookies.set("accessToken", accessToken, {
          expires: 1 / 1440,
          secure: true, // défini sur true si votre site est servi via HTTPS
          sameSite: "None", // peut être 'None', 'Lax' ou 'Strict'
        });

        // Enregistrez l'heure d'expiration du token
        const tokenExpiration = new Date();
        tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 1);
        Cookies.set("tokenExpiration", tokenExpiration.getTime().toString(), {
          expires: 1 / 24,
        });

        req.accessToken = accessToken;
        next();
      })
      .catch((error) => {
        console.error(
          "Error fetching access token:",
          error.response ? error.response.data : error.message
        );
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération du token" });
      });
  } else {
    req.accessToken = accessToken;
    next();
  }
}
