import React from "react";
import "./CardFeature.css";

function CardFeature({ title, description, status, link, imageUrl }) {
  return (
    <a href={link} className={`cardfeature ${status === "comingsoon" ? "comingsoon" : ""}`}>
      <img src={imageUrl} alt={title} />
      <h3 className="cardfeature-title">{title}</h3>
      <p className="cardfeature-description">{description}</p>
      <p className="cardfeature-status">{status}</p>
    </a>
  );
}

export default CardFeature;
