import Modal from "react-modal";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../util/api";
import "./AddCategoryModal.scss";

const icons = import.meta.glob("../../assets/category-icons/*.png", {
  eager: true,
  import: "default",
});

function AddCategoryModal({ isOpen, onClose, onSelect }) {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setAllCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    if (isOpen) loadCategories();
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="add-category-modal"
      overlayClassName="add-category-modal__overlay"
    >
      <button className="add-category-modal__close" onClick={onClose}>
        &times;
      </button>
      <h2 className="add-category-modal__title">Choose a Category</h2>
      <div className="add-category-modal__grid">
        {allCategories.map((cat) => (
          <div
            key={cat.name}
            className="add-category-modal__card"
            onClick={() => onSelect(cat.name)}
          >
            <img
              src={icons[`../../assets/category-icons/${cat.image_url}`]}
              alt={cat.name}
              className="add-category-modal__icon"
            />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default AddCategoryModal;
