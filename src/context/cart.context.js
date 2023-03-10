import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

export const CartContext = createContext();

function CartProviderWrapper({ children }) {
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState({
    _id: "",
    name: "",
    price: 0,
    quantity: 0,
  });
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

  // add an item to user cart
  function addToCart(item) {
    if (!item) {
      // item not passed, will return 'undefined'
      return;
    } else {
      const { name, _id, price, quantity = 1, img } = item.product;
      const newProduct = { name, _id, price, quantity, img };
      // check if user cart exists, if not add this 1st product
      if (cartItems.length === 0) {
        setCartItems([{ products: [newProduct] }]);
      } else {
        // user cart exists, check if this product is in the cart
        // if not, add it, otherwise increment existing product quantity
        const { products } = cartItems[0];
        const [existingCart] = cartItems;
        const existingProduct = products.find((product) => product._id === _id);
        if (existingProduct) {
          existingProduct.quantity += 1; // Product exists, increment quantity...
          setCartItems([...cartItems]);
        } else {
            setCartItems([
              {
                ...existingCart,
                products: [...existingCart.products, newProduct],
              },
            ]);
        }
      }
    }
  }

  // when user clicks 'remove' from cart, only remove that product
  function removeFromCart(productId) {
    const { products } = cartItems[0];
    if (!productId) {
      // item not passed, will return 'undefined'
      return;
    } else {
      const existingProduct = products.find((product) => product._id === productId);
      const updatedCart = cartItems[0].products.filter((product) => product._id !== productId);
      setCartItems([{ ...cartItems[0], products: updatedCart}]);
    }
  }

  // remove all items from the cart when user clicks on 'checkout'
  function emptyCart() {
    setCartItems([{ products: [] }]);
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartProviderWrapper };