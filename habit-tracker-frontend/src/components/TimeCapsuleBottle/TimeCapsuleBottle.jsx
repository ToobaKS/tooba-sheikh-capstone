import "./TimeCapsuleBottle.scss";
import bottleImg from "../../assets/images/43.png";

function TimeCapsuleBottle({ onClick }) {
    return (
      <img
        src={bottleImg}
        alt="Time Capsule Bottle"
        className="bottle"
        onClick={onClick}
      />
    );
  }

export default TimeCapsuleBottle;
