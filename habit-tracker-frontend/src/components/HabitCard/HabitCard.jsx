import "./HabitCard.scss";
import { GripVertical, Edit, Trash2 } from "lucide-react";

function HabitCard({ habit, onEdit, onDelete, onToggleComplete }) {
  return (
    <div className={`habit-card ${habit.completed ? "habit-card--done" : ""}`}>
      <div className="habit-card__left">
        <GripVertical className="habit-card__drag" />

        <input
          type="checkbox"
          checked={habit.completed}
          onChange={() => onToggleComplete(habit.id)}
          className="habit-card__checkbox"
        />

        <div className="habit-card__info">
          <h4 className="habit-card__title">{habit.title}</h4>
          {habit.description && (
            <p className="habit-card__desc">{habit.description}</p>
          )}
        </div>
      </div>

      <div className="habit-card__actions">
        <Edit className="habit-card__icon" onClick={() => onEdit(habit)} />
        <Trash2 className="habit-card__icon" onClick={() => onDelete(habit.id)} />
      </div>
    </div>
  );
}

export default HabitCard;

