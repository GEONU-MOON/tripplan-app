import React from "react";
import { useSwipeable } from "react-swipeable";
import "../styles/SwipeModal.css";

const SwipeableModal = ({
  images,
  isOpen,
  onClose,
  currentIndex,
  setCurrentIndex,
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((currentIndex + 1) % images.length),
    onSwipedRight: () =>
      setCurrentIndex((currentIndex - 1 + images.length) % images.length),
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        {...handlers}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <button
          className="modal-prev"
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + images.length) % images.length)
          }
        >
          &lt;
        </button>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="modal-image"
        />
        <button
          className="modal-next"
          onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
        >
          &gt;
        </button>
        <div className="modal-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default SwipeableModal;
