import "./CategoryCard.scss";

function CategoryCard({ name, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <p className="category-card__name">{name}</p>
    </div>
  );
}

export default CategoryCard;