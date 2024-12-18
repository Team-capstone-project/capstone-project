import React from "react";
import "./Alert.css";

const Alert = ({ message, buttons = [] }) => {
  return (
    <div className="alert-overlay">
      <div className="alert">
        <p>{message}</p>
        <div className="alert-buttons">
          {buttons.map((button, index) => (
            <button key={index} onClick={button.onClick} style={button.style || {}}>
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alert;