import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function ProductDetailsPage(props) {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  const { productId } = useParams();

  const getProduct = () => {
    //  <== ADD A NEW FUNCTION
    axios
      .get(`${API_URL}/api/products/${productId}`)
      .then((response) => {
        const oneProduct = response.data;

        setProduct(oneProduct);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // <== ADD AN EFFECT
    getProduct();
  }, []);

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

            {user._id === product.user._id && (
              <>
                <Link to={`/products/edit/${productId}`}>
                  <button>Edit Product</button>
                </Link>
              </>
            )}
          </>
        )}

        <Link to="/products">
          <button>Back to products</button>
        </Link>

        <div>
          <Link to={`/orders/${productId}`}>
            <button>Order Now</button>
          </Link>
        </div>

        <div>
          <Link to={"/cart"}>
            <button>Add to Cart</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
