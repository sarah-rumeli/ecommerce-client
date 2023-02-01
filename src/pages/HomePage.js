import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const numProducts = 5;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(response => response.json())
      .then(data => setProducts(data.slice(0, numProducts)))
      .catch(error => console.error(error));
  }, []);

  //useEffect(() => {
  //  $('.carousel').carousel();
  //}, []);

    return (
      <div className="container-fluid">
        <div id="ecomartsCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            {/* Start loop here */}
            {products.map((product, index) => (
              <div key={product.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                
                
                  <div className="img-wrapper">
                    <img src={product.img} className="d-block w-100" alt={product.name} />
                  </div>
                
              </div>
            ))}
            {/* End loop here */}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#ecomartsCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#ecomartsCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  }
   
  export default HomePage;