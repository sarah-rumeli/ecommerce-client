import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  let totalQuantity = 0;
  if (cartItems && cartItems.length > 0) {
    const { products } = cartItems[0];
    totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
  }
  console.log("********NavBar.js clg**********");
  console.log("cartItems: ", cartItems);
  //console.log("products: ", products);
  console.log("totalQuantity: ", totalQuantity);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/products">
        <button>Products</button>
      </Link>

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && "Hello," + user.name}</span>
          <Link to="/profile">
            <button>My Profile</button>
          </Link>

          <Link to="/orders">
            <button>Orders List</button>
          </Link>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}

      <>
        <Link className="cart-icon" to="/cart">
          <img src="https://res.cloudinary.com/dq4j6xfee/image/upload/v1674855409/ecommerce/eo4ybyzrcpoyevhqurfj.png" />
          {totalQuantity > 0 ? (
            <span className="cart-count">{totalQuantity}</span>
          ) : null}
        </Link>
      </>
    </nav>
  );
}

export default Navbar;
