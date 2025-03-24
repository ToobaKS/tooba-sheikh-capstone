import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import placeholder from "../../assets/gifs/48.gif";
import {
  fetchHabits,
  fetchCategoryInfo,
  fetchCategoryProgress,
  logHabitCompletion,
  fetchTodayLogs,
  addHabit,
  deleteHabit,
  updateHabit,
} from "../../util/api";
import HabitHeader from "../../components/HabitHeader/HabitHeader";
import HabitList from "../../components/HabitList/HabitList";
import EmptyState from "../../components/EmptyState/EmptyState";
import HabitForm from "../../components/HabitForm/HabitForm";
import DeleteHabitModal from "../../components/DeleteHabitModal/DeleteHabitModal";
import { X } from "lucide-react";
import "./HabitPage.scss";

function HabitPage() {
  const { categoryName } = useParams();
  const [habits, setHabits] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [habitToEdit, setHabitToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleConfirmDelete = async () => {
    try {
      await deleteHabit(habitToDelete);
      await loadData();
      await refreshProgress(categoryInfo.userCategoryId);
      setShowDeleteModal(false);
      setHabitToDelete(null);
    } catch (err) {
      console.log("Error deleting habit:", err);
    }
  };

  const handleDeleteClick = (habitId) => {
    setHabitToDelete(habitId);
    setShowDeleteModal(true);
  };

  const handleAddHabit = async (habitData) => {
    if (!categoryInfo?.userCategoryId) {
      console.error("No category ID available for adding habit");
      return;
    }

    try {
      const payload = {
        ...habitData,
        user_category_id: categoryInfo.userCategoryId,
      };

      await addHabit(payload);
      await loadData();
      await refreshProgress(categoryInfo.userCategoryId);
      setShowAddModal(false);
      console.log("✅ Modal should close");
    } catch (err) {
      console.log("Error adding habit:", err);
    }
  };

  const handleEditClick = (habit) => {
    setHabitToEdit(habit);
    setShowEditModal(true);
  };

  const handleUpdateHabit = async (updatedData) => {
    try {
      await updateHabit(habitToEdit.id, {
        description: updatedData.description,
      });

      await loadData();
      await refreshProgress(categoryInfo.userCategoryId);
      setShowEditModal(false);
      setHabitToEdit(null);
    } catch (err) {
      console.log("Error updating habit:", err);
    }
  };

  const loadData = async () => {
    try {
      const habitData = await fetchHabits(categoryName);
      const todayLogs = await fetchTodayLogs(categoryName);
      const infoData = await fetchCategoryInfo(categoryName);

      const habitsWithStatus = habitData.map((habit) => ({
        ...habit,
        completed_today: todayLogs.includes(habit.id),
      }));
      setHabits(habitsWithStatus);
      const userCategoryId = infoData.id || null;

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

      <DeleteHabitModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />

      <Modal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        className="habit-modal"
        overlayClassName="habit-modal__overlay"
        ariaHideApp={false}
      >
        <button
          className="habit-modal__close"
          onClick={() => setShowEditModal(false)}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="habit-modal__title">Edit Habit</h2>
        <HabitForm
          onSubmit={handleUpdateHabit}
          onClose={() => setShowEditModal(false)}
          initialValues={{ description: habitToEdit?.description }}
        />
      </Modal>
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

        <h2 className="habit-modal__title">Add a Habit</h2>

        <HabitForm
          onSubmit={handleAddHabit}
          onClose={() => setShowAddModal(false)}
        />
      </Modal>
      <div className="habit-page__content">
        <section className="habit-page__plant-container"><img className="placeholder" src={placeholder} alt="" /></section>

        <section className="habit-page__list">
          {habits.length > 0 ? (
            <>
              <HabitList
                habits={habits}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />

              <button
                className="habit-list__add-btn"
                onClick={() => setShowAddModal(true)}
              >
                + Add Habit
              </button>
            </>
          ) : (
            <EmptyState
              message="Nothing planted yet 🌱"
              cta="Start growing!"
              onClick={() => setShowAddModal(true)}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default HabitPage;
