import "./Header.css";

function Header({ onOpenModal, userLocation }) {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={require("../../images/Logo.svg").default} alt="App logo" />

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
          <img
            src={require("../../images/Avatar.svg").default}
            alt="Avatar icon"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
