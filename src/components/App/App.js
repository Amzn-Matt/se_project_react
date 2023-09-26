import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import {
  getWeatherApi,
  parseWeatherData,
  parseLocationData,
  parseForcastData,
  parseTimeOfDay,
} from "../../utils/WeatherApi";
import { useEffect, useState } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import {
  getClothingItems,
  addNewClothingItem,
  deleteClothingItems,
} from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [forcast, setForcast] = useState({});
  const [day, setDay] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setActiveModal("open");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleOpenConfirmationModal = () => {
    setActiveModal("confirm");
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

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleAddNewItemSubmit = (values) => {
    const item = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weatherType,
    };
    const newClothesRequest = () => {
      return addNewClothingItem(item).then((item) => {
        setClothingItems([item, ...clothingItems]);
      });
    };
    handleSubmit(newClothesRequest);
  };

  const handleDeleteItemSubmit = (selectedCard) => {
    const deleteCardRequest = () => {
      return deleteClothingItems(selectedCard).then(() => {
        const newItem = clothingItems.filter((item) => {
          return item._id !== selectedCard;
        });
        setClothingItems(newItem);
      });
    };
    handleSubmit(deleteCardRequest);
  };

  useEffect(() => {
    getWeatherApi()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        const locationData = parseLocationData(data);
        setLocation(locationData);
        const forcastData = parseForcastData(data);
        setForcast(forcastData);
        console.log(forcastData);
        const currentTimeOfDay = parseTimeOfDay(data);
        setDay(currentTimeOfDay);
        console.log(currentTimeOfDay);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header onOpenModal={handleOpenModal} userLocation={location} />
      <Switch>
        <Route exact path="/">
          <Main
            onSelectCard={handleSelectedCard}
            weatherTemp={temp}
            clothingItems={clothingItems}
            type={forcast}
            day={day}
          />
        </Route>
        <Route path="/profile">
          <Profile
            clothingItems={clothingItems}
            onSelectCard={handleSelectedCard}
            onOpenModal={handleOpenModal}
          />
        </Route>
      </Switch>
      {activeModal === "open" && (
        <AddItemModal
          isOpen={activeModal === "open"}
          onCloseModal={handleCloseModal}
          onAddItem={handleAddNewItemSubmit}
          buttonText={isLoading ? "Saving..." : "Add garment"}
        />
      )}
      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          onCloseModal={handleCloseModal}
          handleDeleteButton={handleOpenConfirmationModal}
        />
      )}
      {activeModal === "confirm" && (
        <ConfirmationModal
          selectedCard={selectedCard}
          onCloseModal={handleCloseModal}
          onDeleteItem={handleDeleteItemSubmit}
          buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
        />
      )}
      <Footer />
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
