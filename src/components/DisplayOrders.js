//Displays list of all the orders
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";





function DisplayOrders () {

    const { isLoggedIn, user,logOutUser} = useContext(AuthContext); 


    const [orders, setOrders] = useState([]);
   
    const getAllOrders = () => {
      axios
        .get( `${process.env.REACT_APP_API_URL}/api/orders`)
        .then((response) => setOrders(response.data))
        .catch((error) => console.log(error));
    };
    useEffect(() => {
        getAllOrders();
      }, [] );

      return (
        <div className="OrderListPage">

        <div>

       {console.log(orders)}

            </div>
          
            {orders.map((order) => {
              return (
                <div className="OrdertCard card" key={order._id} >
                <hr></hr>
                <h3>Order Id : {order._id}</h3>
                <h3>User : {order.userId.name}</h3>
                <p>
                { order.products.map((x) =>{
                    return (
                            <div>
                                <h5>Product Name: {x.name}</h5>
                                <h5> Quantity:{x.quantity}</h5>
                               
                            </div>
                    )
                })}
                </p>
                <h3>Total Price:{order.totalPrice}</h3>
                <p>Notes:{order.notes}</p>
                <h5>Status:{order.status}</h5>
                <h5>Order date:{order.createdAt}</h5>
                <h5>Dispatch date:{order.dispatchDate}</h5>

                  <Link to ="/orders/edit/:order._id"><button>Edit Order</button></Link>
                  <Link to ="/orders/delete/:order._id"><button>Cancel Order</button></Link>
                </div>
              );
            })}     
           
        </div>
      );
    }



export default DisplayOrders;