
import './App.css';
import NavBar from './components/NavBar';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage"; 

import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import EditProductPage from './pages/EditProductPage';

import IsAnon from './components/IsAnon';
import IsPrivate from "./components/IsPrivate";
import AddOrder from './components/AddOrder';

function App() {
  return (
    <div className="App">
   <NavBar/>

   <Routes>      
        <Route path="/" element={ <HomePage /> } />

        <Route path="/signup" element={ <SignupPage /> } /> 
        <Route path="/login" element={ <LoginPage /> } />

        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/products/edit/:productId" element={<IsPrivate> <EditProductPage /> </IsPrivate>} />
        <Route path="/orders/:productId" element={<IsPrivate> <AddOrder /> </IsPrivate>} />
      </Routes>




    </div>
  );
}

export default App;
