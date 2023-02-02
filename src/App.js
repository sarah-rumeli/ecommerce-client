import "./App.css";
import NavBar from "./components/NavBar";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";


import EditOrderPage from './pages/EditOrderPage';

import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import EditProductPage from "./pages/EditProductPage";


import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import AddOrder from './components/AddOrder';
import DisplayOrderPage from './components/DisplayOrderPage';
//import DisplayOrderPage from './components/DisplayOrderPage';
//import SpecificOrder from './components/SpecificOrder';

import CartPage from "./components/CartPage";
import { CartProviderWrapper } from "./context/cart.context";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import EditComment from "./components/EditComment";

function App() {
  return (
    <div className="App">
      <CartProviderWrapper>
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<IsPrivate><UserProfile /></IsPrivate>} />
          <Route path="/profile/edit/:profileId" element={<EditProfile />} />
          <Route path="/profile/delete/:profileId" element={<EditProfile />} />

          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/products/edit/:productId" element={<IsPrivate><EditProductPage /></IsPrivate>} />

          <Route path="/orders/:productId" element={<IsPrivate><AddOrder /></IsPrivate>} />
          <Route path="/orders" element={<IsPrivate><DisplayOrderPage /></IsPrivate>} />
          <Route path="/orders/edit/:orderId" element={<IsPrivate><EditOrderPage /></IsPrivate>} />

          <Route path="/cart" element={<CartPage/>} />
          <Route path="/cart/checkout" element={<Checkout/>} />
          
          <Route path="/:productId/comments/:commentId/edit" element={<EditComment/>} />

          {/* Change to a nice 404 page */}
          <Route path="*" element={<h1>404: Sorry, this route does not exist.</h1>} />

        </Routes>
        <Footer />
      </CartProviderWrapper>
    </div>
  );
}

export default App;
