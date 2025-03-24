import HabitCard from "../HabitCard/HabitCard";
import "./HabitList.scss";

function HabitList({ habits, onToggleComplete, onEdit, onDelete }) {
  return (
    <div className="habit-list">
      {habits.length > 0 ? (
        habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p className="habit-list__empty">No habits yet!</p>
      )}
    </div>
  );
}

export default HabitList;
