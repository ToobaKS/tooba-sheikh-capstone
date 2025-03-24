import { useState } from "react";
import "./HabitForm.scss";

function HabitForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    habit_name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ habit_name: "", description: "" });
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <h2 className="habit-form__title">Add a Habit</h2>
      <input
        className="habit-form__input"
        type="text"
        name="habit_name"
        placeholder="Habit Title"
        value={formData.habit_name}
        onChange={handleChange}
        required
      />
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
