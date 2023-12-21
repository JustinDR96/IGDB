import react from "react";

function Header() {
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
          <a href="">Login</a>
          <a href="">Sign Up</a>
          <a href="_blank">
            <img src="/Images/SVG/shopping_cart.svg" alt="" />
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Header;
