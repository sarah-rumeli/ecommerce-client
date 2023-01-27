import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

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
      <Link to="/cart">Cart</Link>
      </>
    </nav>
  );
}

export default Navbar;
