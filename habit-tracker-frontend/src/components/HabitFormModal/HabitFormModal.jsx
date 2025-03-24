import { useState } from "react";
import Modal from "react-modal";
import { addHabit } from "../../util/api";
import "./HabitFormModal.scss";

function HabitFormModal({ isOpen, onClose, userCategoryId, onHabitCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addHabit({
        user_category_id: userCategoryId,
        ...formData,
      });
      onHabitCreated();
      setFormData({ title: "", description: "" });
      onClose();
    } catch (err) {
      console.log("Failed to create habit", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="habit-form-modal"
      overlayClassName="habit-form-modal__overlay"
    >
      <button className="habit-form-modal__close" onClick={onClose}>
        &times;
      </button>
      <h2 className="habit-form-modal__title">Add a New Habit</h2>
      <form className="habit-form-modal__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Habit title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Short description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Habit</button>
      </form>
    </Modal>
  );
}

export default HabitFormModal;

