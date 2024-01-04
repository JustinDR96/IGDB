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
  function getRatingColor(rating) {
    if (rating <= 50) {
      return "red";
    } else if (rating <= 70) {
      return "yellow";
    } else if (rating <= 80) {
      return "green";
    }
  }
  return (
    <div className="display_games">
      <h2>component displayPreorderGames</h2>
      <h1 className="page_title">Pre-order Games</h1>
      <ul className="game_list">
        {gameList.map((game) => (
          <li className="game_element" key={game.id}>
            <Link className="link" to={`/games/${game.id}`} />
            {game.cover && game.cover.image_id && (
              <Link to={`/games/${game.id}`}>
                <div className="game_content">
                  <img
                    className="game_cover"
                    src={`https://images.igdb.com/igdb/image/upload/t_720p/${
                      game.cover.image_id
                    }.jpg`}
                    alt={game.name}
                  />
                  <div className="game_content_detail">
                    <h1 className="game_title">{game.name}</h1>

                    {/* <p className="summary">{game.summary}</p> */}
                    <div className="game_content_bottom">
                      <p
                        className="rating"
                        style={{ backgroundColor: getRatingColor(game.rating) }}
                      >
                        {Math.floor(game.rating)}
                      </p>
                      {game.genres &&
                        game.genres.map((genre, index, array) => (
                          <span className="game_genres" key={genre.id}>
                            {genre.name}
                            {index < array.length - 1 && " , "}
                          </span>
                        ))}
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

export default DisplayPreorderGames;
