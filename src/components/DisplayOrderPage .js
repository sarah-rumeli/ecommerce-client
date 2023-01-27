//Displays list of all the orders
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function DisplayOrderPage() {
  const { isLoggedIn, user, logOutUser,isLoading } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getAllOrders = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders`)
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

  return (
    <>
    {!isLoading &&
    <div className="OrderListPage">
      <div>{console.log(orders)}</div>

      {orders.map((order) => {
        return (
          <div className="OrderCard card" key={order._id}>
            <hr></hr>
            <h3>Order Id : {order._id}</h3>
            <h3>User : {order.userId.name}</h3>
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
            <h5>Status:{order.status}</h5>
            <h5>Order date:{order.createdAt}</h5>
            <h5>Dispatch date:{order.dispatchDate}</h5>
            {user.isAdmin && (
              <>
                {order.status !== "Delivered" ? (
                  <>
                  <Link to={`/orders/edit/${order._id}`}>
                      <button>Edit Order</button>
                    </Link>
                  </>
                ) : (
                  "Order Delivered . If not received, contact owner!!"
                )}
                {order.status !== "Delivered" ? (
                  order.status !== "Dispatched" ? (
                    <>
                    <Link to={`/orders/delete/${order._id}`}>
                        <button>DeleteOrder</button>
                      </Link>
                    </>
                  ) : (
                    " Expect to receive soon"
                  )
                ) : (
                  "Thanks for shopping with us!!"
                )}
              </>
            )}

            {!user.isAdmin && (
              <>
                {order.status === "Awaiting Payment" ? (
                  <>
                  <Link to={`/orders/delete/${order._id}`}>
                      <button>Delete Order</button>
                    </Link>
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
    
    }
    </>
  );
}

export default DisplayOrderPage;
