import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import {
  getWeatherApi,
  parseWeatherData,
  parseLocationData,
} from "../../utils/WeatherApi";
import { useEffect, useState } from "react";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const handleOpenModal = () => {
    setActiveModal("open");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeatherApi().then((data) => {
      const temperature = parseWeatherData(data);
      setTemp(temperature);
      const locationData = parseLocationData(data);
      setLocation(locationData);
    });
  }, []);

  return (
    <div>
      <Header onOpenModal={handleOpenModal} userLocation={location} />
      <Main onSelectCard={handleSelectedCard} weatherTemp={temp} />
      {activeModal === "open" && (
        <ModalWithForm title="New garment" onCloseModal={handleCloseModal}>
          <label className="modal__form-label">
            Name
            <input
              className="modal__form-input"
              type="text"
              name="name"
              minLength="1"
              maxLength="100"
              placeholder="Name"
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
              required
            />
          </label>
          <p className="modal__form-subtitle">Select the weather type:</p>
          <div>
            <div>
              <input
                className="modal__form-radio"
                type="radio"
                id="hot"
                value="hot"
              />
              <label>Hot</label>
            </div>

            <div>
              <input
                className="modal__form-radio"
                type="radio"
                id="warm"
                value="warm"
              />
              <label>Warm</label>
            </div>

            <div>
              <input
                className="modal__form-radio"
                type="radio"
                id="cold"
                value="cold"
              />
              <label>Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          onCloseModal={handleCloseModal}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
