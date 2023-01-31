import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

export const CartContext = createContext();

function CartProviderWrapper({ children }) {
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  //if (user) {
  //  console.log("user._id: ", user._id);
  //}
  const [cartItems, setCartItems] = useState({_id:"",name:"", price:0,quantity:0});
  const [quantity, setQuantity] = useState(0);


  

  useEffect(() => {
    if (user) {
      axios
       .get(`${process.env.REACT_APP_API_URL}/api/cart/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(({ data }) => setCartItems(data))
        .catch((error) => console.error(error));
    }
  }, [user]);
 

    function addToCart (item) {
      //console.log("item: ", item);
      //console.log(typeof item);
      if (!item) {
          //console.log('item undefined');
      } else {
          const { name, _id, price, quantity=1 } = item.product;
          const newProduct = {name, _id, price, quantity}
  
          console.log("addToCart product: ", newProduct);
  
          const {products} = cartItems[0];
          console.log("cartItems? ", cartItems);
          console.log("products from cartItems? ", products);
          //console.log(typeof products);
          const existingProduct = products.find(product => product._id === _id);
          //console.log('existingProduct: ', existingProduct);
          if (existingProduct) {
                existingProduct.quantity += 1;    
              console.log("from context",cartItems);
              setCartItems([...cartItems]);
          } else {
              const {products}= cartItems[0];
              setCartItems([...cartItems,{ products:{_id:_id,name:name, price:price,quantity:1}}]);
          }
      }
    }

    useEffect(() => {
      
  },[])
  
 


  function removeFromCart(item) {
    setCartItems(cartItems.filter((i) => i !== item));
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartProviderWrapper };
