import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserCategories } from "../../util/api";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./HomePage.scss";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchUserCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load user categories:", err);
      }
    };
    loadCategories();
  }, []);

  const handleClick = (categoryName) => {
    navigate(`/habit/${categoryName}`);
  };

  return (
    <main className="categories-page">
      <h1 className="categories-page__title">Your Categories</h1>
      <div className="categories-page__grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.category_id}
            name={category.name}
            plantPhase={category.plant_phase}
            onClick={() => handleClick(category.name)}
          />
        ))}
        <div className="category-card category-card--add" onClick={() => console.log("Add new category")}>
          <span className="category-card__plus">+</span>
        </div>
      </div>
    </main>
  );
}

export default HomePage;

