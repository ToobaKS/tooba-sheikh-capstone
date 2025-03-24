import { useState } from "react";
import "./HabitForm.scss";

function HabitForm({ onSubmit, onClose, initialValues = {} }) {
  const [formData, setFormData] = useState({
    description: initialValues.description || "",
  });

  const handleChange = (e) => {
    setFormData({ description: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      habit_name: "Habit",
      ...formData,
    };
    onSubmit(payload);
    setFormData({ description: "" });
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <textarea
        className="habit-form__textarea"
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
      />
      <div className="habit-form__buttons">
        <button type="submit" className="habit-form__submit">
          Add Habit
        </button>
        <button type="button" className="habit-form__cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default HabitForm;
