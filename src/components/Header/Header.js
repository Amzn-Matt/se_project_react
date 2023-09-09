import "./Header.css";

function Header({ onOpenModal }) {
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <div>
            <img
              src={require("../../images/Logo.svg").default}
              alt="App logo"
            />
          </div>
          <div>date</div>
        </div>

        <div className="header__profile">
          <div>
            <button type="text" onClick={onOpenModal}>
              + Add New Clothes
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
    </div>
  );
}

export default Header;
