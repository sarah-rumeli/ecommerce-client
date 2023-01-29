import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function CartPage() {
  const { user, isLoading } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const storedToken = localStorage.getItem("authToken");
  const headers = { Authorization: `Bearer ${storedToken}` };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/cart/${user}`, { headers })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <div>
      <h1>Cart Page</h1>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {cartItems.map((cartDetails) => {
            return (
              <div className="Cart" key={cartDetails._id}>
                <h3>Cart Id : {cartDetails._id}</h3>
                <p>
                  <div>
                    <h5>Product Name: {cartDetails.name}</h5>
                    <h5>Quantity:{cartDetails.quantity}</h5>
                  </div>
                </p>
                <h3>Total Price:{cartDetails.totalPrice}</h3>

                <Link to="/products">
                  <button>Continue Shopping</button>
                </Link>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default CartPage;
