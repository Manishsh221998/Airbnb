import React from "react";
import { stays } from "../../db/data";
import { Container } from "@mui/material";

const PlacesList = () => {
  return (
     <div style={{ display: "flex",justifyContent:'center', flexWrap: "wrap", gap: "25px",marginTop:'180px',marginBottom:'20px', }}>
      {stays.slice(0,28).map((place, index) => (
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
<div className="" style={{marginTop:'5px'}}>
          <h3 style={{fontWeight:500}}>{place.title}</h3>
          <hr style={{color:'GrayText'}}/>
          <p style={{marginTop:'2px'}}>{place.price}</p>
          </div>
        </div>
      ))}
    </div>
   );
};

export default PlacesList;
