import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import "../App.css";

import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function UserProfile() {
  const { isLoggedIn, isLoading, user, authenticateUser,logOutUser} =
    useContext(AuthContext);
  const [profile, setProfile] = useState(user);

  const handleDelete = () => {
    const storedToken = localStorage.getItem('authToken');
    axios.delete(`${process.env.REACT_APP_API_URL}/auth/profile/${user._id}`,
     { headers: {Authorization: `Bearer ${storedToken}`} })
     .then((response) => {
      logOutUser();
     })
  }

  return (
    <>
      {isLoading ? (
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <h3 className="header mt-4 w-50">Your Profile</h3>
            <div className="text-dark m-3 p-3 card border-success rounded-3 w-75">
              <h4>{user.name}</h4>
              <h6>Email</h6>
              <p className="text-muted">{user.email}</p>
              <h6>Address:</h6>
              <p className="text-muted">{user.address}</p>

              <div className="d-flex justify-content-center">
                <Link to={`/profile/edit/${user._id}`}>
                  <button className="btn btn-outline-success rounded me-1">
                    Edit Profile
                  </button>
                </Link>
                <Link to="">
                  <button className="btn btn-outline-danger rounded" onClick={handleDelete}>
                    Delete Profile
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
