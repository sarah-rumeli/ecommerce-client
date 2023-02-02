import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container-fluid mt-3 mb-5 text-center">
      <div className="row justify-content-center">
        <h3 className="header mt-4 w-50">Login</h3>
        <div className="text-dark m-3 p-3 card border-success rounded-3 w-75">

          <form onSubmit={handleLoginSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label">Email:</label>
              <input className="form-control" type="email" name="email" value={email} onChange={handleEmail} />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">Password:</label>
              <input className="form-control" type="password" name="password" value={password} onChange={handlePassword} />
            </div>
            <div className="form-outline mb-4">
              <button type="submit" className="btn btn-outline-success btn-block mb-4">Login</button>
            </div>
          </form>
          <div align="center">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>

          <p>Don't have an account yet?</p>
          <Link to="/signup"><button className="badge rounded-pill bg-warning text-dark border-0">Sign Up</button></Link>
            
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
