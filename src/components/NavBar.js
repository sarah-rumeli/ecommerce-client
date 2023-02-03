import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { cartItems, emptyCart } = useContext(CartContext);
  const { productsFromContext} = useContext(CartContext);
  let totalQuantity = 0;
  if (cartItems && cartItems.length >= 1) {
    const { products } = cartItems[0];
    //console.log('products: ', products);
    totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
  }
  
  const handleLogout = () => {
    logOutUser();
    emptyCart();
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light alert-success">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">E-commerce</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/products">Products</Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link className="nav-item cart-icon" to="/cart">
              <img src="https://res.cloudinary.com/dq4j6xfee/image/upload/v1674855409/ecommerce/eo4ybyzrcpoyevhqurfj.png" />
              {totalQuantity > 0 ? (
                <span className="cart-count">{totalQuantity}</span>
              ) : null}
            </Link>
            
            {!isLoggedIn ? (
              <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link btn btn-warning bg-gradient text-black me-2" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-success bg-gradient text-white" to="/login">Login</Link>
                </li>
              </ul>
              </>
            ) : (
              <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">Orders</Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">{user && "Hello, " + user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-danger bg-gradient text-white" onClick={handleLogout}>Logout</button>
                </li>
              </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
