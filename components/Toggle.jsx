import React from "react";

const Toggle = ({ isActive, onClick }) => {
  return (
    <div className={isActive ? "toggle is-active" : "toggle"} onClick={onClick}>
      <span className="slider" />
    </div>
  );
};

export default Toggle;
