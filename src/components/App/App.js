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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import {
  getClothingItems,
  addNewClothingItem,
  deleteClothingItems,
} from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

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
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleOpenModal = () => {
    setActiveModal("open");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleOpenConfirmationModal = () => {
    setActiveModal("confirm");
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("register");
  };

  const handleOpenLoginModal = () => {
    setActiveModal("login");
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

  const handleSignUp = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then((user) => {
        setCurrentUser(user);
        localStorage.setItem("jwt", user.token);
        setLoggedIn(true);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        setLoggedIn(true);
        console.log(res.data);
        setCurrentUser(res.data);
        localStorage.setItem("jwt", res.token);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
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
        const newItem = clothingItems?.filter((item) => {
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
      .then((res) => {
        setClothingItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res.data);
            setLoggedIn(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          onOpenModal={handleOpenModal}
          userLocation={location}
          onSignUp={handleOpenRegisterModal}
          onLogin={handleOpenLoginModal}
          loggedIn={loggedIn}
        />
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
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              clothingItems={clothingItems}
              onSelectCard={handleSelectedCard}
              onOpenModal={handleOpenModal}
            />
          </ProtectedRoute>
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
        {activeModal === "register" && (
          <RegisterModal
            onCloseModal={handleCloseModal}
            buttonText={"Next"}
            onSignUp={handleSignUp}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            onCloseModal={handleCloseModal}
            buttonText={"Login"}
            onLogin={handleLogin}
          />
        )}
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
