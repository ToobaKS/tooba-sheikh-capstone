import Modal from "react-modal";
import "./DeleteHabitModal.scss";

function DeleteHabitModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="delete-modal"
      overlayClassName="delete-modal__overlay"
      ariaHideApp={false}
    >
      <div className="delete-modal__content">
        <h2 className="delete-modal__title">Delete Habit?</h2>
        <p className="delete-modal__text">
          Are you sure you want to delete this habit? This action cannot be
          undone.
        </p>
        <div className="delete-modal__buttons">
          <button className="delete-modal__cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-modal__confirm" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteHabitModal;
