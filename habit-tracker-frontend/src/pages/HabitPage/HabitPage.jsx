import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HabitHeader from "../../components/HabitHeader/HabitHeader";
import HabitCard from "../../components/HabitCard/HabitCard";
import EmptyState from "../../components/EmptyState/EmptyState";
import "./HabitPage.scss";

function HabitPage() {
  const { categoryName } = useParams();
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setHabits([]);
  }, [categoryName]);

  return (
    <main className="habit-page">
      <div className="habit-page__plant-container">
      </div>

      <div className="habit-page__main">
        <HabitHeader categoryName={categoryName} />

        {habits.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="habit-page__list">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default HabitPage;
