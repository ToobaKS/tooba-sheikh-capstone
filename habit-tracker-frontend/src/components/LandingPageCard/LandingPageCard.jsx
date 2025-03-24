import "./LandingPageCard.scss";

function LandingPageCard({ title, content }) {
  return (
    <div className="landing-card">
      <h3 className="landing-card__title">{title}</h3>
      <p className="landing-card__content">{content}</p>
    </div>
  );
}

export default LandingPageCard;