import React, { useState } from "react";
import "../App.css";

function StarRating(props) {     
    
    return (
        <div className="star-rating">
          {[...Array(5)].map((star,index) => {    
            index += 1;    
            return (    
                <button 
            type="button"
            key={index}
            className={index <= props.rating ? "Stars_on" : "Stars_off"}
            onClick={() => {
              props.ratingSetter(index);
              }}
          >     
              <span className="star-text">&#9733;</span>       
              </button> 
            );
          })}
        </div>
      );


}

export default StarRating;