import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));
  console.log(
    import.meta.env.VITE_CLIENT_ID,
    import.meta.env.VITE_CLIENT_SECRET
  );
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
          console.log(response.data);
          console.log(response.data.access_token);
          setAccessToken(response.data.access_token);
          Cookies.set("accessToken", response.data.access_token, {
            expires: 1 / 1440,
            secure: true, // défini sur true si votre site est servi via HTTPS
            sameSite: "None", // peut être 'None', 'Lax' ou 'Strict'
          });

          // Enregistrez l'heure d'expiration du token
          const tokenExpiration = new Date();
          tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 1);
          Cookies.set("tokenExpiration", tokenExpiration, { expires: 1 }); // 1/1440 est équivalent à 1 minute
        })
        .catch((error) => {
          console.error(
            "Error fetching access token:",
            error.response ? error.response.data : error.message
          );
        });
    }
  }, [accessToken]);

  return accessToken;
}
