import "./TimeCapsuleBottle.scss";
import bottleImg from "../../assets/images/43.png";

function TimeCapsuleBottle({ onClick, index }) {
  return (
    <div className="bottle-wrapper">
      <img
        src={bottleImg}
        alt="Time Capsule Bottle"
        className="bottle-wrapper__img"
        onClick={onClick}
        style={{ animationDelay: `${index * 1.5}s` }}
      />
    </div>
  );
}

export default TimeCapsuleBottle;
