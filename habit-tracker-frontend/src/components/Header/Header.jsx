import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo-4.png";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Rootinely Logo" className="header__logo-img" />
        <h2 className="header__logo-text">Rootinely</h2>
      </Link>
      <nav className="header__nav">
        <NavLink to="/home" className="header__link">
          Habits
        </NavLink>
        <NavLink to="/time-capsule" className="header__link">
          Time Capsule
        </NavLink>
        <NavLink to="/chatbot" className="header__link">
          Chatbot
        </NavLink>
        <NavLink to="/data" className="header__link">
          Data
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
