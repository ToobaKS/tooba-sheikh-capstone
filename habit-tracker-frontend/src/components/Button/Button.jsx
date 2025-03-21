import { useNavigate } from "react-router-dom";
import "./Button.scss";

function SButton({ path, label }) {
  const navigate = useNavigate();

  return (
    <button className="button-link" onClick={() => navigate(path)}>
      {label}
    </button>
  );
}

export default SButton;
