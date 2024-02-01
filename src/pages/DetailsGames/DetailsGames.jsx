import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Loading from "../../components/Loading/Loading";
import { CartContext } from "../../components/panier/CartContext";

const DetailsGames = () => {
  const [game, setGame] = useState(null);
  const { id: gameId } = useParams();
  const [screenshots, setScreenshots] = useState([]);
  const [isTextTruncated, setIsTextTruncated] = useState(true);
  const [editions, setEditions] = useState([]);
  const { addToCart } = useContext(CartContext);

  const handleReadMoreClick = () => {
    setIsTextTruncated(!isTextTruncated);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${gameId}?key=${
            import.meta.env.VITE_API_KEY
          }`
        );

        setGame(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'API RAWG",
          error
        );
      }
    };

    fetchGame();
  }, [gameId]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${gameId}/screenshots?key=${
            import.meta.env.VITE_API_KEY
          }`
        );

        setScreenshots(response.data.results);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des captures d'écran de l'API RAWG",
          error
        );
      }
    };

    fetchScreenshots();
  }, [gameId]);

  useEffect(() => {
    const fetchEditions = async () => {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${gameId}/additions?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setEditions(response.data.results);
      console.log(response.data.results);
    };

    fetchEditions();
  }, [gameId]);

  if (!game) {
    return <Loading />;
  }

  function getRatingColor(metacritic) {
    if (metacritic < 50) {
      return "red";
    } else if (metacritic < 80) {
      return "orange";
    } else {
      return "green";
    }
  }
  return (
    <div className="details_games">
      <div className="screenshot">
        {game?.background_image_additional ? (
          <img src={game.background_image_additional} alt="" />
        ) : (
          ""
        )}
      </div>

      <div className="game_content">
        <div className="game_content_cover">
          {game?.background_image ? (
            <img src={game.background_image} alt="" />
          ) : (
            ""
          )}
        </div>

        <div className="game_content_card">
          <div className="game_content_card_header">
            <h1 className="game_title">{game?.name || ""}</h1>
          </div>

          <div className="game_content_card_mid">
            <p
              className="game_rating"
              style={{ backgroundColor: getRatingColor(game.metacritic) }}
            >
              {game && game.metacritic !== null && !isNaN(game.metacritic)
                ? Math.floor(game.metacritic)
                : "Not Rated Yet"}
            </p>
          </div>

          <div className="game_select">
            <select className="game_platform">
              {game?.platforms?.map((platform, index) => (
                <option key={index} value={platform.platform.name}>
                  {platform.platform.name}
                </option>
              ))}
            </select>

            <select className="game_edition">
              <option value={game?.name}>{game?.name}</option>
              {editions.map((edition, index) => (
                <option key={index} value={edition.name}>
                  {edition.name}
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
            disabled={!game?.released || new Date(game?.released) > new Date()}
            onClick={() => addToCart(game)}
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
            {!game?.released
              ? "Not available"
              : new Date(game?.released) > new Date()
                ? "Pre Order"
                : "Buy now"}
          </button>
        </div>
      </div>

      <div className="game_content_footer">
        <div className="game_summary">
          <div
            dangerouslySetInnerHTML={{
              __html: isTextTruncated
                ? game?.description.slice(0, 400) + "..."
                : game?.description,
            }}
          />
          <button onClick={handleReadMoreClick}>
            {isTextTruncated ? "+" : "-"}
          </button>
        </div>

        <div className="game_details">
          <div className="game_publisher">
            <p>Publisher :</p>
            <p>
              {game?.publishers?.map((publisher) => publisher.name).join(", ")}
            </p>
          </div>

          <div className="game_developer">
            <p>Developer :</p>
            <p>
              {game?.developers?.map((developer) => developer.name).join(", ")}
            </p>
          </div>

          <div className="game_release">
            <p>Release date :</p>
            <p>
              {game?.released
                ? new Date(game.released).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
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
              {game?.platforms
                ?.map((platform) => platform.platform.name)
                .join(", ")}
            </p>
          </div>

          <div className="game_modes">
            <p>Rating :</p>
            <p>{game?.esrb_rating?.name}</p>
          </div>
        </div>
      </div>

      <div className="game_content_trailer">
        <div className="game_screenshots">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            slidesPerGroup={1}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={1000}
            loop={screenshots.length > 1}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {screenshots.map((screenshot) => (
              <SwiperSlide key={screenshot.id}>
                <img src={screenshot.image} alt="Screenshot" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default DetailsGames;
