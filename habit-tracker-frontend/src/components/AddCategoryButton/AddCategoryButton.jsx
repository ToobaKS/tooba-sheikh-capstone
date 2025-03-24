import { Plus } from "lucide-react";
import "./AddCategoryButton.scss";

function AddCategoryButton({ onClick }) {
  return (
    <button className="add-category-button" onClick={onClick}>
      <Plus size={20} />
    </button>
  );
}

export default AddCategoryButton;
