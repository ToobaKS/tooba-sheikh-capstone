import { useState } from "react";
import HabitCard from "../HabitCard/HabitCard";
import "./HabitList.scss";

function HabitList() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Morning Workout", completed: false },
    { id: 2, name: "Meditation", completed: true },
    { id: 3, name: "Read 10 Pages", completed: false },
  ]);

  const handleToggleComplete = (id) => {
    const updated = habits.map((habit) =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updated);
  };

  const handleDelete = (id) => {
    const updated = habits.filter((habit) => habit.id !== id);
    setHabits(updated);
  };

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={() => handleToggleComplete(habit.id)}
          onDelete={() => handleDelete(habit.id)}
        />
      ))}
    </div>
  );
}

export default HabitList;
