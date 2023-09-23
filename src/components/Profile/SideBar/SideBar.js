import "./SideBar.css";
import avatar from "../../../images/Avatar.svg";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div>
        <img className="sidebar__avatar" src={avatar} alt="Avatar icon" />
      </div>
      <p className="sidebar__name">Matthew Sanchez</p>
    </div>
  );
};

export default SideBar;
