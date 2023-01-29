import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

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


<Link to="/orders"><button>Orders List</button></Link>

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
        <img src='https://res.cloudinary.com/dq4j6xfee/image/upload/v1674855409/ecommerce/eo4ybyzrcpoyevhqurfj.png' />
        {
          cartItems.length > 0 ? <span className="cart-count">{ cartItems.length }</span> : null
        }
      </Link>
      </>

      


    </nav>
  );
}

export default Navbar;
