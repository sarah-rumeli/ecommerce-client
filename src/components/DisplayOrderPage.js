//Displays list of all the orders
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function DisplayOrderPage() {
  const { isLoggedIn, user, logOutUser,isLoading } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState(undefined); 
  const navigate = useNavigate();

  const getAllOrders = () => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders`,{ headers: {Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
        // variable that filters array

        let ordersToDisplay = [];
                
        if (user.isAdmin) {
          ordersToDisplay = response.data;
        } else {
          ordersToDisplay = response.data.filter((responseFromDb) => {
            console.log(responseFromDb);
            return responseFromDb.userId._id.includes(user._id);
          });
        
      }
        setOrders(ordersToDisplay);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  const deleteOrder = (orderId) => {
    const storedToken = localStorage.getItem('authToken');

    axios
    .delete(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, { headers: {Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
      const message = response.data.message;
      setMessage(message);
        getAllOrders();
      
    })
    .catch((error) => console.log("There has been error deleting this Product: ", error));
  }
  const renderDetails = () => {
return(
  <div>
    <h2>You haven't placed an order with us yet! Go Shopping!</h2>
    <Link to="/products">To Products</Link>

  </div>
)

  }
  return (
    <>
    {!isLoading &&
    <div className="container-fluid text-center justify-content-center">
    <div className="display-4">Orders</div>
<div className="alert alert-success" role="alert">{message && <p className="message">{message}</p>}</div>
    
    {orders.length===0 && renderDetails()}
      <div>{console.log(orders)}</div>
     
      <div className="row justify-content-center" style ={{marginLeft:"1vw"}}>
        {orders.map((order) => {
          return (
          <div className="card border-success mt-3 mx-3 p-0 col-xl-3 col-lg-3 col-md-5 col-sm-10 col-10 shadow"  key={order._id}>
          <div className="card-header">
            <h6>Order Id : {order._id}</h6>
            </div>
            <ul className="list-group list-group-flush">
            <li className="list-group-item text-muted"> {order.userId.name} </li>
            
            <>
              {order.products.map((x) => {
                return (
                 <div className="blue">
                  <li className="list-group-item"><span className="product">Product Name:</span> {x.name} <br/>
                  <span className="product"> Quantity:{x.quantity}</span></li>
                  </div>
                );
              })}
            </>
            <li className="list-group-item text-muted">Total Price:{order.totalPrice} &euro;</li>
            <li className="list-group-item text-muted">Notes:{order.notes}</li>
            <li className="list-group-item"><span className="product">Status:</span>{order.status}</li>
            <li className="list-group-item text-muted">Order date:{order.createdAt}</li>
            <li className="list-group-item text-muted">Dispatch date:{order.dispatchDate}</li>
            </ul>
            {user.isAdmin && (
              <div className="card-body">
                {order.status !== "Delivered" ? (
                  <>
                  <Link to={`/orders/edit/${order._id}`}>
                      <button type ="submit" className="btn btn-outline-dark rounded"
                                style={{ marginRight: "1vw" }}>Edit Order</button>
                    </Link>
                  </>
                ) : (
                  "Order Delivered . If not received, contact owner!!"
                )}
                {order.status !== "Delivered" ? (
                  order.status !== "Dispatched" ? (
                    <>
                    
                    <button className="btn btn-outline-danger rounded" onClick={() => deleteOrder(order._id)}>Delete Order </button>
 
                    </>
                  ) : (
                    " Expect to receive soon!"
                  )
                ) : (
                  "Thanks for shopping with us!!"
                )}
              </div>
            )}

            {!user.isAdmin && (
              <>
                {order.status === "Awaiting Payment" ? (
                  <>
                 
                  <button   className="btn btn-outline-danger rounded" onClick={() => deleteOrder(order._id)}>Cancel Order </button>
                   
                  </>
                ) : (
                  " Expect to receive soon"
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
    </div>
    
    }
    </>
  );
}

export default DisplayOrderPage;
