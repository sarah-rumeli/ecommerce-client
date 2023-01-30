import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export const CartContext = createContext();
const API_URL = "http://localhost:5005";

function CartProviderWrapper(props) {
  console.log("************* cart.context.js ***************");
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  //if (user) {
  //  console.log("user._id: ", user._id);
  //}
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);

  

  useEffect(() => {
    if(user){
      // Fetch the user's cart data from the server
      axios
       .get(`${process.env.REACT_APP_API_URL}/api/cart/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(res => {
          setCartItems(res.data);
          //console.log("cartItems:", res.data);
        })
        .catch(error => console.log(error));
    }
   
  }, [user]);
  
  function addToCart(item) {
    //console.log("item: ", item);
    //console.log(typeof item);
    if (!item) {
        //console.log('item undefined');
    } else {
        const { name, _id, price, quantity=1 } = item.product;
        const newProduct = {name, _id, price, quantity}

        //console.log("addToCart product: ", newProduct);

        const {products} = cartItems;
        //console.log("products from cartItems? ", products);
        //console.log(typeof products);
        const existingProduct = products.find(product => product._id === _id);
        //console.log('existingProduct: ', existingProduct);
        if (existingProduct) {
            existingProduct.quantity += 1;
            setCartItems([...cartItems]);
        } else {
            setCartItems([...cartItems, newProduct]);
        }
    }
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
