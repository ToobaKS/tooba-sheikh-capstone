import "./HabitCard.scss";
import { GripVertical, Edit, Trash2 } from "lucide-react";

function HabitCard({ habit, onEdit, onDelete, onToggleComplete }) {
  return (
    <div
      className={`habit-card ${
        habit.completed_today ? "habit-card--done" : ""
      }`}
    >
      <div className="habit-card__left">
        <GripVertical className="habit-card__drag" />

        <input
          type="checkbox"
          className="habit-card__checkbox"
          checked={!!habit.completed_today}
          disabled={!!habit.completed_today}
          onChange={() => onToggleComplete(habit.id)}
        />

        <div className="habit-card__info">
          {habit.description && (
            <p className="habit-card__desc">{habit.description}</p>
          )}
        </div>
      </div>

      <div className="habit-card__actions">
        <Edit
          className="habit-card__icon"
          onClick={() => onEdit(habit)}
          title="Edit habit"
        />
        <Trash2
          className="habit-card__icon"
          onClick={() => onDelete(habit.id)}
          title="Delete habit"
        />
      </div>
    </div>
  );
}

export default HabitCard;
