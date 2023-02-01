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
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  //const [userId, setUserId] = useState(user._id);
  const [notes, setNotes] = useState("");
  const [total, setTotalPrice] = useState(0);
  const [status, setStatus] = useState("Awaiting Payment");
  const [message, setMessage] = useState(undefined);
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  let totalQuantity = 0;
  let totalPrice = 0;
  useEffect(() => {
  if (cartItems && cartItems.length > 0) {
    
      setProducts(cartItems[0].products);
    

    //console.log("products: ", products);
    totalQuantity = products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    totalPrice = products.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
  }
}, [cartItems[0]]);
  console.log("cartItems: ", cartItems);
  console.log("totalQuantity: ", totalQuantity);

  const deleteCartItem = (productId) => {
    console.log("delete item from cart");
    const storedToken = localStorage.getItem("authToken");
    const requestBody = { user: user._id };
    console.log("requestBody: ", requestBody);

    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/cart/${productId}`, {
        data: requestBody,
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const message = response.data.message;
        setMessage(message);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        console.log("cartItems[0].products: ", cartItems[0].products);
      })
      .catch((error) =>
        console.log(
          "There has been error deleting this Product from the Cart: ",
          error
        )
      );
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cart/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const cart = response.data[0];
        console.log("to be ordered", cart);
        const total = cart.products.reduce(
          (acc, product) => acc + product.quantity * product.price,
          0
        );
        const cartToOrder = {
          userId: cart.user,
          products: cart.products,
          status: "Awaiting Payment",
          totalPrice: total,
        };
        return axios.post(
          `${process.env.REACT_APP_API_URL}/api/orders`,
          cartToOrder,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
      })
      .then((responseFromOrder) => {
        console.log(responseFromOrder);

        return axios.delete(
          `${process.env.REACT_APP_API_URL}/api/cart/remove/${user._id}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
      })
      .then((response) => console.log(response.data.message))
      .catch((error) => console.log(error));

    navigate("/orders");
  };
 
  return (
    <>
      {!isLoading && (
        <div className="container-fluid mt-3 mb-5">
          <div className="row justify-content-center">
            <h1>Your Cart</h1>
            {products.length > 0 ? (
              <>
                <div className="col-md-6">
                  {products.map((product, index) => {
                    return (
                      <>
                        <div
                          className="card border-success shadow mb-1"
                          key={index}
                        >
                          <div className="row g-0">
                            <div className="col-md-4">
                              <img
                                src={product.img}
                                className="img-fluid rounded-start"
                                alt="Need to pull in images"
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body text-start">
                                <div className="row">
                                  <div className="col-9">
                                    <h5 className="card-title">
                                      {product.name}{" "}
                                    </h5>
                                    <p className="card-text">
                                      <small>
                                        € {product.price} each x{" "}
                                        {product.quantity}
                                      </small>
                                    </p>
                                  </div>

                                  <div className="col-3 justify-content-end green">
                                    <button
                                      onClick={() =>
                                        deleteCartItem(product._id)
                                      }
                                      className="btn btn-danger bg-gradient btn-sm"
                                    >
                                      x
                                    </button>
                                  </div>
                                </div>
                                <div className="row rounded-3 justify-content-end">
                                  <div className="btn btn-success bg-gradient w-50 pe-none">
                                    Sub-Total: €{" "}
                                    {product.price * product.quantity}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-100"></div>
                      </>
                    );
                  })}
                </div>
                <div className="col-md-4 bg-dark align-middle text-light rounded-3">
                  <div>
                    <h3>Total € {totalPrice}</h3>

                    <button className="btn btn-secondary mb-3" type="submit" onClick={handleCheckout}>
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* CART empty message... like the add form style... */}
                <div className="col-10 col-lg-10 col-md-10 col-sm-10 text-white m-3 p-5 bg-dark bg-gradient rounded-3">
                  Oops, it looks like your cart is empty...
                  <p></p>
                  <Link className="btn bg-success bg-gradient text-light" to='../products'>Get Shopping!</Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CartPage;