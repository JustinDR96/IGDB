//DisplayPreorderGames.jsx
import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DisplayPreorderGames() {
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);
  // récupérer les jeux en precommande via l'API
  useEffect(() => {
    const fetchPreorderGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/preorder");
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

    fetchPreorderGames();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="displayPreorderGames">
      <h2>component displayPreorderGames</h2>
      <h1>Pre-order Games</h1>
      <ul>
        {gameList.map((game) => (
          <li key={game.id}>
            <Link className="link" to={`${game.id}`}>
              {game.name}
              <p className="date">
                <p>Release Date: </p>
                {
                  new Date(game.first_release_date * 1000)
                    .toISOString()
                    .split("T")[0]
                }
              </p>
            </Link>
            {game.cover && game.cover.image_id && (
              <Link to={`${game.id}`}>
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg`}
                  alt={game.name}
                />
              </Link>
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

export default DisplayPreorderGames;
