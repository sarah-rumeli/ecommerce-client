import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import "../App.css";

import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function UserProfile() {
  const { isLoggedIn, isLoading, user, authenticateUser } =
    useContext(AuthContext);
  const [profile, setProfile] = useState(user);

  return (
    <>
      {isLoading ? (
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="profileDetails">
          <section
            className="vh-90"
            style={{ backgroundColor: "beige", marginBottom: "0px" }}
          >
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-6 mb-4 mb-lg-0">
                  <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                    <div className="row g-0">
                      <div
                        className="col-md-4 gradient-custom text-center text-dark"
                        style={{
                          borderTop: ".5rem",
                          borderLeft: ".5rem",
                          borderRadius: ".5rem",
                        }}
                      >
                        <img
                          src="https://res.cloudinary.com/dq4j6xfee/image/upload/v1675019968/ecommerce/ywin8hopopdpju0askr3.jpg"
                          alt="Avatar"
                          class="img-fluid my-5"
                          style={{ width: "80px" }}
                        />
                        <h4> {user.name}</h4>

                        <i className="far fa-edit mb-5"></i>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body p-4">
                          <h6>Information</h6>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>Email</h6>
                              <p className="text-muted">{user.email}</p>
                            </div>

                            <div className="col-6 mb-3">
                              <h6>Address:</h6>
                              <p className="text-muted">{user.address}</p>
                            </div>
                          </div>

                          {/* <h6>Status </h6>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            <div
                              className="col-6 mb-3"
                              style={{ textAlign: "center", marginLeft: "6vw" }}
                            >
                              <h6 style={{ textAlign: "center" }}>
                                {" "}
                                Admin:
                                {user.isAdmin === false ? (
                                  <h5 className="text-muted">false</h5>
                                ) : (
                                  <h5 className="text-muted">true</h5>
                                )}
                              </h6> */}
                            {/* </div>
                          </div> */}

                          <div className="d-flex justify-content-center">
                            <Link to={`/profile/edit/${user._id}`}>
                              <button
                                className="btn btn-outline-dark rounded"
                                style={{ marginRight: "1vw" }}
                              >
                                Edit Profile
                              </button>
                            </Link>
                            <Link to="">
                              <button className="btn btn-outline-danger rounded">
                                Delete Profile
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default UserProfile;
