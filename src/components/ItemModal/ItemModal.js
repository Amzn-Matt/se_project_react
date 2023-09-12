import "./ItemModal.css";

function ItemModal({ selectedCard, onCloseModal }) {
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
          src={selectedCard.link}
          alt={selectedCard.name}
        />
        <p className="modal__preview-name">{selectedCard.name}</p>
        <p className="modal__preview-type"> Weather: {selectedCard.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
