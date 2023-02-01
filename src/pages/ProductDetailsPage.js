import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import AddComment from "../components/AddComment";

const API_URL = "http://localhost:5005";

console.log("*********** ProductDetailsPage *****************");

function ProductDetailsPage(props) {
  const { isLoggedIn, isLoading, user, logOutUser, isAdmin } =
    useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const { productId } = useParams();

  const getProduct = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`)
      .then((response) => {
        const oneProduct = response.data;
       
        setProduct(oneProduct);
        
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getAllComments = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/products/${productId}/comments`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        // variable that filters array

        console.log("response for hsky", response.data);
        setComments(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // destructure the addToCart function and cartItems state from the CartContext
    if (!user) {
      return;
    }
    const requestBody = { user: user._id, product };
    //console.log("requestBody: ", requestBody);
    //console.log("product: ", product);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/cart`, requestBody)
      .then((response) => {
        //console.log("response: ", response);
        // update the cartItems state in the component
        const { cart } = response.data;
        //console.log("PRODUCT DETAILS: {cart}", cart);
        addToCart(requestBody);
        // Once the request is resolved successfully and the item
        // has been added to the cart we navigate back here
        navigate(`/products`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="container-fluid">
      <div className="card mb-3" >
          {product && (
            <div className="row g-0">
              <div className="col-md-3" style={{ marginTop: "4vw",marginLeft:"1vw" }}>
              <img 
                src={product.img}
                className="img-fluid rounded-start"
                style={{ width: "30vw",height:"30vw" }}
                alt="Product"
              />
              </div>
              <div className="col-md-5">
              <div className="card-body ">
                <h5 className="card-title  ">{product.name}</h5>
              
                <p className="card-text" style={{ fontWeight: "bold" }}>{product.category}</p>
                <hr/>
                <p className="card-text text-center"> {product.description}</p>
                </div>
                </div>
                <div className="col-md-3">
                <div className="card-body card border-success " style={{ marginTop: "4.5vw",marginRight:"1vw" }}>
                Created by:
                <span className="card-text">{product.user.name}</span>
                <br></br>
                <span className="card-text">{product.user.email}</span>
                
                <p className="card-text" style={{ fontWeight: "bold" }}>Price :{product.price} Euro</p>
                
                {isLoggedIn && (
                <>
                {user._id === product.user._id && (
                    
                      <Link to={`/products/edit/${productId}`}>
                        <button className="btn btn-secondary mb-3" >
                          Edit Product
                        </button>
                      </Link>
                     
                  )}
                  {user.isAdmin && (
                    
                      <Link to={`/products/edit/${productId}`}>
                        <button className="btn btn-secondary mb-3">
                          Edit Product
                        </button>
                      </Link>
                    
                    
                  )}
                 <div className="container" style={{display:"flex",gap:"1vw", justifyContent:"center"}}>
                    <Link to={`/orders/${productId}`}>
                      <button className="btn btn-success mb-3" style={{paddingLeft:"1vw",paddingRight:"1vw" }}>Buy Now</button>
                    </Link>
                 
                  
                    <button
                      className="btn btn-primary mb-3"
                      onClick={handleSubmit}
                    >
                      Add to Cart
                    </button>
                  
                    </div>
                </>
              )}
              </div>
              </div>
            

                
            </div>
          )}

          <Link to="/products">
            <button className="btn btn-info mb-3">Back to products</button>
          </Link>
          <AddComment productId={productId} refreshComments={getAllComments}/>
          {comments.map((comment) => {
            return (
              <>
              <div className="row justify-content-center">
              <div className="card col-10 col-lg-7 col-md-10 col-sm-10 m-3 p-5 text-dark rounded-3 border-success">
              <div className="card-header" key={comment._id} >
              <h5>Rating: {[...Array(comment.rating)].map((star) => {
                  return <span className="star">&#9733;</span>
                })}</h5>
                
                </div>
               <div className="card-body">
               <h5 className="card-title">{comment.comment}</h5>
               <p className="card-text">Author: {comment.userId.name}</p>

               </div>
              </div>
              </div>
              </>
            );
          })}

          
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
