import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { format } from "date-fns";
import useAuth from "../../hook/auth";

function DisplayGames() {
  const accessToken = useAuth();
  const [popularGames, setPopularGames] = useState([]);
  const [trendingGames, setTrendingGames] = useState([]);
  const [preorderGames, setPreorderGames] = useState([]);

  const fetchGames = async (type, setGames) => {
    let url;

    switch (type) {
      case "popular":
        url =
          "https://gamecenter-64s1miybm-justindr96s-projects.vercel.app/api/popularGames";
        break;
      case "trending":
        url =
          "https://gamecenter-64s1miybm-justindr96s-projects.vercel.app/api/trendingGames";
        break;
      case "preorder":
        url =
          "https://gamecenter-64s1miybm-justindr96s-projects.vercel.app/api/preorderGames";
        break;
      default:
        return;
    }

    console.log(`Fetching ${type} games`);

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "Client-ID": import.meta.env.VITE_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setGames(response.data);
      console.log("Games:", response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    if (!accessToken) return;

    fetchGames("popular", setPopularGames);
    fetchGames("trending", setTrendingGames);
    fetchGames("preorder", setPreorderGames);
    console.log(accessToken);
  }, [accessToken]);

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
          {games.map((game) => {
            let formattedDate = "";
            if (game.first_release_date) {
              const unixTimestamp = game.first_release_date;
              const date = new Date(unixTimestamp * 1000); // Convertit le timestamp Unix en millisecondes
              formattedDate = format(date, "dd MMMM yyyy");
            }

            return (
              <SwiperSlide key={game.id}>
                <div className="game_element">
                  <Link className="link" to={`/games/${game.id}`} />
                  {game.cover && game.cover.image_id && (
                    <Link to={`/games/${game.id}`}>
                      <div className="game_cover">
                        <img
                          className="game_cover_img"
                          src={`https://images.igdb.com/igdb/image/upload/t_original/${
                            game.cover.image_id
                          }.jpg`}
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
                          {title === "Pre-order" && game.first_release_date ? (
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
