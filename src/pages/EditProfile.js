import { useState, useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
 
//const API_URL = "http://localhost:5005";



function EditProfile (props){

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { profileId } = useParams();            
    const navigate = useNavigate();  

    useEffect(() => {                                  
        axios
          .get(`${process.env.REACT_APP_API_URL}/auth/profile/${profileId}`)
          .then((response) => {
            
            const oneProfile= response.data;
            setName(oneProfile.name);
            setAddress(oneProfile.address);
            setEmail(oneProfile.email);
          })
          .catch((error) => console.log(error));
        
      }, [profileId]);

      const handleFormSubmit = (e) => {                     
        e.preventDefault();
        // Create an object representing the body of the PUT request
        const requestBody = { name, address,email };
     
        // Make a PUT request to update the project
        axios
          .put(`${process.env.REACT_APP_API_URL}/auth/profile/${profileId}`, requestBody)
          .then((response) => {
            // Once the request is resolved successfully and the project
            // is updated we navigate back to the details page
            navigate(`/profile`)
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription)
          }
          );
      };

      return (
        <div className="EditProfilePage">
          <h3>Edit Profile</h3>
     
          <form onSubmit={handleFormSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <label>Address:</label>
            <textarea
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            

     
     <button type="submit">Update Profile</button>
    
   
          </form>
          { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div>

);



}


export default EditProfile