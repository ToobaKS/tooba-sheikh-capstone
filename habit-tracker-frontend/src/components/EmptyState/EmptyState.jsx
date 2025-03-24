import "./EmptyState.scss";
import bouncey from "../../assets/gifs/49.gif";

function EmptyState({
  message = "No habits yet!",
  cta = "Add your first habit 🌱",
  onClick,
}) {
  return (
    <div className="empty-state">
      <img src={bouncey} alt="Bouncy plant" className="empty-state__gif" />
      <h2 className="empty-state__message">{message}</h2>
      <button className="empty-state__cta" onClick={onClick}>
        {cta}
      </button>
    </div>
  );
}

export default EmptyState;
