import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchHabits,
  fetchCategoryInfo,
  fetchCategoryProgress,
  logHabitCompletion,
  fetchTodayLogs,
} from "../../util/api";
import HabitHeader from "../../components/HabitHeader/HabitHeader";
import HabitList from "../../components/HabitList/HabitList";
import EmptyState from "../../components/EmptyState/EmptyState";
import "./HabitPage.scss";

function HabitPage() {
  const { categoryName } = useParams();
  const [habits, setHabits] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);

  const handleToggleComplete = async (habit_id) => {
    try {
      await logHabitCompletion(habit_id);

      const updatedHabits = await fetchHabits(categoryName);
      console.log("habit.completed_today", updatedHabits);

      setHabits(updatedHabits);

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
          {habits.length > 0 ? (
            <HabitList
              habits={habits}
              onToggleComplete={handleToggleComplete}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </main>
  );
}

export default HabitPage;
