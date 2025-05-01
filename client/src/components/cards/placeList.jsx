import React from "react";
import { stays } from "../../db/data";

const PlacesList = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
      {stays.map((place, index) => (
        <div key={index} style={{ width: "180px" }}>
          <img
            src={place.image[0]} // Use the first image from the array
            alt={place.title}
            style={{
              width: "100%",
              height: "180px",
              borderRadius: "10px",
            }}
          />
          <h3>{place.title}</h3>
          <p>{place.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PlacesList;
