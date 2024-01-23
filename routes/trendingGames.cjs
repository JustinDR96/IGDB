import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../src/hook/auth";

export default function useTrendingGames(accessToken, clientId) {
  const [trendingGames, setTrendingGames] = useState([]);

  useEffect(() => {
    if (!accessToken || !clientId) return;

    const fetchTrendingGames = async () => {
      try {
        const threeMonthsAgo = Math.floor(
          (Date.now() - 3 * 30 * 24 * 60 * 60 * 1000) / 1000
        ); // Date Unix d'il y a trois mois
        const currentDate = Math.floor(Date.now() / 1000); // Date Unix actuelle

        const responseIGDB = await axios({
          method: "post",
          url: "https://api.igdb.com/v4/games",
          headers: {
            Accept: "application/json",
            "Client-ID": clientId,
            Authorization: `Bearer ${accessToken}`,
          },
          data: `fields *, cover.*, videos.*,screenshots.*;limit: 50;sort follows desc;where first_release_date >= ${threeMonthsAgo} & first_release_date <= ${currentDate} & rating >= 70;`,
        });

        setTrendingGames(responseIGDB.data);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchTrendingGames();
  }, [accessToken, clientId]);

  return trendingGames;
}
