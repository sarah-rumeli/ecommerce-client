import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const numProducts = 5;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(response => response.json())
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, numProducts))
      })
      .catch(error => console.error(error));
  }, []);

    return (
      <div className="container-fluid my-3">
        <div id="ecomartsCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            {/* Start loop here */}
            {products.map((product, index) => (
              <div key={product._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                
                <img src={product.img} className="d-block w-100 ratio border-3" alt={product.name} />
                
                <Link to={`/products/${product._id}`}>
                  <div className="overlay text-truncate">
                    <h2>{product.name}</h2>
                  </div>
                </Link>
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