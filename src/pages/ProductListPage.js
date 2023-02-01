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
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="input-group row justify-content-center">
      <div className="form-outline" style ={{width:"25%", marginTop:"2vw" ,display:"flex"}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" style={{margin:"1vw"}}>
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
      <input type="search" id="form1" className="form-control rounded" placeholder = {"Search"} value={searchTerm} onChange={handleSearchTermChange} />
     
      </div>
      
      </div>
        {filteredProducts.map((product) => {
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
                <p className="card-text">
                 Price: {product.price} &euro;
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
