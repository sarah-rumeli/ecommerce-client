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
      <>
        <div className="container-fluid my-3">
          <div id="ecomartsCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              {/* Start loop here */}
              {products.map((product, index) => (
                <div key={product._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  
                  <img src={product.img} className="d-block w-100 ratio border-3" alt={product.name} />
                  
                  <Link to={`/products/${product._id}`} className="overlay">
                    <h1 className="cart-header text-truncate">
                      {product.name}
                    </h1>
                  </Link>
                </div>
              ))}
              {/* End loop here */}
            </div>
            <button className="carousel-control-prev bg-control-prev" type="button" data-bs-target="#ecomartsCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next bg-control-next" type="button" data-bs-target="#ecomartsCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="container-fluid my-5">
          <div className="row mx-5 px-5 d-flex justify-content-center">
            <div className="col-10 border border-success rounded-3 pt-4 px-4 text-start shadow">
              <p className="fs-5">ecoMarts is an e-commerce platform that focuses on offering eco-friendly and sustainable products.</p>
              
              <p className="fs-5">Our mission is to make it easier for consumers to make responsible purchasing decisions, without sacrificing quality or style. We believe that every purchase has the power to make a positive impact on the planet, and we are committed to curating a selection of products that align with this mission.</p>
              
              <p className="fs-5">From reusable water bottles to organic cotton clothing, you'll find a range of items that will help you live a more sustainable lifestyle, while still looking and feeling your best.</p>
            </div>
          </div>
        </div>
      </>
    );
  }
   
  export default HomePage;