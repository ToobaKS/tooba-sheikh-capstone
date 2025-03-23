import "./CategoryCard.scss";

function CategoryCard({ name, plantPhase, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <div className="category-card__info">
        <h3 className="category-card__title">{name}</h3>
        <p className="category-card__phase">Plant Phase: {plantPhase}</p>
      </div>
    </div>
  );
}

export default CategoryCard;
