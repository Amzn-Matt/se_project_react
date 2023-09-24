import "./Header.css";
import logo from "../../images/Logo.svg";
import avatar from "../../images/Avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Header({ onOpenModal, userLocation }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        <div>
          <button className="header__add-btn" type="text" onClick={onOpenModal}>
            + Add Clothes
          </button>
        </div>
        <Link to="/profile">
          <div className="header__name">Matthew Sanchez</div>
        </Link>
        <div>
          <img src={avatar} alt="Avatar icon" />
        </div>
      </div>
    </header>
  );
}

export default Header;
