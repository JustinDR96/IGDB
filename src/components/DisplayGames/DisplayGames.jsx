import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { format } from "date-fns";
import useAuth from "../../hook/auth";

function DisplayGames() {
  const { accessToken } = useAuth();
  const [popularGames, setPopularGames] = useState([]);
  const [trendingGames, setTrendingGames] = useState([]);
  const [preorderGames, setPreorderGames] = useState([]);

  const fetchGames = async (type, setGames) => {
    let body;
    const currentDate = Math.floor(Date.now() / 1000); // Date Unix actuelle
    const threeMonthsAgo = Math.floor(
      (Date.now() - 3 * 30 * 24 * 60 * 60 * 1000) / 1000
    ); // Date Unix d'il y a trois mois
    const nextYearDate = Math.floor(
      (Date.now() + 365 * 24 * 60 * 60 * 1000) / 1000
    ); // Date Unix de l'année suivante

    switch (type) {
      case "popular":
        body = `fields *, cover.*, videos.*,genres.*,platforms.*,platforms.platform_logo.*;limit:20;sort hypes desc; where rating >= 90;`;
        break;
      case "trending":
        body = `fields *, cover.*, videos.*,genres.*,platforms.*,platforms.platform_logo.*,follows;limit:20;sort follows desc;where first_release_date >= ${threeMonthsAgo} & first_release_date <= ${currentDate} & rating >= 70;`;
        break;
      case "preorder":
        body = `fields *, cover.*, videos.*, first_release_date;sort hypes desc;limit:15; where first_release_date > ${currentDate} & first_release_date <= ${nextYearDate};`;
        break;
      default:
        return;
    }

    try {
      const response = await axios.post(
        "/api/proxy",
        { body, accessToken },
        {
          headers: {
            "Client-ID": process.env.VITE_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      setGames(response.data);
      console.log(response);
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
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    fetchGames("popular", setPopularGames);
    fetchGames("trending", setTrendingGames);
    fetchGames("preorder", setPreorderGames);
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
