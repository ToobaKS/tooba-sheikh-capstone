import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logos/logo-2.png";
import "./Header.scss";

function Header() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}
    >
      {/* Sidebar Toggle Button */}
      <button className="sidebar__toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "➖" : "➕"} {/* Icon Changes */}
      </button>

      {/* Logo */}
      <div className="sidebar__logo">
        <img src={logo} alt="Rootinely Logo" className="sidebar__logo-img" />
        {isOpen && <h2 className="sidebar__logo-text">Rootinely</h2>}
      </div>

      {/* Navigation Links */}
      <nav className="sidebar__nav">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          🌱 Habits
        </NavLink>
        <NavLink
          to="/time-capsule"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          📜 Time Capsule
        </NavLink>
        <NavLink
          to="/chatbot"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          🤖 Chatbot
        </NavLink>
        <NavLink
          to="/data"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          📊 Data
        </NavLink>
      </nav>
    </aside>
  );
}

export default Header;
