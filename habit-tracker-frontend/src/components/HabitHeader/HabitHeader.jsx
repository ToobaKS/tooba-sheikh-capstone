import "./HabitHeader.scss";

function HabitHeader({ name, description, progress }) {
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
