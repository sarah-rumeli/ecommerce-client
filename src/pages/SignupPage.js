import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, address };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container-fluid mt-3 mb-5 text-center">
      <div className="row justify-content-center">
        <h3 className="header mt-4 w-50">Signup</h3>
        <div className="text-dark m-3 p-3 card border-success rounded-3 w-75">

          <form onSubmit={handleSignupSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label">Email:</label>
              <input className="form-control" type="email" name="email" value={email} onChange={handleEmail} />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Password:</label>
              <input className="form-control" type="password" name="password" value={password} onChange={handlePassword} />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Name:</label>
              <input className="form-control" type="text" name="name" value={name} onChange={handleName} />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Address:</label>
              <input className="form-control" type="text" name="address" value={address} onChange={handleAddress} />
            </div>
            <div className="form-outline mb-4">
              <button type="submit" className="btn btn-outline-success btn-block mb-4">Sign Up</button>
            </div>
          </form>

          <div align="center">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>

          <p>Already have account?</p>
          <Link to={"/login"}><button className="badge rounded-pill bg-success text-white border-0">Login</button></Link>


        </div>
      </div>
    </div>
  );
}

export default SignupPage;
