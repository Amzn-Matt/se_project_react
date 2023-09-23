import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    console.log(e.target.value);
    setWeatherType(e.target.value);
  };

  return (
    <ModalWithForm
      title="New garment"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={(e) => onAddItem(e, { name, url, weatherType })}
    >
      <label className="modal__form-label">
        Name
        <input
          className="modal__form-input"
          type="text"
          name="name"
          minLength="1"
          maxLength="100"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>

      <label className="modal__form-label">
        Image
        <input
          className="modal__form-input"
          type="url"
          name="link"
          placeholder="Image URL"
          value={url}
          onChange={handleUrlChange}
          required
        />
      </label>
      <p className="modal__form-subtitle">Select the weather type:</p>
      <div className="modal__form-radio-inputs">
        <div>
          <label>
            <input
              className="modal__form-radio-btn"
              type="radio"
              id="hot"
              value="hot"
              onChange={handleWeatherTypeChange}
            />
            Hot
          </label>
        </div>

        <div>
          <label>
            <input
              className="modal__form-radio-btn"
              type="radio"
              id="warm"
              value="warm"
              onChange={handleWeatherTypeChange}
            />
            Warm
          </label>
        </div>

        <div>
          <label>
            <input
              className="modal__form-radio-btn"
              type="radio"
              id="cold"
              value="cold"
              onChange={handleWeatherTypeChange}
            />
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
