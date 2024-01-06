import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

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
          slidesPerView={6}
          centeredSlides={false}
          spaceBetween={0}
          className="game_list"
          loop={true}
          speed={500}
        >
          {games.map((game) => (
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
                        <p
                          className="rating"
                          style={{
                            backgroundColor: getRatingColor(game.rating),
                          }}
                        >
                          {Math.floor(game.rating)}
                        </p>
                        <p className="game_genres">
                          {game.genres &&
                            game.genres.map((genre) => genre.name).join(", ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </SwiperSlide>
          ))}
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
