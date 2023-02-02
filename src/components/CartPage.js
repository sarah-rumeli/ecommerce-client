import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import axios from "axios";
import Checkout from "./Checkout";

const API_URL = "http://localhost:5005";

function CartPage() {
  console.log("******** CartPage.js clg**********");
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState(undefined);
  const { removeFromCart } = useContext(CartContext);
  const { emptyCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotals = (products) => {
    setTotalQuantity(products.reduce(
      (acc, product) => acc + product.quantity,
      0
    ));
    setTotalPrice(products.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    ));
    return { totalQuantity, totalPrice };
  };

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setProducts(cartItems[0].products);
      const { totalQuantity, totalPrice } = calculateTotals(cartItems[0].products);
    }
  }, [cartItems[0]]);

  const deleteCartItem = (productId) => {
    const storedToken = localStorage.getItem("authToken");
    const requestBody = { user: user._id };

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
        removeFromCart(productId);
      })
      .catch((error) => console.log("There has been error deleting this Product from the Cart: ", error)
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
        emptyCart();
        return axios.post(
          `${process.env.REACT_APP_API_URL}/api/orders`,
          cartToOrder,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
      })
      .then((responseFromOrder) => {
        //console.log(responseFromOrder);
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
                        <div className="card card-cart border-success shadow mb-2 overflow-hidden" key={index}>
                          <div className="row g-0">
                            <div className="col-md-4">
                              <Link to={`/products/${product._id}`}>
                                <img src={product.img} className="rounded-start card-img-top" alt={product.name} />
                              </Link>
                            </div>
                            <div className="col-md-8">
                              <div className="card-body text-start">
                                <div className="row">
                                  <div className="col-9">
                                    <h5 className="card-title text-truncate lh-base">{product.name}</h5>
                                    <p className="card-text">
                                      <small>{product.price} &euro; each x {product.quantity}</small>
                                    </p>
                                  </div>

                                  <div className="col-3 d-flex align-self-start justify-content-end">
                                    <button onClick={() => deleteCartItem(product._id)} className="btn btn-danger bg-gradient btn-sm">
                                      x
                                    </button>
                                  </div>
                                </div>
                                <div className="row rounded-3 justify-content-end me-1">
                                  <div className="btn btn-outline-success bg-gradient w-50 pe-none">
                                    Sub-Total: {product.price * product.quantity} &euro;
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
                <div className="col-md-4 d-flex align-items-center justify-content-center text-white rounded-3">
                  <div className="w-100 box-bg-gradient">
                    <h3>Total € {totalPrice}</h3>
                    <button className="btn btn-outline-success bg-white text-dark shadow mb-3" type="submit" onClick={handleCheckout}>
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* CART empty message... */}
                <div className="col-10 col-lg-10 col-md-10 col-sm-10 text-white m-3 p-5 bg-dark bg-gradient rounded-3">
                  Oops, it looks like your cart is empty...
                  {/* Not Logged In message... */}
                  {!isLoggedIn && (
                    <p>You'll need to <Link to="/login" className="badge rounded-pill bg-success text-white">Login</Link> or <Link to="/signup" className="badge rounded-pill bg-warning text-dark">Sign Up</Link> to buy products</p>
                  )}
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