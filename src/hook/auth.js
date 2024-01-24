import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  useEffect(() => {
    const tokenExpiration = Cookies.get("tokenExpiration");

    // Vérifiez si le token a expiré
    if (!accessToken || (tokenExpiration && Date.now() > tokenExpiration)) {
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

      axios
        .post(
          `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
        )
        .then((response) => {
          setAccessToken(response.data.access_token);
          Cookies.set("accessToken", response.data.access_token);

          // Enregistrez l'heure d'expiration du token
          const tokenExpiration = new Date();
          tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 1);
          Cookies.set("tokenExpiration", tokenExpiration, { expires: 1 }); // 1/1440 est équivalent à 1 minute
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, [accessToken]);

  return accessToken;
}
