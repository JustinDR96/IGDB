import react, { useState, useEffect, useRef } from "react";

function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const sidenavRef = useRef(null);

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
        <a className="nav_logo" href="_blank">
          <img
            className="nav_logo"
            src="/Images/logo/logo_game_center_removebg.png"
            alt=""
          />
        </a>
        <ul className="nav_links">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Popular Games</a>
          </li>
          <li>
            <a href="">New Games</a>
          </li>
          <li>
            <a href="">Upcoming Games</a>
          </li>
        </ul>
        <div className="searchBar">
          <input type="text" placeholder="Search..." />
          <a href="_blank">
            <img src="/Images/SVG/search_icone.svg" alt="" />
          </a>
        </div>
        <div className="user_links">
          <a href="_blank">
            <img src="/Images/SVG/shopping_cart.svg" alt="" />
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsAccountMenuOpen(!isAccountMenuOpen);
            }}
          >
            <img src="/Images/SVG/account_icon.svg" alt="" />
          </a>
          {isAccountMenuOpen && (
            <div className="accountMenu open" ref={accountMenuRef}>
              <a href="#">Login</a>
              <a href="#">Sign Up</a>
            </div>
          )}
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
              <a href="#">Login</a>
              <a href="#">Sign Up</a>
              <a href="_blank">
                <img src="/Images/SVG/shopping_cart.svg" alt="" />
              </a>
            </div>
            <ul className="nav_links">
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">Popular Games</a>
              </li>
              <li>
                <a href="">New Games</a>
              </li>
              <li>
                <a href="">Upcoming Games</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
