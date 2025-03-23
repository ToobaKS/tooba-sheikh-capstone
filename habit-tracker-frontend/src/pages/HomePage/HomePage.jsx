import { useState } from "react";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import AddCategoryButton from "../../components/AddCategoryButton/AddCategoryButton";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";

function CategoriesPage() {
  const [categories, setCategories] = useState(["Fitness", "Wellness", "Study"]);
  const navigate = useNavigate();

  const handleAddCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory) {
      setCategories((prev) => [...prev, newCategory]);
    }
  };

  const handleCategoryClick = (name) => {
    navigate(`/habits/${name.toLowerCase()}`);
  };

  return (
    <main className="categories-page">
      <h1 className="categories-page__title">Your Categories</h1>
      <div className="categories-page__list">
        {categories.map((cat, index) => (
          <CategoryCard key={index} name={cat} onClick={() => handleCategoryClick(cat)} />
        ))}
        <AddCategoryButton onClick={handleAddCategory} />
      </div>
    </main>
  );
}

export default CategoriesPage;
