import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    if (!accessToken) {
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

      axios
        .post(
          `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
        )
        .then((response) => {
          setAccessToken(response.data.access_token);
          localStorage.setItem("accessToken", response.data.access_token);
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, [accessToken]);

  return accessToken;
}
