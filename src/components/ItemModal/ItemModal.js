import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ selectedCard, onCloseModal, handleDeleteButton }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser._id;
  const deleteButtonClassName = `modal__preview-delete-btn ${
    isOwn
      ? `modal__preview-delete-btn_visible`
      : `modal__preview-delete-btn_hidden`
  }`;

  return (
    <div className={`modal`}>
      <div className="modal__preview-container">
        <button
          className="modal__preview-close-btn"
          type="button"
          onClick={onCloseModal}
        />
        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <p className="modal__preview-name">{selectedCard.name}</p>
        <p className="modal__preview-type"> Weather: {selectedCard.weather}</p>
        <button
          type="button"
          className={deleteButtonClassName}
          onClick={handleDeleteButton}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
