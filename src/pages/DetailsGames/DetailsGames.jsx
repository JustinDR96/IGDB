import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import moment from "moment";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const DetailsGames = () => {
  const { id } = useParams(); // Récupère l'ID du jeu à partir de la route
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/games/${id}`);
        const game = response.data;
        setGame(game); // Met à jour l'état du jeu avec les données obtenues
      } catch (error) {
        console.error("Error fetching game details:", error.message);
        console.error("Full error: ", error);
      }
    };
    window.scrollTo(0, 0);
    fetchGameDetails();
  }, [id]); // Exécutez cette fonction chaque fois que l'ID du jeu change

  if (!game) {
    return <div>Loading...</div>; // Affiche un message de chargement tant que les détails du jeu ne sont pas chargés
  }

  function getRatingColor(rating) {
    if (rating < 50) {
      return "red";
    } else if (rating < 80) {
      return "orange";
    } else {
      return "green";
    }
  }
  console.log(game);
  const publisher =
    game[0]?.involved_companies.filter((company) => company.publisher)?.[0]
      ?.company.name || "";
  const developer =
    game[0]?.involved_companies.filter((company) => company.developer)?.[0]
      ?.company.name || "";

  return (
    <div className="details_games">
      <div className="screenshot">
        {game[0].screenshots && game[0].screenshots[0].image_id ? (
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_original/${game[0].screenshots[0].image_id}.jpg`}
            alt=""
          />
        ) : (
          <div>Screenshot not available</div>
        )}
      </div>

      <div className="game_content">
        <div className="game_content_cover">
          <img
            className="cover"
            src={`https://images.igdb.com/igdb/image/upload/t_720p/${game[0].cover.image_id}.jpg`}
            alt=""
          />
        </div>

        <div className="game_content_card">
          <div className="game_content_card_header">
            <h1 className="game_title">{game[0]?.name || ""}</h1>
          </div>

          <div className="game_content_card_mid">
            <p className="game_stock">Stock 5</p>
            <p
              className="game_rating"
              style={{ backgroundColor: getRatingColor(game.rating) }}
            >
              {Math.floor(game[0].aggregated_rating)}
            </p>
          </div>

          <div className="game_select">
            <select className="game_platform">
              {game[0]?.platforms?.map((platform, index) => (
                <option key={index} value={platform.name}>
                  {platform.name}
                </option>
              ))}
            </select>
            
            <select className="game_edition">
              <option value={game[0]?.name}>{game[0]?.name}</option>
              {game[0]?.bundles?.map((bundle, index) => (
                <option key={index} value={bundle.name}>
                  {bundle.name}
                </option>
              ))}
            </select>
          </div>

          <div className="game_price">
            <p className="price_sold">65$</p>
            <p>50$</p>
          </div>

          <button className="buy_btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"
                fill="white"
              />
            </svg>
            Buy now
          </button>
        </div>
      </div>

      <div className="game_content_footer">
        <div className="game_summary">
          <p>{game[0]?.storyline || game[0]?.summary}</p>
        </div>

        <div className="game_details">
          <div className="game_publisher">
            <p>Publisher :</p>
            <p>{publisher}</p>
          </div>

          <div className="game_developer">
            <p>Developer :</p>
            <p>{developer}</p>
          </div>

          <div className="game_release">
            <p>Release date :</p>
            <p>
              {format(
                new Date(game[0].first_release_date * 1000),
                "dd MMMM yyyy"
              )}
            </p>
          </div>

          <div className="game_genre">
            <p>Genres :</p>
            <p>{game[0]?.genres?.map((genre) => genre.name).join(", ")}</p>
          </div>

          <div className="game_platforms">
            <p>Platforms :</p>
            <p>
              {game[0]?.platforms?.map((platform) => platform.name).join(", ")}
            </p>
          </div>

          <div className="game_modes">
            <p>Game modes :</p>
            <p>
              {game[0]?.game_modes
                ?.map((game_mode) => game_mode.name)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="game_content_trailer">
        <div className="game_trailer">
          <iframe
            className="iframe"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${game[0]?.videos[0]?.video_id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>

        <div className="game_screenshots">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={500}
            loop={true}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {game[0].screenshots.map((screenshot) => (
              <SwiperSlide key={screenshot.id}>
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_1080p/${screenshot.image_id}.jpg`}
                  alt="Screenshot"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="similar_games">
          <h1 className="similar_games_title">Similar Games</h1>
          <div className="similar_games_list">
            {game[0]?.similar_games?.slice(0, 8).map((similarGame) => (
              <div className="similar_game" key={similarGame.id}>
                <Link to={`/games/${similarGame.id}`}>
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_720p/${similarGame.cover.image_id}.jpg`}
                    alt=""
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsGames;
