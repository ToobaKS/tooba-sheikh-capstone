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

      <AddCategoryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        ariaHideApp={false}
        onSelect={async (categoryName) => {
          try {
            await addUserCategory({ name: categoryName });
            const updated = await fetchUserCategories();
            setCategories(updated);
            setShowModal(false);
          } catch (err) {
            console.error("Error adding category", err);
          }
        }}
      />
      <div className="categories-page__grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            plantPhase={category.plant_phase}
            onClick={() => handleClick(category.name)}
          />
        ))}
        <AddCategoryButton onClick={() => setShowModal(true)} />
      </div>
    </main>
  );
}

export default HomePage;
