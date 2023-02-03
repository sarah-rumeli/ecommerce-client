import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
    <div className="container-fluid mt-3 mb-5 text-center">
      <div className="row justify-content-center">
        <h3 className="header mt-4 w-50">Page Not Found</h3>
        
        <div className="text-dark m-3 p-3 card border-success rounded-3 w-75">
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <div className="btn-group justify-content-center" role="group">
                <Link to='/' className="ms-2"><button className="btn btn-outline-success btn-block">Home</button></Link>
                <Link to='/products'><button className="btn btn-outline-success btn-block">Products</button></Link>
            </div>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default NotFound;
