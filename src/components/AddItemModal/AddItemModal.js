import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setimageUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weatherType });
  };

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setimageUrl("");
      setWeatherType("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
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
          value={imageUrl}
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
