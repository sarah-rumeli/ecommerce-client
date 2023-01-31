import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

const API_URL = "http://localhost:5005";

console.log("*********** ProductDetailsPage *****************");

function ProductDetailsPage(props) {
  const { isLoggedIn, isLoading, user, logOutUser,isAdmin } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const { productId } = useParams();

  const getProduct = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`)
      .then((response) => {
        const oneProduct = response.data;
        //const comments = response.data.comments;
        setProduct(oneProduct);
        //setComments(comments);
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
    //console.log("requestBody: ", requestBody);
    //console.log("product: ", product);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/cart`, requestBody)
      .then((response) => {
        //console.log("response: ", response);
        // update the cartItems state in the component
        const {cart} = response.data;
        //console.log("PRODUCT DETAILS: {cart}", cart);
        addToCart(requestBody);
        // Once the request is resolved successfully and the item
        // has been added to the cart we navigate back here
        navigate(`/products`);
      })
      .catch((error) => console.log(error));
  }
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const requestBody = {userId: user._id, comment:comments, rating:rating}
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/products/:productId/comments`, requestBody)
      .then((response) => {
          console.log("Response success");
        })
        .catch((err) => {
          console.log("Error while posting comment",err)
        });
      }
  return (
    <>
      <div className="container-fluid">
      <div className="row justify-content-center">
        {product && (
          <div className="card border-success mt-3 mx-3 p-0 col-xl-3 col-lg-3 col-md-5 col-sm-8 col-8 shadow">
          
               <img src={product.img} className="card-img-top bg-dark m-0 ml-n1 p-n1" alt="Product" />
               <div className="card-body">
            <h5 className="text-success">{product.name}</h5>
            <p className="card-text"> {product.description}</p>
           
             
              Created by:
              <span>{product.user.name}</span>
              <br></br>
              <span>{product.user.email}</span>
              <span>{product.user._id}</span>
           
            <p className="card-text">Price :{product.price}</p>
            <p>Category:{product.category}</p>
            </div>

            {isLoggedIn && (
              
              <>
                {user._id === product.user._id && (
                  <div className="card-footer-light bg-transparent border-success">
                    <Link to={`/products/edit/${productId}`}>
                      <button className="btn btn-secondary mb-3">Edit Product</button>
                    </Link>
                  </div>
                ) 
                }
                {user.isAdmin && (
                  <div className="card-footer-light bg-transparent border-success">
                    <Link to={`/products/edit/${productId}`}>
                      <button className="btn btn-secondary mb-3">Edit Product</button>
                    </Link>
                  </div>
                ) 
                }
                <div className="card-body d-flex justify-content-center">
                
                  <Link to={`/orders/${productId}`}>
                    <button className="btn btn-success mb-3">Buy Now</button>
                  </Link>
                

               
                  <button className="btn btn-primary mb-3 ml-3" onClick={handleSubmit}>Add to Cart</button>
              
                </div>
              </>
            )}
          </div>
        )}

        <Link to="/products">
          <button className="btn btn-info mb-3">Back to products</button>
        </Link>
        <form onSubmit={handleAddComment}>
        <label>Comments</label>        
        <textarea className="Comments"
         type="text"
          name="comments"
          onChange={(e) => setComments(e.target.value)}
          />
          <br></br>
          <label>Rating</label>
          <input 
            type="number"
            name = "rating"
            onChange={(e) => setRating(e.target.value)}
            />


          <br></br>
          <button type="submit">Add Comment</button>
        </form>
      </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
