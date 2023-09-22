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
  // parseForcastData,
} from "../../utils/WeatherApi";
import { useEffect, useState } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  // const [forcast, setForcast] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeatherApi()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        const locationData = parseLocationData(data);
        setLocation(locationData);
        // const forcastData = parseForcastData(data);
        // setForcast(forcastData);
        // console.log(forcastData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(currentTemperatureUnit);

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
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
            <div className="modal__form-radio-inputs">
              <div>
                <label>
                  <input
                    className="modal__form-radio-btn"
                    type="radio"
                    id="hot"
                    value="hot"
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
                  />
                  Cold
                </label>
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
