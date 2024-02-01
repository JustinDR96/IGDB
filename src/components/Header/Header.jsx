import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../panier/CartContext";

function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const accountMenuRef = useRef(null);
  const sidenavRef = useRef(null);
  const navigate = useNavigate();
  const { cart, removeFromCart } = useContext(CartContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    // Vérifiez si searchInput a une valeur avant de naviguer
    if (searchInput.trim() !== "") {
      navigate(`/search/${searchInput}`);
      setSearchInput(""); // Réinitialiser la barre de recherche
    }
  };

  // Fermer le menu du compte lorsque vous cliquez en dehors de celui-ci
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setIsAccountMenuOpen(false);
      }
    }

    // Ajouter l'écouteur d'événements lorsque le composant est monté
    document.addEventListener("mousedown", handleClickOutside);

    // Supprimer l'écouteur d'événements lorsque le composant est démonté
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accountMenuRef]);

  // Fermer la sidenav lorsque vous cliquez en dehors de celle-ci
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
        setIsHamburgerOpen(false);
      }
    }

    // Ajouter l'écouteur d'événements lorsque le composant est monté
    document.addEventListener("mousedown", handleClickOutside);

    // Supprimer l'écouteur d'événements lorsque le composant est démonté
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidenavRef]);
  return (
    <div className="header">
      <nav className="navBar">
        <a className="nav_logo" href="/home">
          <img
            className="nav_logo"
            src="/Images/logo/logo_game_center_removebg.png"
            alt=""
          />
        </a>
        <ul className="nav_links">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/popular">Popular Games</a>
          </li>
          <li>
            <a href="/home">New Games</a>
          </li>
          <li>
            <a href="/home">Upcoming Games</a>
          </li>
        </ul>
        <div className="searchBar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="submit">
              <img src="/Images/SVG/search_icone.svg" alt="" />
            </button>
          </form>
        </div>
        <div className="user_links">
          <div
            className="cart-icon"
            onMouseEnter={() => setIsDrawerOpen(true)}
            onMouseLeave={() => setIsDrawerOpen(false)}
          >
            <img src="/Images/SVG/shopping_cart.svg" alt="Cart" />
            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
            {isDrawerOpen && (
              <div className="cart-drawer">
                {cart.map((game) => (
                  <div key={game.id}>
                    <img src={game.background_image} alt={game.name} />
                    <p>{game.name}</p>
                    <p>50$</p>
                    <button onClick={() => removeFromCart(game.id)}>X</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <a href="/register">
            <img src="/Images/SVG/account_icon.svg" alt="" />
          </a>
        </div>
        <div
          className="hamburger"
          onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
        >
          <img src="/Images/SVG/menu_hamburger.svg" alt="" />
        </div>
        {isHamburgerOpen && (
          <div className="sideNav open" ref={sidenavRef}>
            <div className="account">
              <a href="/register">
                <img src="/Images/SVG/account_icon.svg" alt="" />
              </a>

              <div className="cart-icon">
                <img src="/Images/SVG/shopping_cart.svg" alt="Cart" />
                {cart.length > 0 && (
                  <span className="cart-badge">{cart.length}</span>
                )}
              </div>
            </div>
            <ul className="nav_links">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/popular">Popular Games</a>
              </li>
              <li>
                <a href="#">New Games</a>
              </li>
              <li>
                <a href="#">Upcoming Games</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
