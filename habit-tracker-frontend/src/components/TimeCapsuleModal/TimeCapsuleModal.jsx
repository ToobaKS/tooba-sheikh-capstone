import { useEffect, useState } from "react";
import "./TimeCapsuleModal.scss";

function TimeCapsuleModal({ capsule, onClose }) {
  const [countdown, setCountdown] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const unlock = new Date(capsule.unlock_date);
      const distance = unlock - now;

      if (distance <= 0) {
        clearInterval(interval);
        setIsUnlocked(true);
        setCountdown("Unlocked!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [capsule.unlock_date]);

  return (
    <div className="capsule-modal">
      <button className="capsule-modal__close" onClick={onClose}>
        &times;
      </button>
      <h2 className="capsule-modal__title">{capsule.title}</h2>

      {isUnlocked ? (
        <p className="capsule-modal__message">{capsule.message}</p>
      ) : (
        <p className="capsule-modal__locked-message">
          🔒 Locked until unlock date!
        </p>
      )}

      <p className="capsule-modal__unlock">
        Opens on:{" "}
        <span>
          {new Date(capsule.unlock_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </p>

      {!isUnlocked && (
        <p className="capsule-modal__countdown">Countdown: {countdown}</p>
      )}
    </div>
  );
}

export default TimeCapsuleModal;
