import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText = "Add garment",
  title,
  name,
  onCloseModal,
}) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__container">
        <button type="button" onClick={onCloseModal}></button>
        <h3>{title}</h3>
        <form>{children}</form>
        <button type="submit">{buttonText}</button>
      </div>
    </div>
  );
}

export default ModalWithForm;
