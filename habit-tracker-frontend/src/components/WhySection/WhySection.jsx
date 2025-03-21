import "./WhySection.scss";
import plantShelf from "../../assets/images/10.png";

function WhySection() {
  return (
    <div className="what-section">
      <div className="what-section__info">
        <h2 className="what-section__title">What is Rootinely</h2>
        <p className="what-section__para">
          Rootinely is a habit-tracking app designed to make building routines
          feel natural, fun, and rewarding. Instead of boring checklists,
          Rootinely helps your habits grow—just like plants. <br /> <br />
          With a progress-focused system, AI-powered motivation, and a
          beautiful, calming design, Rootinely turns your daily habits into a
          journey of growth.
        </p>
        <ul className="what-section__list">
          <li className="what-section__list-item">Track habits effortlessly</li>
          <li className="what-section__list-item">
            Stay motivated with AI Buddy
          </li>
          <li className="what-section__list-item">
            Celebrate progress, not just streaks
          </li>
        </ul>
        <p className="what-section__catch-phrase">
          Because good habits take root over time.
        </p>
      </div>
      <div className="what-section__image-container">
        <img
          className="what-section__image"
          src={plantShelf}
          alt="plant shelf"
        />
      </div>
    </div>
  );
}

export default WhySection;
