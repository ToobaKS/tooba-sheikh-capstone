import { useEffect, useState } from "react";
import { fetchCategoryProgress } from "../../util/api";
import "./HabitHeader.scss";

function HabitHeader({ name, description, categoryId }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = await fetchCategoryProgress(categoryId);
        setProgress(Math.round(data.completionRate));
      } catch (err) {
        console.log("Failed to fetch category progress", err);
      }
    };

    if (categoryId) loadProgress();
  }, [categoryId]);

  return (
    <div className="habit-header">
      <h2 className="habit-header__title">{name}</h2>
      <p className="habit-header__description">{description}</p>
      <div className="habit-header__progress">
        <div className="habit-header__progress-bar">
          <div
            className="habit-header__progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="habit-header__progress-text">
          {progress}% Complete
        </span>
      </div>
    </div>
  );
}

export default HabitHeader;
