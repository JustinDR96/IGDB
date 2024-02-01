import React from "react";

export default function Popular() {

    
  return (
    <div className="popular">
      {/* {games
        .filter((gameItem) => gameItem && gameItem.background_image)
        .map((gameItem) => (
          <Link to={`/games/${gameItem.id}`} key={gameItem.id}>
            <div className="gameItem">
              {gameItem.background_image ? (
                <img
                  className="gameItem_cover"
                  src={gameItem.background_image}
                  alt=""
                />
              ) : (
                <div>Cover not available</div>
              )}
            </div>
          </Link>
        ))} */}
    </div>
  );
}
