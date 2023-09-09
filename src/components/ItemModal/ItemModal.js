import "./ItemModal.css";

function ItemModal({ selectedCard, onCloseModal }) {
  return (
    <div className={`modal`}>
      <button type="button" onClick={onCloseModal}></button>
      <div className="modal__container">
        <img src={selectedCard.link} />
        <p>{selectedCard.name}</p>
        <p>{selectedCard.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
