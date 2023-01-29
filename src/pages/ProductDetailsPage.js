import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

const API_URL = "http://localhost:5005";

console.log("*********** ProductDetailsPage *****************");

function ProductDetailsPage(props) {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  const { productId } = useParams();

  const getProduct = () => {
    axios
      .get(`${API_URL}/api/products/${productId}`)
      .then((response) => {
        const oneProduct = response.data;
        setProduct(oneProduct);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // destructure the addToCart function and cartItems state from the CartContext
    if (!user) {
      return;
    }
    const requestBody = {user: user._id, product}
    console.log("product: ", product);
    axios
      .post(`${API_URL}/api/cart`, requestBody)
      .then((response) => {
        console.log(response);
        // update the cartItems state in the component
        addToCart(product);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="ProductDetails">
        {product && (
          <>
            <h1>{product.name}</h1>
            <p> Description:{product.description}</p>
            <p>
              {" "}
              Created by:
              <span>{product.user.name}</span>
              <br></br>
              <span>{product.user.email}</span>
              <span>{product.user._id}</span>
            </p>
            <p>Price :{product.price}</p>
            <p>Category:{product.category}</p>
            <p>
              Image: <img src={product.img} alt="Product" />
            </p>

            {isLoggedIn && (
              <>
                {user._id === product.user._id && (
                  <>
                    <Link to={`/products/edit/${productId}`}>
                      <button>Edit Product</button>
                    </Link>
                  </>
                )}

                <div>
                  <Link to={`/orders/${productId}`}>
                    <button>Order Now</button>
                  </Link>
                </div>

                <div>
                  <button onClick={handleSubmit}>Add to Cart</button>
                </div>
              </>
            )}
          </>
        )}

        <Link to="/products">
          <button>Back to products</button>
        </Link>
      </div>
    </>
  );
}

export default ProductDetailsPage;
