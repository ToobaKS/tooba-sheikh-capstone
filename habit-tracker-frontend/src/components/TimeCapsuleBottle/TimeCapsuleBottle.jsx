import "./TimeCapsuleBottle.scss";
import bottleImg from "../../assets/images/43.png";

function TimeCapsuleBottle({ onClick }) {
  return (
    <div className="bottle" onClick={onClick}>
      <img
        src={bottleImg}
        alt="Time Capsule Bottle"
        className="bottle__img"
      />
    </div>
  );
}

export default TimeCapsuleBottle;
