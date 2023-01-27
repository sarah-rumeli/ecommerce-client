//Displays list of users' cart
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";

function DisplayCart() {
  const { isLoggedIn, user, logOutUser} = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const getCart = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cart/${user._id}`)
      .then((response) => setCart(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <h1>Cart Page</h1>
        
      {cart.map((cartDetails) => {
        return (
          <div className="Cart" key={cartDetails._id} >
            <h3>Cart Id : {cartDetails._id}</h3>
            <p>
            { cartDetails.products.map((x) =>{
              return (
                <div>
                  <h5>Product Name: {x.name}</h5>
                  <h5>Quantity:{x.quantity}</h5>
                </div>
              )
            })}
            </p>
            <h3>Total Price:{cartDetails.totalPrice}</h3>
    
            <Link to ="/orders"><button>Place Order</button></Link>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayCart;