// TimeCapsulePage.jsx
import { useEffect, useState } from "react";
import TimeCapsuleBottle from "../../components/TimeCapsuleBottle/TimeCapsuleBottle";
import TimeCapsuleModal from "../../components/TimeCapsuleModal/TimeCapsuleModal";
import Modal from "react-modal";
import { fetchTimeCapsules, createTimeCapsule } from "../../util/api";
import "./TimeCapsulePage.scss";

Modal.setAppElement("#root");

function TimeCapsulePage() {
  const [capsules, setCapsules] = useState([]);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    unlock_date: "",
  });

  useEffect(() => {
    const getTimeCapsules = async () => {
      try {
        const data = await fetchTimeCapsules();
        setCapsules(data);
      } catch (error) {
        console.error("Failed to fetch capsules:", error);
      }
    };
    getTimeCapsules();
  }, []);

  const handleBottleClick = (capsule) => {
    setSelectedCapsule(capsule);
  };

  const closeModal = () => {
    setSelectedCapsule(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCapsule = await createTimeCapsule(formData);
      setCapsules((prev) => [...prev, newCapsule]);
      setFormData({ title: "", message: "", unlock_date: "" });
    } catch (error) {
      console.error("Failed to create capsule:", error);
    }
  };

  return (
    <div className="time-capsule-page">
      <h1 className="time-capsule-page__title">My Time Capsules</h1>

      <form className="capsule-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="message"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleInputChange}
          required
        ></textarea>
        <input
          type="date"
          name="unlock_date"
          value={formData.unlock_date}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create</button>
      </form>

      <div className="time-capsule-page__bottles">
        {capsules.map((capsule) => (
          <TimeCapsuleBottle
            key={capsule.id}
            onClick={() => handleBottleClick(capsule)}
          />
        ))}
      </div>

      <Modal
        isOpen={!!selectedCapsule}
        onRequestClose={closeModal}
        className="capsule-modal"
        overlayClassName="capsule-modal__overlay"
      >
        {selectedCapsule && (
          <TimeCapsuleModal capsule={selectedCapsule} onClose={closeModal} />
        )}
      </Modal>
    </div>
  );
}

export default TimeCapsulePage;
