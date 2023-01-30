import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import axios from "axios";
import Checkout from "./Checkout";

const API_URL = "http://localhost:5005";

function CartPage() {
  console.log("******** CartPage.js clg**********");
  const { isLoading } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const {user} = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const [userId , setUserId] = useState(user._id);
  const [notes, setNotes] = useState("");
const [total,setTotalPrice] = useState(0);
  const [status, setStatus] = useState("Awaiting Payment");
  const [message, setMessage] = useState(undefined); 
  const [orderId,setOrderId] = useState(""); 
  const navigate = useNavigate();
  let totalQuantity = 0;
  let totalPrice = 0;
  if (cartItems && cartItems.length > 0) {
    useEffect(() => {
      setProducts(cartItems[0].products);
    }, []);
    
    console.log("products: ", products);
    totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
    totalPrice = products.reduce((acc, product) => acc + (product.quantity * product.price), 0);
  }
 
  console.log("cartItems: ", cartItems);
  console.log("totalQuantity: ", totalQuantity);

const handleCheckout = (e) =>{
  e.preventDefault();

  const storedToken = localStorage.getItem('authToken');

  axios.get(`${process.env.REACT_APP_API_URL}/api/cart/${user._id}`,
  { headers: {Authorization: `Bearer ${storedToken}`} })
  .then((response)=>{
    const cart = response.data[0];
    console.log("to be ordered",cart);
      const total = cart.products.reduce((acc, product) => acc + (product.quantity * product.price), 0);
      const cartToOrder = {
          userId: cart.user,
          products: cart.products,
          status: "Awaiting Payment",
          totalPrice:total
      }
       return axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, cartToOrder, { headers: {Authorization: `Bearer ${storedToken}`} })

  })
  .then((responseFromOrder) => {
      console.log(responseFromOrder);
      
      return axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/remove/${user._id}`, { headers: {Authorization: `Bearer ${storedToken}`} })
  })
  .then(response => console.log(response.data.message))
  .catch(error => console.log(error));

navigate("/orders");
}


  return (
    <>
    <h1>Cart</h1>
    {!isLoading &&
      <div className="CartPage">
        {products.map((product) => {
          return (
            <div className="CartCard card" key={product.id}>
                <div>
                  <div>Product Name: {product.name} (€ {product.price} each)</div>
                  <div>Quantity:{product.quantity}</div>
                  <div> x </div>
                  <div>€ {(product.price * product.quantity)}</div>
                </div>
            </div>
          );
        })}
        <h3>Total € {totalPrice}</h3>
       
                  <button className="btn btn-secondary mb-3" type="submit" onClick={handleCheckout}>Checkout</button>
                  
      </div>
      
    
    }
   
    </>
  );
}

export default CartPage;
