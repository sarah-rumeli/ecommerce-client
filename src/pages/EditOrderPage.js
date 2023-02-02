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
    <div className="container-fluid mb-5 mt-4">
    <div className="row justify-content-center">
        <div className="col-10 col-lg-10 col-md-10 col-sm-10 text-dark m-3 p-5 border-gradient rounded-3">
      <h3>Edit Orders</h3>

      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Status *:</label>
        <select
          className="form-control"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
        <option value="">Select a status</option>
        <option value="Awaiting Payment">Awaiting Payment</option>
        <option value="Received Payment">Received Payment</option>
        <option value="Dispatched">Dispatched</option>
        <option value="Delivered">Delivered</option>
         
              </select>
              </div>
              <div className="mb-3">
              <label className="form-label">
        Dispatch Date: </label>
        <input className="form-control" type="date" name ="dispatchDate" value={dispatchDate}  onChange={(e) => setDispatchDate(e.target.value)} />
        </div>
        
      <button className="btn bg-success bg-gradient text-light" type="submit">Submit</button>
      </form>
</div>
      </div>
     
      </div>
  );

}




export default EditOrderPage