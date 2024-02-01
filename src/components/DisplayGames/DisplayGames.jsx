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
  const ApiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchGames("popular", setPopularGames);
    fetchGames("trending", setTrendingGames);
    fetchGames("preorder", setPreorderGames);
  }, []);

  const fetchGames = async (type, setGames) => {
    let url;
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    switch (type) {
      case "popular":
        url = `https://api.rawg.io/api/games?key=${ApiKey}&dates=${lastYear}-01-01,${currentYear}-12-31&ordering=-added&page_size=10`;
        break;

      case "trending":
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        const currentDate = new Date();

        url = `https://api.rawg.io/api/games?key=${ApiKey}&dates=${
          threeMonthsAgo.toISOString().split("T")[0]
        },${
          currentDate.toISOString().split("T")[0]
        }&ordering=-suggestions_count&page_size=10`;
        break;

      case "preorder":
        url = `https://api.rawg.io/api/games?key=${ApiKey}&dates=${currentYear}-01-01,${currentYear}-12-31&ordering=-added&page_size=10`;
        break;
      default:
        return;
    }

    const response = await axios.get(url);
    setGames(response.data.results);
  };

  function getRatingColor(metacritic) {
    if (metacritic < 50) {
      return "red";
    } else if (metacritic < 80) {
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
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 4,
            },
            // when window width is >= 640px
            1000: {
              slidesPerView: 5,
            },
          }}
        >
          {games.map((game) => (
            <SwiperSlide key={game.id}>
              <div className="game_element">
                <Link className="link" to={`/games/${game.id}`}>
                  <div className="game_cover">
                    <img
                      className="game_cover_img"
                      src={game.background_image}
                      alt={game.name}
                    />
                  </div>
                  <div className="game_content_detail">
                    <div className="game_content_top">
                      <h1 className="game_title">{game.name}</h1>
                      <p>{game.released}</p> {/* Date de sortie du jeu */}
                    </div>

                    <div className="game_content_bottom">
                      {game.metacritic !== null && !isNaN(game.metacritic) ? (
                        <p
                          className="rating"
                          style={{
                            backgroundColor: getRatingColor(game.metacritic),
                          }}
                        >
                          {Math.floor(game.metacritic)}
                        </p>
                      ) : (
                        <p className="rating" />
                      )}
                      <p className="game_genres">
                        {game.genres &&
                          game.genres.length > 0 &&
                          game.genres
                            .filter((genre) => genre && genre.name)
                            .map((genre) => genre.name)
                            .join(", ")}
                      </p>
                      <p className="game_prices">59,99$</p>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );

  return (
    <div className="display_games_main">
      {renderGames("Popular Games", popularGames)}
      {renderGames("Trending Games", trendingGames)}
      {renderGames("Preorder Games", preorderGames)}
    </div>
  );
}

export default DisplayGames;
