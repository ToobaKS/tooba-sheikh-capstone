import Modal from "react-modal";
import "./AddCategoryModal.scss";

const PRESET_CATEGORIES = [
  { name: "Fitness", emoji: "💪" },
  { name: "Mindfulness", emoji: "🧘‍♀️" },
  { name: "Nutrition", emoji: "🥗" },
  { name: "Productivity", emoji: "📈" },
  { name: "Sleep", emoji: "😴" },
];

function AddCategoryModal({ isOpen, onClose, onSelect }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="add-category-modal"
      overlayClassName="add-category-modal__overlay"
    >
      <h2 className="add-category-modal__title">Choose a Category</h2>
      <div className="add-category-modal__grid">
        {PRESET_CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className="add-category-modal__card"
            onClick={() => onSelect(cat.name)}
          >
            <span className="add-category-modal__emoji">{cat.emoji}</span>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default AddCategoryModal;
