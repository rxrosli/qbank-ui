import React from "react";
import Icon from "./Icon";

const Navigation = ({ isActive, setActive }) => {
  return (
    <nav className={isActive ? "nav is-active" : "nav"}>
      <div className="top-flex">
        <Icon
          alt="collapse"
          className="icon"
          image="icons/chevron_duo_left.svg"
          onClick={() => setActive(!isActive)}
        />
        <Icon className="icon" alt="create-question" image="icons/plus.svg" />
        <Icon className="icon" alt="search-question" image="icons/search.svg" />
      </div>
      <div className="bottom-flex">
        <Icon
          className="icon"
          alt="settings"
          image="icons/settings_filled.svg"
        />
      </div>
    </nav>
  );
};

export default Navigation;
