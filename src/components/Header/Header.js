import "./Header.css";
import logo from "../../images/Logo.svg";
import avatar from "../../images/Avatar.svg";

function Header({ onOpenModal, userLocation }) {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="App logo" />

        <p className="header__date">September 10, {userLocation}</p>
      </div>

      <div className="header__profile">
        <div>
          <button className="header__add-btn" type="text" onClick={onOpenModal}>
            + Add Clothes
          </button>
        </div>
        <div>Matthew Sanchez</div>
        <div>
          <img src={avatar} alt="Avatar icon" />
        </div>
      </div>
    </header>
  );
}

export default Header;
