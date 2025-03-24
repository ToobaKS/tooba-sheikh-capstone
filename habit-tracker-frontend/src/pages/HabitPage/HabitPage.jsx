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

  const refreshProgress = async (userCategoryId) => {
    if (!userCategoryId) return;

    try {
      const updatedProgress = await fetchCategoryProgress(userCategoryId);
      setCategoryInfo((prev) => ({
        ...prev,
        progress: Math.round(updatedProgress.completionRate),
      }));
    } catch (error) {
      console.log("Error refreshing progress:", error);
    }
  };

  const handleToggleComplete = async (habit_id) => {
    try {
      await logHabitCompletion(habit_id);
      await loadData();
      await refreshProgress(categoryInfo.userCategoryId);
    } catch (err) {
      console.log("Error completing habit:", err);
    }
  };

  const handleAddHabit = async (habitData) => {
    try {
      const payload = {
        ...habitData,
        user_category_id: categoryInfo.userCategoryId,
      };

      await addHabit(payload);
      await loadData();
      await refreshProgress(categoryInfo.userCategoryId);
      setShowAddModal(false);
    } catch (err) {
      console.log("Error adding habit:", err);
    }
  };

  const loadData = async () => {
    try {
      const habitData = await fetchHabits(categoryName);
      const todayLogs = await fetchTodayLogs(categoryName);

      const habitsWithStatus = habitData.map((habit) => ({
        ...habit,
        completed_today: todayLogs.includes(habit.id),
      }));
      setHabits(habitsWithStatus);

      const infoData = await fetchCategoryInfo(categoryName);
      const userCategoryId = habitData[0]?.user_category_id || null;

      let progress = 0;
      if (userCategoryId) {
        const progressData = await fetchCategoryProgress(userCategoryId);
        progress = Math.round(progressData.completionRate);
      }

      setCategoryInfo({
        ...infoData,
        userCategoryId,
        progress,
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
