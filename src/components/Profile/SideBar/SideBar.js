import "./SideBar.css";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { useContext } from "react";

const SideBar = ({ onChangeProfile, onLogout }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div>
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="Avatar icon"
        />
      </div>
      <p className="sidebar__name">{currentUser.name}</p>
      <div>
        <button
          className="sidebar__edit-btn"
          type="button"
          onClick={onChangeProfile}
        >
          Change Profile Data
        </button>
        <button
          className="sidebar__logout-btn"
          type="button"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
