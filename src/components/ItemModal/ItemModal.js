import "./ItemModal.css";

function ItemModal({ selectedCard, onCloseModal, onDeleteItem }) {
  const handleDeleteItemSubmit = () => {
    onDeleteItem(selectedCard._id);
  };

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
          className="modal__preview-delete-btn"
          onClick={handleDeleteItemSubmit}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
