import { useState, useEffect,useContext } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";


import { Link } from "react-router-dom";

//const API_URL = "http://localhost:5005";


function EditOrderPage (){

    const [status, setStatus] = useState("Awaiting Payment");
    const [dispatchDate, setDispatchDate] = useState("");
    const [userId, setUserId] = useState("");
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState([]);

    const {orderId} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    axios
    .get(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, { headers: {Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
        console.log("response is .....",response.data)
        const oneOrder = response.data;
        setStatus(oneOrder.status);
        setDispatchDate(oneOrder.dispatchDate);
       
    })
    .catch((error) => console.log("There has been error retrieving Product Details: ", error));
}, []);

const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {status,dispatchDate};
    const storedToken = localStorage.getItem('authToken');

    axios
    .put(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, requestBody, { headers: {Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
        navigate(`/orders`)
    });
  };

  return (
    <div className="EditOrderPage">
      <h3>Edit the Order</h3>

      <form onSubmit={handleSubmit}>
        <label>Status *:</label>
        <input
          type="text"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <label>
        Dispatch Date: </label>
        <input type="date" name ="dispatchDate" value={dispatchDate}  onChange={(e) => setDispatchDate(e.target.value)} />
     
        
      <button type="submit">Submit</button>
      </form>

     
    </div>
  );

}




export default EditOrderPage