import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function AddOrder(props) {
  const {user} = useContext(AuthContext);

  const [userId , setUserId] = useState(user._id);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Awaiting Payment");
  const [message, setMessage] = useState(undefined); 
 // const [orderDate, setOrderDate] = useState(new Date());
  const {productId} = useParams();
  console.log(productId);
  //const {userId} = user._id;
  console.log('userId: ', userId);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`, { headers: {Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
          const oneProduct = response.data;
          setName(oneProduct.name);
          setPrice(oneProduct.price.toFixed(2));
      })
      .catch((error) => console.log("There has been error retrieving Product Details: ", error));
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { userId, products:{productId, name}, totalPrice:price, notes, status };
    console.log(requestBody);
    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${API_URL}/api/orders`, requestBody, { headers: {Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
        const message = response.data.message;
        setMessage(message);
        // Reset the state
        setUserId("");
        setNotes("");
        setName("");
        setPrice("");
        setStatus("");
       

        //props.refreshOrder();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddOrder">
      <h3>Place Order</h3>
      <div className="AddOrderShowProducts">
        <div>Product details:</div>
        <div>{name} - € {price}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Notes :</label>
        <textarea
          type="text"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
      <Link to="/products">Continue Shopping</Link>
      <Link to="/orders">View my orders</Link>
    </div>
  );
}

export default AddOrder;
