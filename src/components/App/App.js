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
import {
  Route,
  Switch,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../Profile/EditProfileModal/EditProfileModal";
import {
  getClothingItems,
  addNewClothingItem,
  deleteClothingItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, checkToken, editProfile } from "../../utils/auth";
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
  const history = useHistory();

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

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit");
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
        const token = res.token;
        localStorage.setItem("jwt", res.token);
        return checkToken(token).then((data) => {
          const user = data.data;
          setLoggedIn(true);
          setCurrentUser(user);
          handleCloseModal();
          history.push("/profile");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    setCurrentUser("");
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  };

  const handleAddNewItemSubmit = (values) => {
    const item = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weatherType,
    };
    const newClothesRequest = () => {
      return addNewClothingItem(item).then((item) => {
        setClothingItems([item.data, ...clothingItems]);
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

  const handleEditProfileSubmit = (data) => {
    editProfile(data)
      .then((res) => {
        setCurrentUser(res.data);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLikeClick = ({ id, isLiked, currentUser }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        // the first argument is the card's id
        addCardLike(id, currentUser, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        // the first argument is the card's id
        removeCardLike(id, currentUser, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err));
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
              onCardLike={handleLikeClick}
              isLoggedIn={loggedIn}
            />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              clothingItems={clothingItems}
              onSelectCard={handleSelectedCard}
              onOpenModal={handleOpenModal}
              onEditProfile={handleOpenEditProfileModal}
              onLogout={handleLogout}
              isLoggedIn={loggedIn}
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
        {activeModal === "edit" && (
          <EditProfileModal
            isOpen={activeModal === "edit"}
            onCloseModal={handleCloseModal}
            handleEditProfile={handleEditProfileSubmit}
            buttonText={"Save changes"}
          />
        )}
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
