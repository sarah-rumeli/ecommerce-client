import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function UserProfile() {
  const { isLoggedIn, isLoading, user, authenticateUser } =
    useContext(AuthContext);
   const [profile, setProfile] = useState(user);

   console.log("User obj", user);
  // console.log(isLoggedIn);
   const getCurrentUser = () => {
    const storedToken = localStorage.getItem("authToken");
  //   console.log("stored token", storedToken);

    if (isLoggedIn) {
     axios
        .get(`${API_URL}/auth/profile/${profile._id}`, {
       headers: { Authorization: `Bearer ${storedToken}` },
         })
       .then((response) => {
         const oneProfile = response.data;
        setProfile(oneProfile);
        })
         .catch((error) => console.log(error));
     }
   };
   useEffect(() => {
  getCurrentUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <p> Loading....</p>
      ) : (
        <div className="profileDetails">
          
          <h4> {profile.name}</h4>
           <h5> Email: {profile.email}</h5>
           <h5> Address:{profile.address}</h5>
           <Link to={`/profile/edit/${profile._id}`}>Edit Profile</Link>
           <Link to = "">Delete Profile</Link>
        </div>
      )}
    </>
  );
}

export default UserProfile;
