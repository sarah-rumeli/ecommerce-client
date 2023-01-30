import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

export const CartContext = createContext();

function CartProviderWrapper({ children }) {
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/api/cart/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(({ data }) => setCartItems(data))
        .catch((error) => console.error(error));
    }
  }, [user]);

  function addToCart(item) {
    if (!item) return;
    const { name, _id, price, quantity = 1 } = item.product;
    const newProduct = { name, _id, price, quantity, userId: user._id };
    const existingProductIndex = cartItems.findIndex(
      (product) => product._id === _id && product.userId === user._id
    );
    if (existingProductIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingProductIndex].quantity += 1;
        setCartItems(updatedCartItems);
    } else {
        const updatedCartItems = {
            ...cartItems,
            products: [...cartItems.products, newProduct]
          };
        setCartItems({ ...cartItems, products: updatedCartItems });
    }
  }

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
