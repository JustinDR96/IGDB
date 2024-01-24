import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import moment from "moment";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../hook/auth";

const DetailsGames = () => {
  const [game, setGame] = useState(null);
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const accessToken = useAuth();
  const { id: gameId } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const igdbResponse = await axios.post(
          "/api/proxy",
          `fields id,name,platforms.*,themes.name,similar_games.*,similar_games.cover.*,player_perspectives.name,storyline,game_modes.name,platforms.platform_logo.image_id,bundles.*,bundles.cover.*,dlcs.*,cover.*,involved_companies.*,involved_companies.company.*,first_release_date,genres.name,summary,videos.*,aggregated_rating,expansions.*,screenshots.*;limit:1; where id = ${gameId};`, // Utilisez l'ID du jeu dans la requête à l'API IGDB
          {
            headers: {
              Accept: "application/json",
              "Client-ID": clientId,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setGame(igdbResponse.data[0]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'API IGDB",
          error
        );
      }
    };

    fetchGame();
  }, [clientId, accessToken, gameId]);

  if (!game) {
    return <Loading />;
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
    game?.involved_companies.filter((company) => company.publisher)?.[0]
      ?.company.name || "";
  const developer =
    game?.involved_companies.filter((company) => company.developer)?.[0]
      ?.company.name || "";

  return (
    <div className="details_games">
      <div className="screenshot">
        {game?.screenshots?.[0]?.image_id ? (
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_original/${
              game.screenshots[0].image_id
            }.jpg`}
            alt=""
          />
        ) : (
          ""
        )}
      </div>

      <div className="game_content">
        <div className="game_content_cover">
          <img
            className="cover"
            src={
              game?.cover
                ? `https://images.igdb.com/igdb/image/upload/t_720p/${
                    game.cover.image_id
                  }.jpg`
                : ""
            }
            alt=""
          />
        </div>

        <div className="game_content_card">
          <div className="game_content_card_header">
            <h1 className="game_title">{game?.name || ""}</h1>
          </div>

          <div className="game_content_card_mid">
            <p className="game_stock">Stock 5</p>
            <p
              className="game_rating"
              style={{ backgroundColor: getRatingColor(game.rating) }}
            >
              {game && !isNaN(game.aggregated_rating)
                ? "Coming Soon"
                : Math.floor(game.aggregated_rating)}
            </p>
          </div>

          <div className="game_select">
            <select className="game_platform">
              {game?.platforms?.map((platform, index) => (
                <option key={index} value={platform.name}>
                  {platform.name}
                </option>
              ))}
            </select>

            <select className="game_edition">
              <option value={game?.name}>{game?.name}</option>
              {game?.bundles?.map((bundle, index) => (
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

          <button
            className="buy_btn"
            disabled={new Date(game?.first_release_date * 1000) > new Date()}
          >
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
            {new Date(game?.first_release_date * 1000) > new Date()
              ? "Pre Order"
              : "Buy now"}
          </button>
        </div>
      </div>

      <div className="game_content_footer">
        <div className="game_summary">
          <p>{game?.storyline || game?.summary}</p>
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
              {game.first_release_date
                ? format(
                    new Date(game.first_release_date * 1000),
                    "dd MMMM yyyy"
                  )
                : "/"}
            </p>
          </div>

          <div className="game_genre">
            <p>Genres :</p>
            <p>{game?.genres?.map((genre) => genre.name).join(", ")}</p>
          </div>

          <div className="game_platforms">
            <p>Platforms :</p>
            <p>
              {game?.platforms?.map((platform) => platform.name).join(", ")}
            </p>
          </div>

          <div className="game_modes">
            <p>Game modes :</p>
            <p>
              {game?.game_modes?.map((game_mode) => game_mode.name).join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="game_content_trailer">
        <div className="game_trailer">
          {game?.videos?.[0]?.video_id ? (
            <iframe
              className="iframe"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${game?.videos[0]?.video_id}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <p />
          )}
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
            {game.screenshots.map((screenshot) => (
              <SwiperSlide key={screenshot.id}>
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_1080p/${
                    screenshot.image_id
                  }.jpg`}
                  alt="Screenshot"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="similar_games">
          <div className="similar_games_list">
            {game?.similar_games?.slice(0, 6).map((similarGame) => (
              <div className="similar_game" key={similarGame.id}>
                <Link to={`/games/${similarGame.id}`}>
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_720p/${
                      similarGame.cover.image_id
                    }.jpg`}
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
