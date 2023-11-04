import "./SideBar.css";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { useContext } from "react";

const SideBar = ({ onEditProfile, onLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentAvatar = currentUser.avatar !== "" ? true : false;

  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        {currentAvatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="Avatar icon"
          />
        ) : (
          <p className="sidebar__avatar-default">
            {currentUser.name[0].toUpperCase()}
          </p>
        )}
        <p className="sidebar__name">{currentUser.name}</p>
      </div>
      <div className="sidebar__profile-manager">
        <button
          className="sidebar__edit-btn"
          type="button"
          onClick={onEditProfile}
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
