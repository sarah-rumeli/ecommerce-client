
import './App.css';
import NavBar from './components/NavBar';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import CategoryList from './components/CategoryList';
function App() {
  return (
    <div className="App">
   <NavBar/>

   <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/categories" element={<CategoryList />} />
      </Routes>




    </div>
  );
}

export default App;
