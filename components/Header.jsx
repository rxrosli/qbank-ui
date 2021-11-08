import React from "react";
import Icon from "./Icon";

const Header = ({ headerText, setActive }) => {
  return (
    <header className="header">
      <Icon
        className="icon"
        name="menu"
        image="icons/hamburger.svg"
        onClick={() => setActive(true)}
      />
      <div className="title">{headerText}</div>
    </header>
  );
};

export default Header;
