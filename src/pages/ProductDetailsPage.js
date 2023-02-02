import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import AddComment from "../components/AddComment";
import EditComment from "../components/EditComment";
import StarRating from "../components/StarRating";

const API_URL = "http://localhost:5005";

console.log("*********** ProductDetailsPage *****************");

function ProductDetailsPage(props) {
  const { isLoggedIn, isLoading, user, logOutUser, isAdmin } =
    useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [productRating, setProductRating] = useState(0);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const { productId } = useParams();

  const getProduct = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`)
      .then((response) => {
        const oneProduct = response.data;

        setProduct(oneProduct);
        setProductRating(oneProduct.rating);
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
            setComments(response.data);
            if(response.data.length!==0){

            
            const newRating= Math.floor((response.data.reduce(
              (accumulator, element) => accumulator + element.rating,
              0
            ))/response.data.length);
            setProductRating(newRating);
            }
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
       
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/cart`, requestBody)
      .then((response) => {
      
        // update the cartItems state in the component
        const { cart } = response.data;
       
        addToCart(requestBody);
        // Once the request is resolved successfully and the item
        // has been added to the cart we navigate back here
        navigate(`/products`);
      })
      .catch((error) => console.log(error));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("en-UK", options);
  };
  const handleDeleteComment = (commentId) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/products/${productId}/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
       
      })
      .catch((error) =>
        console.log("There has been error deleting this Comment: ", error)
      );
  };
  return (
    <>
      <div className="container-fluid">
        <div className="m-3">
          {product && (
            <div className="row g-0">
              <div className="col-md-4 mt-3 ms-1">
                <img src={product.img} className="rounded-3 ratio card-product-details-img shadow border-success" alt={product.name} />
              </div>
              <div className="col-md-4 p-5">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <span className="col-6 text-end">
                            {[...Array(productRating)].map((star) => {
                              return <span className="star">&#9733;</span>;
                            })}
                          </span>
                  <p className="card-text"><small className="text-muted">{product.category}</small></p>
                  <p className="card-text">{product.description}</p>
                  
                </div>
              </div>
              <div className="col-md-3">
                <div className="card-body shadow card border-success mt-3 me-1">
                  {isLoggedIn ? (
                    <>
                      <div className="d-flex p-2 justify-content-center">
                        <Link to={`/orders/${productId}`}>
                          <button className="btn btn-success mb-3 me-3">
                            Buy Now
                          </button>
                        </Link>

                        <button className="btn btn-success mb-3" onClick={handleSubmit}>
                          Add to Cart
                        </button>
                      </div>
                      <h4 className="card-text fw-bold">
                        {product.price} &euro;
                      </h4>
                      <div className="text-muted small lh-1 mb-3">
                        Created by:
                        <div className="card-text">{product.user.name}</div>
                        <div className="card-text">{product.user.email}</div>
                      </div>
                      
                      {user._id === product.user._id ? (
                        <>
                        <Link to={`/products/edit/${productId}`}>
                          <button className="btn btn-outline-success mb-3">
                            Edit Product
                          </button>
                        </Link>
                        </>
                      ) : <>
                       {user.isAdmin && (
                        <Link to={`/products/edit/${productId}`}>
                          <button className="btn btn-outline-success mb-3">
                            Edit Product
                          </button>
                        </Link>
                      )}
                      </>
                      }
                      
                    </>
                  ) : (
                    <>
                      <div className="d-flex p-2 justify-content-center">
                        <Link to={`/login`}>
                          <button className="btn btn-success mb-3 me-3">
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          <Link to="/products">
            <button className="btn btn-outline-success my-3">
              Back to products
            </button>
          </Link>
          <AddComment productId={productId} refreshComments={getAllComments} refreshProduct={getProduct} />
         
          {comments.map((comment) => {
            return (
              <>{comment &&
                <div className="container-fluid">
                  <div className="row justify-content-center">
                    <div className="card col-10 col-lg-7 col-md-10 col-sm-10 mb-3 text-dark rounded-3 border-success m-0 p-0 shadow">
                      <div className="card-header" key={comment._id}>
                        <div className="row">
                          <span className="col-6 text-start fw-bold">
                            {comment.userId.name}
                          </span>
                           {/* new div added for the stars*/}
                          <span className="col-6 text-end">
                            {[...Array(comment.rating)].map((star) => {
                              return <span className="star">&#9733;</span>;
                            })}
                          </span>
                           {/* new div added for the stars*/}
                        </div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{comment.comment}</h5>
                      </div>

                      <div className="card-footer text-muted d-flex justify-content-between">
                        {isLoggedIn &&(
                          <>
                          {user._id === comment.userId._id ?
                          (
                            <div className="d-flex justify-content-between">
                            <Link to={`/${productId}/comments/${comment._id}/edit`}>
                              <button
                                className="btn btn-outline-dark rounded"
                                style={{ marginRight: "1vw" }}
                              >
                                Edit
                              </button>
                            </Link>
                            <button
                              className="btn btn-outline-danger rounded"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              Delete
                            </button>
                            </div>
                            ) : (user.isAdmin &&
                              
                                <div className="d-flex justify-content-between">
                            <Link to={`/${productId}/comments/${comment._id}/edit`}>
                              <button
                                className="btn btn-outline-dark rounded"
                                style={{ marginRight: "1vw" }}
                              >
                                Edit
                              </button>
                            </Link>
                            <button
                              className="btn btn-outline-danger rounded"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              Delete
                            </button>
                            </div>
                                
                             
                            

                            ) 
                          }

                           
                            
                            </>
                          )
                        }
                        <small>{formatDate(comment.createdAt)}</small>
                      </div>
                    </div>
                  </div>
                </div>
              }
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
