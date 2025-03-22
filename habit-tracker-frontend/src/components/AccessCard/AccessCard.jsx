import "./AccessCard.scss";
import { Link, useNavigate } from "react-router-dom";

function AccessCard({ children }) {
  const navigate = useNavigate();

  return (
    <div className="access-card">
      <div className="access-card__header">
        <Link className="access-card__link" to="/">
          <h2 className="access-card__title">Rootinely</h2>
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="access-card__icon"
          onClick={() => navigate(-1)}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 6s-6 4.419-6 6s6 6 6 6"
            color="currentColor"
          />
        </svg>
      </div>
      {children}
    </div>
  );
}

export default AccessCard;
