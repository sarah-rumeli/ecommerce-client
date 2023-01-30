import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import axios from "axios";

const API_URL = "http://localhost:5005";



function Checkout(props){

    const { isLoading } = useContext(AuthContext);
    
    const {user} = useContext(AuthContext);
      
    const [order,setOrder] = useState(null);
    const storedToken = localStorage.getItem('authToken');  
    const orderId = props.orderId;
    const message = props.message;

        axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}}`,
        { headers: {Authorization: `Bearer ${storedToken}`} })
        .then((response)=>{
          const oneOrder = response.data;
            setOrder(oneOrder);
        })       
        .catch(error => console.log(error))

   return(
    <>
       <h1>{order._id}</h1> 
    </>
)

}


export default Checkout;