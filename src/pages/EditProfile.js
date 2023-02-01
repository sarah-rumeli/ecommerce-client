import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
//const API_URL = "http://localhost:5005";

console.log("********* EditProfile.js ***************");
function EditProfile(props) {
  const {
    isLoggedIn,
    isLoading,
    user,
    authenticateUser,
    removeToken,
    storeToken,
  } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { profileId } = useParams();
  const navigate = useNavigate();

  removeToken();
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/profile/${profileId}`
        )
      .then((response) => {
        const oneProfile = response.data;
        setName(oneProfile.name);
        setAddress(oneProfile.address);
        setEmail(oneProfile.email);
      })
      .catch((error) => console.log(error));
  }, [profileId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { name, address, email };

    // Make a PUT request to update the project
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/auth/profile/${profileId}`,
        requestBody
      )
      .then((response) => {
        console.log("response from server...", response.data.authToken);
        storeToken(response.data.authToken);

        authenticateUser();
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/profile`);
      })
      .catch((error) => {
        console.log("error response from server...");
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div style ={{width:"60%",marginLeft:"20vw"}}>
      <h3>Edit Profile</h3>

      <form onSubmit={handleFormSubmit}>
      <div className="form-outline mb-4">
      <label className="form-label" for="form4Example1">Name:</label>
        <input
          type="text"
          id="form4Example1" className="form-control"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
         
 </div>

 <div className="form-outline mb-4">
 <label classname="form-label" for="form4Example2">Email:</label>
        <input
          type="email"
          id="form4Example2" className="form-control"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

</div>
 <div className="form-outline mb-4">
 <label className="form-label" for="form4Example3">Address:</label>
        <textarea
          name="address"
          className="form-control" id="form4Example3" rows="4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">Update Profile</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default EditProfile;
