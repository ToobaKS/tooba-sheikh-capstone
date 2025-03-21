import "./Button.scss";

function SButton({ label, handleSubmit }) {
  return (
    <button className="button-link" onClick={(e) => handleSubmit(e)}>
      {label}
    </button>
  );
}

export default SButton;
