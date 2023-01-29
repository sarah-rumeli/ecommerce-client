import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

function CartPage() {
  console.log("******** CartPage.js clg**********");
  const { isLoading } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  let totalQuantity = 0;
  let totalPrice = 0;
  if (cartItems && cartItems.length > 0) {
    useEffect(() => {
      setProducts(cartItems[0].products);
    }, []);
    
    console.log("products: ", products);
    totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
    totalPrice = products.reduce((acc, product) => acc + (product.quantity * product.price), 0);
  }
 
  console.log("cartItems: ", cartItems);
  console.log("totalQuantity: ", totalQuantity);

  return (
    <>
    <h1>Cart</h1>
    {!isLoading &&
      <div className="CartPage">
        {products.map((product) => {
          return (
            <div className="CartCard card" key={product.id}>
                <div>
                  <div>Product Name: {product.name} (€ {product.price} each)</div>
                  <div>Quantity:{product.quantity}</div>
                  <div> x </div>
                  <div>€ {(product.price * product.quantity)}</div>
                </div>
            </div>
          );
        })}
        <h3>Total € {totalPrice}</h3>
        <button>Checkout</button>
      </div>
    
    }
    </>
  );
}

export default CartPage;
