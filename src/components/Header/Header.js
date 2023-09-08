import "./Header.css";

function Header() {
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <div>
            <img
              src={require("../../Images/Logo.svg").default}
              alt="App logo"
            />
          </div>
          <div>date</div>
        </div>

        <div className="header__profile">
          <div>
            <button type="text"> + Add New Clothes</button>
          </div>
          <div>Matthew Sanchez</div>
          <div>
            <img
              src={require("../../Images/Avatar.svg").default}
              alt="Avatar icon"
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
