import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export const CartContext = createContext();
const API_URL = "http://localhost:5005";

function CartProviderWrapper(props) {
  console.log("************* cart.context.js ***************");
  const storedToken = localStorage.getItem("authToken");
  console.log("storedToken: ", storedToken);
  const { user } = useContext(AuthContext);
  if (user) {
    console.log("user._id: ", user._id);
  }
  
  //const userId = user._id;
  //console.log("userId: ", userId);
  const [cartItems, setCartItems] = useState([]);
  

  useEffect(() => {
    if(user){
      // Fetch the user's cart data from the server
      axios
       .get(`${API_URL}/api/cart/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(res => {
          //if (res.data) {
            setCartItems(res.data);
            console.log("setCartItems(res.data) aka cartItems:", res.data);
          //} else {
          //  setCartItems("");
            //console.log(res.data.message);
          //}
        })
        .catch(error => console.log(error));
    }
   
  }, [user]);

  function addToCart(item) {
    setCartItems([...cartItems, item]);
  }

  function removeFromCart(item) {
    setCartItems(cartItems.filter(i => i !== item));
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProviderWrapper };
