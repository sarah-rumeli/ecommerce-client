import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";



function SpecificOrder (){



  const { isLoggedIn, user, logOutUser,isLoading } = useContext(AuthContext);
const {orderId} = useParams();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  const getAllOrders = () => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, { headers: {Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
        console.log("response is .....",response.data)
        const oneOrder = response.data;
        setOrder(oneOrder);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllOrders();
  }, []);



/*
    const { isLoggedIn, user, logOutUser,isLoading } = useContext(AuthContext);
    const {orderId } = useParams();

console.log(orderId)
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();  

    const getSpecifcOrder = () => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`)
          .then((response) => {
            // variable that filters array
    
          console.log(response.data);
            setOrder(response.data);

          })
          .catch((error) => console.log(error));
      };
      useEffect(() => {
        getSpecifcOrder();
      }, []);
*/
    return(
        <>
 <div className="OrderCard card" key={order._id}>
 <h3>Order Id : {order._id}</h3>
            
            <p>
              {order.products.map((x) => {
                return (
                  <div>
                    <h5>Product Name: {x.name}</h5>
                    <h5> Quantity:{x.quantity}</h5>
                  </div>
                );
              })}
            </p>
            <h3>Total Price:{order.totalPrice}</h3>
            <p>Notes:{order.notes}</p>
            <h5>Order date:{order.createdAt}</h5>

 </div>
        </>
    )




}


export default SpecificOrder;