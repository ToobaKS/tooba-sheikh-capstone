import "./TimeCapsuleModal.scss";

function TimeCapsuleModal({ capsule, onClose }) {
  console.log(capsule)
  return (
    <div className="capsule-modal">
      <button className="capsule-modal__close" onClick={onClose}>
        &times;
      </button>
      <h2 className="capsule-modal__title">{capsule.title}</h2>
      <p className="capsule-modal__message">{capsule.message}</p>
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
    </div>
  );
}

export default TimeCapsuleModal;
