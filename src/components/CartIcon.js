import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { CartContext } from "../context/cart.context";

function CartIcon() {
  const { itemCount, cartItems } = useContext;(CartContext);
  console.log("CartIcon.js: itemCount: ", itemCount);
  
  return (
    <Link className="cart-icon" to="/cart">
      <img src='https://res.cloudinary.com/dq4j6xfee/image/upload/v1674855409/ecommerce/eo4ybyzrcpoyevhqurfj.png' />
      {
        itemCount > 0 ? <span className="cart-count">{ itemCount }</span> : null
      }
      
    </Link>
  );
}

export default CartIcon;