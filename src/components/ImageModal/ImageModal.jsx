import css from "./ImageModal.module.css";

export default function ImageModal({ image, onClose }) {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={css.modal}>
        <img src={image.urls.regular} alt={image.alt_description} />
      </div>
    </div>
  );
}
