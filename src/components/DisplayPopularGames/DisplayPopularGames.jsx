//DisplayPopularGames.jsx
import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DetailsGames from "../../pages/DetailsGames/DetailsGames";

function DisplayPopularGames() {
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);
  // récupérer les jeux les plus populaires via l'API
  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/popular");
        console.log(response.data); // Affiche les données récupérées dans la console
        if (!response.data) {
          console.error("No data received from the server.");
          return;
        }
        // Filtrer les vidéos pour inclure uniquement celles avec les mots "trailer" ou "teaser"
        const filteredGames = response.data
          .map((game) => ({
            ...game,
            videos: game.videos
              ? game.videos.filter(
                  (video) =>
                    video.name.toLowerCase().includes("trailer") ||
                    video.name.toLowerCase().includes("teaser")
                )
              : [],
          }))
          .slice(0, 8); // Limite le tableau à 9 éléments
        setGameList(filteredGames);
      } catch (error) {
        console.error("Error fetching games:", error.message);
        console.error("Full error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularGames();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="displayPopularGames">
      <h2>component displayPopularGames</h2>
      <h1>Popular Games</h1>
      <ul>
        {gameList.map((game) => (
          <li key={game.id}>
            <Link className="link" to={`/games/${game.id}`} />
            {game.cover && game.cover.image_id && (
              <Link to={`/games/${game.id}`}>
                <div className="game_content">
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_720p/${
                      game.cover.image_id
                    }.jpg`}
                    alt={game.name}
                  />
                  <div className="game_content_detail">
                    <h1>{game.name}</h1>
                    <p className="summary">{game.summary}</p>
                    <div className="game_content_bottom">
                      <p className="rating">{Math.floor(game.rating)}</p>
                      {/* {game.genres &&
                      game.genres.map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                      ))} */}
                    </div>
                  </div>
                </div>
              </Link>
            )}
            {/* <div className="rating">{Math.floor(game.rating)}</div> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayPopularGames;
