import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//const API_URL = "http://localhost:5005";

function CategoryList() {
    const [categories, setCategories] = useState([]);
   
    const getAllCategories = () => {
      axios
        .get("http://localhost:5005/api/category")
        .then((response) => setCategories(response.data))
        .catch((error) => console.log(error));
    };
    useEffect(() => {
        getAllCategories();
      }, [] );

      return (
        <div className="CategoryList">
          
            {categories.map((category) => {
              return (
                <div className="CategoryCard card" key={category._id} >
                  <Link to={`/categories/${category._id}`}>
                    <h3>{category.name}</h3>
                  </Link>
                </div>
              );
            })}     
           
        </div>
      );
    }

    export default CategoryList;