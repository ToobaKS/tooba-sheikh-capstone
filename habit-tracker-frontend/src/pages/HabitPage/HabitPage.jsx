import { useState } from "react";
import { useParams } from "react-router-dom";
import HabitHeader from "../../components/HabitHeader/HabitHeader";
import HabitCard from "../../components/HabitCard/HabitCard";
import EmptyState from "../../components/EmptyState/EmptyState";
import HabitFormModal from "../../components/HabitFormModal/HabitFormModal";
import "./HabitPage.scss";

function HabitPage() {
  const { categoryName } = useParams(); // dynamic route
  const [habits, setHabits] = useState([]); // You'll fetch and set these later
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddHabit = (newHabit) => {
    setHabits((prev) => [...prev, newHabit]);
    setIsModalOpen(false);
  };

  return (
    <main className="habit-page">
      <HabitHeader categoryName={categoryName} />

      <section className="habit-page__content">
        {habits.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="habit-page__list">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}

        <button
          className="habit-page__add-button"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>
      </section>

      <HabitFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddHabit}
      />
    </main>
  );
}

export default HabitPage;
