//DisplayPopularGames.jsx
import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
        // // Filtrer les vidéos pour inclure uniquement celles avec les mots "trailer" ou "teaser"
        const filteredGames = response.data.map((game) => ({
          ...game,
          videos: game.videos
            ? game.videos.filter(
                (video) =>
                  video.name.toLowerCase().includes("trailer") ||
                  video.name.toLowerCase().includes("teaser")
              )
            : [],
        }));
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
      <ul className="gameList">
        {gameList.map((game) => (
          <li key={game.id}>
            <Link to={`${game.id}`}>{game.name}</Link>
            {game.cover && game.cover.image_id && (
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_original/${game.cover.image_id}.jpg`}
                alt={game.name}
              />
            )}
            {/* {game.videos && game.videos.length > 0 && (
              <iframe
                src={`https://www.youtube.com/embed/${game.videos[0].video_id}?autoplay=0&mute=1`}
                title={game.videos[0].name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                width={500}
                height={450}
              />
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayPopularGames;
