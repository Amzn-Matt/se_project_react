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
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Profile from "../Profile/Profile";
import { defaultClothingItems } from "../../utils/Constants";
import AddItemModal from "../AddItemModal/AddItemModal";

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

  const onAddItem = (e, values) => {
    e.preventDefault();
    console.log(e);
    console.log(values);
    handleCloseModal();
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

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onOpenModal={handleOpenModal} userLocation={location} />
        <Switch>
          <Route exact path="/">
            <Main onSelectCard={handleSelectedCard} weatherTemp={temp} />
          </Route>
          <Route path="/profile">
            <Profile
              defaultClothingItems={defaultClothingItems}
              onSelectCard={handleSelectedCard}
              onOpenModal={handleOpenModal}
            />
          </Route>
        </Switch>
        {activeModal === "open" && (
          <AddItemModal
            isOpen={activeModal === "open"}
            onCloseModal={handleCloseModal}
            onAddItem={onAddItem}
          />
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
