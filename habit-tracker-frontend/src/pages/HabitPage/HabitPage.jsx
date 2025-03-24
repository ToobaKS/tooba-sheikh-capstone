import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchHabits,
  fetchCategoryInfo,
  fetchCategoryProgress,
} from "../../util/api";
import HabitHeader from "../../components/HabitHeader/HabitHeader";
import HabitCard from "../../components/HabitCard/HabitCard";
import EmptyState from "../../components/EmptyState/EmptyState";
import "./HabitPage.scss";

function HabitPage() {
  const { categoryName } = useParams();
  const [habits, setHabits] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const habitData = await fetchHabits(categoryName);
        const infoData = await fetchCategoryInfo(categoryName);

        setHabits(habitData);
        setCategoryInfo({
          ...infoData,
          userCategoryId: habitData[0]?.user_category_id || null,
        });
      } catch (err) {
        console.log("Error fetching habits or category info", err);
      }
    };

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
            habits.map((habit) => <HabitCard key={habit.id} habit={habit} />)
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </main>
  );
}

export default HabitPage;
