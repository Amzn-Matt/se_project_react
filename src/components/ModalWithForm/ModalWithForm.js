import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  onCloseModal,
  isOpen,
  onSubmit,
  altButtonText,
  onAltButton,
}) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__container">
        <button className="modal__close" type="button" onClick={onCloseModal} />
        <h3 className="modal__form-title">{title}</h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__button-wrapper">
            <button className="modal__submit-btn" type="submit">
              {buttonText}
            </button>
            <button
              className="modal__alt-btn"
              type="button"
              onClick={onAltButton}
            >
              {altButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
