import css from "./ImageModal.module.css";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export default function ImageModal({ image, onClose }) {
  if (!image || !image.urls || !image.urls.full) return null;

  return (
    <ReactModal
      isOpen={!!image}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img src={image.urls.full} alt={image.alt_description || image} />
    </ReactModal>
  );
}
