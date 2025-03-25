import { useEffect, useState } from "react";
import TimeCapsuleBottle from "../../components/TimeCapsuleBottle/TimeCapsuleBottle";
import TimeCapsuleModal from "../../components/TimeCapsuleModal/TimeCapsuleModal";
import girl from "../../assets/gifs/71.gif";
import map from "../../assets/images/87.png";
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
      <div className="time-capsule-page__main">
        <form className="time-capsule-page__form" onSubmit={handleFormSubmit}>
          <h2 className="time-capsule-page__subtitle">Create Capsule:</h2>
          <label className="time-capsule-page__label">Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="time-capsule-page__input time-capsule-page__input--title"
          />

          <label className="time-capsule-page__label">Message:</label>
          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleInputChange}
            required
            className="time-capsule-page__input time-capsule-page__input--text"
          ></textarea>

          <label className="time-capsule-page__label">Unlock Date:</label>
          <input
            type="date"
            name="unlock_date"
            value={formData.unlock_date}
            onChange={handleInputChange}
            required
            className="time-capsule-page__input time-capsule-page__input--date"
          />

          <button className="time-capsule-page__button" type="submit">
            Create
          </button>
        </form>
        <div className="time-capsule-page__description">
          <h3 className="time-capsule-page__description-title">
            What’s a Time Capsule?
          </h3>
          <p className="time-capsule-page__description-text">
            ✨ <strong>Preserve your present for the future.</strong>
            <br />
            Write a message to your future self or someone you love. Choose a
            date, seal it in a capsule, and return when the time is right. ⏳💌
          </p>
        </div>
      </div>
      <div className="time-capsule-page__bottles">
        {capsules.map((capsule, index) => (
          <TimeCapsuleBottle
            key={capsule.id}
            onClick={() => handleBottleClick(capsule)}
            index={index}
          />
        ))}
        <div className="time-capsule-page__decor-wrapper">
          <img className="time-capsule-page__girl" src={girl} alt="girl" />
          <img className="time-capsule-page__map" src={map} alt="girl" />
        </div>
      </div>

      <Modal
        isOpen={!!selectedCapsule}
        onRequestClose={closeModal}
        className="capsule-modal__container"
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
