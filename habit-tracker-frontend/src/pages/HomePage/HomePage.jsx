import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserCategories, addUserCategory } from "../../util/api";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import AddCategoryButton from "../../components/AddCategoryButton/AddCategoryButton";
import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";
import "./HomePage.scss";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
        <AddCategoryModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSelect={async (categoryName) => {
            try {
              // Call your backend add method
              await addUserCategory({ name: categoryName });

              // Refresh categories
              const updated = await fetchUserCategories();
              setCategories(updated);
              setShowModal(false);
            } catch (err) {
              console.error("Error adding category", err);
            }
          }}
        />
        <AddCategoryButton onClick={() => setShowModal(true)} />
      </div>
    </main>
  );
}

export default HomePage;
