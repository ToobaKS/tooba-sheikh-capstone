import "./CategoryCard.scss";
import { ChevronDown } from "lucide-react";

function CategoryCard({ name, plantPhase, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <h3 className="category-card__title">{name}</h3>
      <div className="category-card__icon">🌿</div>

      <p className="category-card__phase-label">Plant Phase</p>

      <div className="category-card__progress">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`category-card__dot ${
              i < plantPhase ? "category-card__dot--active" : ""
            }`}
          />
        ))}
      </div>

      <div className="category-card__footer">
        <span className="category-card__footer-text">Daily Progress</span>
        <ChevronDown size={16} />
      </div>
    </div>
  );
}

export default CategoryCard;
