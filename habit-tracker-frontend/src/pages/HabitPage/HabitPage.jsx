import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  fetchHabits,
  fetchCategoryInfo,
  fetchCategoryProgress,
  logHabitCompletion,
  fetchTodayLogs,
  addHabit,
} from "../../util/api";
import HabitHeader from "../../components/HabitHeader/HabitHeader";
import HabitList from "../../components/HabitList/HabitList";
import EmptyState from "../../components/EmptyState/EmptyState";
import HabitForm from "../../components/HabitForm/HabitForm";
import { X } from "lucide-react";
import "./HabitPage.scss";

function HabitPage() {
  const { categoryName } = useParams();
  const [habits, setHabits] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleToggleComplete = async (habit_id) => {
    try {
      await logHabitCompletion(habit_id);
      await loadData();

      if (categoryInfo?.userCategoryId) {
        const updatedProgress = await fetchCategoryProgress(
          categoryInfo.userCategoryId
        );
        setCategoryInfo((prev) => ({
          ...prev,
          progress: Math.round(updatedProgress.completionRate),
        }));
      }
    } catch (err) {
      console.log("Error completing habit:", err);
    }
  };

  const handleAddHabit = async (habitData) => {
    try {
      await addHabit(habitData, categoryInfo.userCategoryId);
      await loadData();
      setShowAddModal(false);
    } catch (err) {
      console.log("Error adding habit:", err);
    }
  };

  const loadData = async () => {
    try {
      const habitData = await fetchHabits(categoryName);
      const todayLogs = await fetchTodayLogs(categoryName); // 🔥 fetch completed logs for today

      const habitsWithStatus = habitData.map((habit) => ({
        ...habit,
        completed_today: todayLogs.includes(habit.id),
      }));

      setHabits(habitsWithStatus);

      const infoData = await fetchCategoryInfo(categoryName);
      setCategoryInfo({
        ...infoData,
        userCategoryId: habitData[0]?.user_category_id || null,
      });
    } catch (err) {
      console.log("Error fetching habits or category info", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [categoryName]);

  return (
    <main className="habit-page">
      {categoryInfo && (
        <HabitHeader
          name={categoryInfo.name}
          description={categoryInfo.description}
          categoryId={categoryInfo.userCategoryId}
        />
      )}

      <div className="habit-page__content">
        <section className="habit-page__plant-container">plant</section>

        <section className="habit-page__list">

          <Modal
            isOpen={showAddModal}
            onRequestClose={() => setShowAddModal(false)}
            className="habit-modal"
            overlayClassName="habit-modal__overlay"
            ariaHideApp={false}
          >
            <button
              className="habit-modal__close"
              onClick={() => setShowAddModal(false)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <HabitForm
              onSubmit={handleAddHabit}
              onClose={() => setShowAddModal(false)}
            />
          </Modal>
          {habits.length > 0 ? (
            <>
              <HabitList
                habits={habits}
                onToggleComplete={handleToggleComplete}
                onEdit={() => {}}
                onDelete={() => {}}
              />

              <button
                className="habit-list__add-btn"
                onClick={() => setShowAddModal(true)}
              >
                + Add Habit
              </button>
            </>
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </main>
  );
}

export default HabitPage;
