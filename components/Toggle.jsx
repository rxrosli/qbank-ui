import React from "react";

const Toggle = ({ isActive, setActive }) => {
  return (
    <div className={isActive ? "toggle is-active" : "toggle"}>
      <span className="slider" />
    </div>
  );
};

export default Toggle;
