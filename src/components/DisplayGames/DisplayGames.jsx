import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { format } from "date-fns";

function DisplayGames() {
  const [popularGames, setPopularGames] = useState([]);
  const [trendingGames, setTrendingGames] = useState([]);
  const [preorderGames, setPreorderGames] = useState([]);

  const fetchGames = async (endpoint, setGames) => {
    try {
      const response = await axios.get(`http://localhost:3000/${endpoint}`);
      setGames(response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchGames("popular", setPopularGames);
    fetchGames("trending", setTrendingGames);
    fetchGames("preorder", setPreorderGames);
  }, []);

  function getRatingColor(rating) {
    if (rating < 50) {
      return "red";
    } else if (rating < 80) {
      return "orange";
    } else {
      return "green";
    }
  }

  const renderGames = (title, games) => (
    <div className="display_games">
      <div className="display_games_content">
        <h2 className="page_title">{title}</h2>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={5}
          centeredSlides={false}
          spaceBetween={0}
          className="game_list"
          loop={true}
          speed={1000}
        >
          {games.map((game) => {
            const unixTimestamp = game.first_release_date;
            const date = new Date(unixTimestamp * 1000); // Convertit le timestamp Unix en millisecondes
            const formattedDate = format(date, "dd MMMM yyyy");

            return (
              <SwiperSlide key={game.id}>
                <div className="game_element">
                  <Link className="link" to={`/games/${game.id}`} />
                  {game.cover && game.cover.image_id && (
                    <Link to={`/games/${game.id}`}>
                      <div className="game_cover">
                        <img
                          className="game_cover_img"
                          src={`https://images.igdb.com/igdb/image/upload/t_original/${game.cover.image_id}.jpg`}
                          alt={game.name}
                        />
                      </div>
                      <div className="game_content_detail">
                        <div className="game_content_top">
                          <h1 className="game_title">{game.name}</h1>
                        </div>

                        <div className="game_content_bottom">
                          {!isNaN(game.rating) && (
                            <p
                              className="rating"
                              style={{
                                backgroundColor: getRatingColor(game.rating),
                              }}
                            >
                              {Math.floor(game.rating)}
                            </p>
                          )}
                          <p className="game_genres">
                            {game.genres &&
                              game.genres.length > 0 &&
                              game.genres
                                .filter((genre) => genre && genre.name)
                                .map((genre) => genre.name)
                                .join(", ")}
                          </p>
                          {title === "Pre-order" ? (
                            <p className="game_release_date">{formattedDate}</p>
                          ) : (
                            <p className="game_prices">59,99$</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );

  return (
    <div className="display_games_main">
      {renderGames("Popular", popularGames)}
      {renderGames("Trending", trendingGames)}
      {renderGames("Pre-order", preorderGames)}
    </div>
  );
}

export default DisplayGames;
