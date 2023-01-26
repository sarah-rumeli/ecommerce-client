import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";

import AddProduct from "../components/AddProduct";

//const API_URL = "http://localhost:5005";

function ProductListPage() {

  const { isLoggedIn, user,logOutUser} = useContext(AuthContext); 


    const [products, setProducts] = useState([]);
   
    const getAllProducts = () => {
      axios
        .get( `${process.env.REACT_APP_API_URL}/api/products`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error));
    };
    useEffect(() => {
        getAllProducts();
      }, [] );

      return (
        <div className="ProductListPage">

        <div>


        {isLoggedIn && (
          <AddProduct refreshProducts={getAllProducts} />
        )}


        

        </div>
          
            {products.map((product) => {
              return (
                <div className="ProductCard card" key={product._id} >
                <h3>{product.name}</h3>


                  <Link to={`/products/${product._id}`}>
                    <button>More Details</button>
                  </Link>
                </div>
              );
            })}     
           
        </div>
      );
    }

    export default ProductListPage;