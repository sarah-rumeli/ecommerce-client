import React, { useState } from "react";
import "../App.css";

function StarRating(props) {
    
    const [rating, setRating] = useState(props.rating);
   
   
        props.ratingSetter(rating);       
    
    return (
        <div className="star-rating">
          {[...Array(5)].map((star,index) => {    
            index += 1;    
            return (    
                <button 
            type="button"
            key={index}
            className={index <= rating ? "Stars_on" : "Stars_off"}
            onClick={() => setRating(index)}
          >     
              <span className="star-text">&#9733;</span>       
              </button> 
            );
          })}
        </div>
      );


}

export default StarRating;