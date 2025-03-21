import "./WhySection.scss";
import plantShelf from "../../assets/images/13.png";
import LandingPageCard from "../LandingPageCard/LandingPageCard";

function WhySection() {
  return (
    <div className="why-section">
      <div className="why-section__info">
        <h2 className="why-section__title">Why Rootinely?</h2>
        <p className="why-section__para">
          Most habit trackers focus on streaks—miss a day, and it’s like you’ve
          failed. But life isn’t that rigid. Rootinely is different:
        </p>
        <div className="why-section__main">
          <div className="why-section__card">
            <LandingPageCard
              title="Grow, don’t grind"
              content="Instead of punishing missed days, Rootinely
            encourages continuous growth"
            />
            <LandingPageCard
              title="AI Buddy"
              content=" Need a nudge? A pep talk? Your AI
            buddy has your back."
            />
          </div>
          <div className="why-section__image-container">
            <img
              className="why-section__image"
              src={plantShelf}
              alt="plant shelf"
            />
          </div>
          <div className="why-section__card">
            <LandingPageCard
              title="Track without the guilt"
              content="Focus on your progress, not just hitting
            perfect streaks."
            />
            <LandingPageCard
              title="A calming, beautiful experience"
              content="Because habit-tracking should feel
            rewarding, not stressful."
            />
          </div>
        </div>
        <p className="why-section__catch-phrase">
          Rootinely isn’t just about habits—it’s about growth.
        </p>
      </div>
    </div>
  );
}

export default WhySection;
