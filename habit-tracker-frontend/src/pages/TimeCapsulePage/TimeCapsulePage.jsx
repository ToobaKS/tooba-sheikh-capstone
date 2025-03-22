import { useState } from "react";
import TimeCapsuleBottle from "../../components/TimeCapsuleBottle";
import TimeCapsuleModal from "../../components/TimeCapsuleModal";
import "./TimeCapsulePage.scss";

const mockCapsules = [
  {
    id: 1,
    title: "Letter to Future Me",
    message: "You're doing amazing, keep going 💌",
    openDate: "2025-06-01",
  },
  {
    id: 2,
    title: "Graduation Goals",
    message: "Hope you crushed it 🎓",
    openDate: "2025-09-15",
  },
];

function TimeCapsulePage() {
  const [selectedCapsule, setSelectedCapsule] = useState(null);

  const handleBottleClick = (capsule) => {
    setSelectedCapsule(capsule);
  };

  const closeModal = () => {
    setSelectedCapsule(null);
  };

  return (
    <div className="time-capsule-page">
      <h1 className="time-capsule-page__title">My Time Capsules</h1>

      <div className="time-capsule-page__bottles">
        {mockCapsules.map((capsule) => (
          <TimeCapsuleBottle
            key={capsule.id}
            onClick={() => handleBottleClick(capsule)}
          />
        ))}
      </div>

      {selectedCapsule && (
        <TimeCapsuleModal capsule={selectedCapsule} onClose={closeModal} />
      )}
    </div>
  );
}

export default TimeCapsulePage;
