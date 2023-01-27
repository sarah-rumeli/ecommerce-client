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
import DisplayOrderPage from './components/DisplayOrderPage ';
import SpecificOrder from './components/SpecificOrder';


function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/edit/:profileId" element={<EditProfile />} />
        <Route path="/profile/delete/:profileId" element={<EditProfile />} />

        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/products/edit/:productId" element={<IsPrivate> {" "} <EditProductPage /> {" "} </IsPrivate>} />
        <Route path="/orders/:productId" element={<IsPrivate> {" "} <AddOrder /> {" "} </IsPrivate>} />

       
        <Route path="/orders" element={<DisplayOrderPage />} />
        <Route path="/orders/edit/:orderId" element={ <EditOrderPage />} />
       

        
      </Routes>
    </div>
  );
}

export default App;
