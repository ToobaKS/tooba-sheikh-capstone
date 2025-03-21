import "./AccessCard.scss";

function AccessCard({title, children}) {
  return (
    <div className="access-card">
      <h2 className="access-card__title">Rootinely</h2>
      {children}
    </div>
  );
}

export default AccessCard;