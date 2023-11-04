import "./Header.css";
import logo from "../../images/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({ onOpenModal, userLocation, onSignUp, onLogin, loggedIn }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  const currentAvatar = currentUser.avatar !== "" ? true : false;

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="App logo" />
        </Link>

        <p className="header__date">
          {currentDate}, {userLocation}
        </p>
      </div>

      <div className="header__profile">
        <ToggleSwitch />
        {loggedIn ? (
          <>
            <div>
              <button
                className="header__add-btn"
                type="text"
                onClick={onOpenModal}
              >
                + Add Clothes
              </button>
            </div>
            <Link to="/profile">
              <div className="header__name">{currentUser.name}</div>
            </Link>
            {currentAvatar ? (
              <div>
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="Avatar icon"
                />
              </div>
            ) : (
              <p className="header__avatar-default">
                {currentUser.name[0].toUpperCase()}
              </p>
            )}
          </>
        ) : (
          <>
            <button
              className="header__register-btn"
              type="button"
              onClick={onSignUp}
            >
              Sign Up
            </button>
            <button
              className="header__login-btn"
              type="button"
              onClick={onLogin}
            >
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
