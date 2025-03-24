// HabitFormModal.jsx
import Modal from "react-modal";
import HabitForm from "../HabitForm/HabitForm";
import "./HabitFormModal.scss";

Modal.setAppElement("#root");

function HabitFormModal({ isOpen, onClose, onSubmit, initialData = null }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="habit-form-modal"
      overlayClassName="habit-form-overlay"
    >
      <button className="habit-form-modal__close" onClick={onClose}>
        &times;
      </button>
      <HabitForm onSubmit={onSubmit} initialData={initialData} />
    </Modal>
  );
}

export default HabitFormModal;
