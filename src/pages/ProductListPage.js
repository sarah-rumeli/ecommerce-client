import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import AddProduct from "../components/AddProduct";

//const API_URL = "http://localhost:5005";

function ProductListPage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  const getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {products.map((product) => {
          return (
            <div className="card border-success mt-3 mx-3 p-0 col-xl-3 col-lg-3 col-md-5 col-sm-10 col-10 shadow" key={product._id}>
              {product.img && (
                <img src={product.img} className="card-img-top bg-dark m-0 ml-n1 p-n1" />
              )}
              {!product.img && (
                <img src="https://res.cloudinary.com/dsw3axyzs/image/upload/v1673616382/lifehack-project/alzqyx6cfvtlys1lxegz.jpg" className="card-img-top ml-0 p-0" />
              )}
              <div className="card-body">
                <h5 className="text-success">{product.name}</h5>
                <p className="card-text">
                  {product.description}
                </p>
              </div>
              <div className="card-footer-light bg-transparent border-success">
                <Link to={`/products/${product._id}`}>
                  <button className="btn btn-secondary mb-3">More Details</button>
                </Link>
              </div>
            </div>
          );
        })}

        {isLoggedIn && <AddProduct refreshProducts={getAllProducts} />}
      </div>
    </div>
  );
}

export default ProductListPage;
