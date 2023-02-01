import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import StarRating from "./StarRating";
import "../App.css";

function AddComment(props) {
  const { isLoggedIn, user, logOutUser, isLoading } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const productId = props.productId;

  const handleAddComment = (e) => {
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
      .post(
        `${process.env.REACT_APP_API_URL}/api/products/:productId/comments`,
        requestBody
      )
      .then((response) => {
        console.log("Response success");

        // Reset the state
        setComment("");
        setRating(1);

        props.refreshComments();
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
        <div className="col-10 col-sm-10 col-md-7 col-lg-7 m-3 p-5 rounded-3 text-dark box-bg-gradient">
          <form onSubmit={handleAddComment}>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: "bolder" }}>
                Comments
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
              <br></br>
              <label className="form-label fw-bolder">
                Rating
              </label>
              <StarRating ratingSetter={ratingSetter} />
            </div>

            <br></br>
            <button className="btn btn-success bg-gradient text-light" type="submit">
              Add Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddComment;
