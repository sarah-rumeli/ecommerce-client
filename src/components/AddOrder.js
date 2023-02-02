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
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("Awaiting Payment");
  const [message, setMessage] = useState(undefined); 
  const [img, setImg] = useState("");
 // const [orderDate, setOrderDate] = useState(new Date());
  const {productId} = useParams();


  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`,
       { headers: {Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
          const oneProduct = response.data;
          setName(oneProduct.name);
          setPrice(oneProduct.price.toFixed(2));
          setImg(oneProduct.img);
      })
      .catch((error) => console.log("There has been error retrieving Product Details: ", error));
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { userId, products:{productId, name, quantity}, totalPrice:price*quantity, notes, status };
    console.log(requestBody);
    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/orders`, requestBody, { headers: {Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
        const message = response.data.message;
        setMessage(message);
        // Reset the state
        setUserId("");
        setNotes("");
        setName("");
        setPrice("");
        setStatus("");
       

    
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddOrder"style ={{width:"50%",marginLeft:"25vw"}}>
      <h3 className="header mt-4 w-50" style ={{marginLeft:"14vw"}}>Place Order</h3>
      <div className="buyproduct">
      <div className="card">
     <div className="card-header">Product details:</div>
        <img className="card-img-top" src={img} alt="Card image cap" />
        <ul className="list-group list-group-flush">
        <li className="list-group-item"><span className="product">Product : </span> {name}</li>
        <li className="list-group-item"><span className="product">Price : </span>{price} &euro; </li>
        </ul>
      </div>
      <div className="text-white">
      <div className="text-white">
        <div className="text-white m-3 p-5 bg-dark box-bg-gradient rounded-3 buyform">
      <form onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <label className="form-label">Notes :</label>
        <textarea
        className="form-control"
          type="text"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        </div>
        <div className="form-outline mb-4">
        <label className="form-label">Quantity :</label>
        <input
        className="form-control"
          type="number"
          name="quantity"
      
          onChange={(e) => setQuantity(e.target.value)}
          />
          </div>
        <button type="submit" className="btn btn-outline-warning rounded text-white">Submit</button>
      </form>
      </div>
      </div>
      </div>
      </div>
      {message && <p className="message">{message}</p>}
      <div className="btndiv">
      <Link to="/products"> <button className="btn btn-outline-success">Continue Shopping</button></Link>
      <Link to="/orders"><button className="btn btn-outline-primary">View my orders</button></Link>
      </div>
    </div>
  );
}

export default AddOrder;
