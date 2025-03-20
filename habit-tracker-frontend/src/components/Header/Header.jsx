import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logos/logo-1.png";
import "./Header.scss";

function Header() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}
    >
      {/* Logo */}

      {/* Navigation Links */}
      <nav className="sidebar__nav">
        <div className="sidebar__logo">
          <button
            className="sidebar__toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={logo}
              alt="Rootinely Logo"
              className="sidebar__logo-img"
            />
          </button>
          {isOpen && <h2 className="sidebar__logo-text">Rootinely</h2>}
        </div>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              color="currentColor"
            >
              <path d="M14.5 10.5S12 12.5 12 15m-6 0h12M7 15l.51 3.566c.233 1.637.35 2.456.914 2.945S9.815 22 11.47 22h1.062c1.654 0 2.48 0 3.045-.49c.564-.488.68-1.307.915-2.944L17 15m-6.937-6.937a3.2 3.2 0 0 0 0-4.524C8.178 1.654 4.031 2.03 4.031 2.03s-.377 4.147 1.508 6.032a3.2 3.2 0 0 0 4.524 0m4.74 2.135a2.74 2.74 0 0 0 3.878 0c1.616-1.616 1.293-5.17 1.293-5.17s-3.555-.324-5.17 1.292a2.74 2.74 0 0 0 0 3.878" />
              <path d="M10 8.5s2 2.5 2 6.5" />
            </g>
          </svg>
          {isOpen && <p className="sidebar__menu">Habits</p>}
        </NavLink>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M19 2v3a7 7 0 0 1-7 7M5 2v3a7 7 0 0 0 7 7m0 0a7 7 0 0 1 7 7v3m-7-10a7 7 0 0 0-7 7v3M4 2h16m0 20H4"
              color="currentColor"
            />
          </svg>
          {isOpen && <p className="sidebar__menu">Habits</p>}
        </NavLink>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              color="currentColor"
            >
              <path d="M11.5 2C6.21 2.25 2 6.435 2 11.56c0 2.54 1.033 4.848 2.719 6.56c.371.378.619.893.519 1.423a5.3 5.3 0 0 1-1.087 2.35a6.5 6.5 0 0 0 4.224-.657c.454-.242.681-.363.842-.387s.39.019.848.105a10.4 10.4 0 0 0 1.935.179c5.522 0 10-4.286 10-9.572q0-.286-.017-.568" />
              <path d="M15.015 2.387c1.073-.64 2.009-.382 2.571.028c.23.169.346.253.414.253s.183-.084.414-.253c.562-.41 1.498-.668 2.571-.028c1.408.84 1.726 3.609-1.52 5.945c-.62.445-.928.668-1.465.668s-.846-.223-1.464-.668c-3.247-2.336-2.929-5.106-1.521-5.945M11.996 12h.008m3.987 0H16m-8 0h.009" />
            </g>
          </svg>
          {isOpen && <p className="sidebar__menu">AI Buddy</p>}
        </NavLink>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              color="currentColor"
            >
              <path d="M21 21H10c-3.3 0-4.95 0-5.975-1.025S3 17.3 3 14V3" />
              <path d="M5 20c.44-3.156 2.676-11.236 5.428-11.236c1.902 0 2.395 3.871 4.258 3.871C17.893 12.635 17.428 4 21 4" />
            </g>
          </svg>
          {isOpen && <p className="sidebar__menu">Data</p>}
        </NavLink>
      </nav>
    </aside>
  );
}

export default Header;
