import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText = "Add garment",
  title,
  name,
  onCloseModal,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__container">
        <button className="modal__close" type="button" onClick={onCloseModal} />
        <h3 className="modal__form-title">{title}</h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button className="modal__submit-btn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
