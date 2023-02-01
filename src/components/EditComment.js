import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import StarRating from "./StarRating";
import "../App.css";

function EditComment() {
  const { isLoggedIn, user, logOutUser, isLoading } = useContext(AuthContext);
  const [comment, setComment] = useState([]);
  const [rating, setRating] = useState(0);
  const {commentId} = useParams();
  const {productId} = useParams();
  const navigate = useNavigate();
console.log("comments", commentId);
console.log("products",productId);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    axios
    .get(`${process.env.REACT_APP_API_URL}/api/products/${productId}/comments/${commentId}`, { headers: {Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
        console.log("response from comment;",response.data)
        const oneComment = response.data;
        setComment(oneComment.comment);
        setRating(oneComment.rating);
        
    })
    .catch((error) => console.log("There has been error retrieving comment Details: ", error));
  }, []);

console.log("rating:",rating);
console.log("comment:",comment);

  const handleEditComment = (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const requestBody = {
      userId: user._id,
      comment: comment,
      product: productId,
      rating: rating,
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/products/${productId}/comments/${commentId}/edit`,
        requestBody
      )
      .then((response) => {
        console.log("Response success");

        // Reset the state
        setComment("");
        setRating(0);
        navigate(`/products/${productId}`);
        
      })
      .catch((err) => {
        console.log("Error while posting comment", err);
      });
  };

  const ratingSetter = (stars) => {
    setRating(stars);
  };

  return (
    <div className="container-fluid mb-5 mt-4">
      <div className="row justify-content-center">
        <div className="col-10 col-sm-10 col-md-7 col-lg-7 m-3 p-5 rounded-3 text-dark box-bg-gradient shadow">
          <form onSubmit={handleEditComment}>
            <div className="mb-3">
              <label className="add-comment form-label fw-bolder">
                <h3 className="text-white">Edit Comment</h3>
              </label>
              <textarea
                className="form-control"
                type="text"
                name="comments"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="add-comment form-label fw-bolder">
                <h3 className="text-white">Rating</h3>
              </label>
              <StarRating ratingSetter={ratingSetter} rating={rating} />
            </div>
            <button className="btn btn-success bg-gradient text-light mt-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditComment;
