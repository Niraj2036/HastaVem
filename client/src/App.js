import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import Cart from "./pages/Cart.js";
import ProductDetail from './pages/ProductDetail.js';
import Wishlist from './pages/Wishlist.js';
import Orders from './pages/Orders.js';
import ArtisanProfile from './pages/ArtisanProf.js';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/artisan/:id" element={<ArtisanProfile/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/orders" element={<Orders/>}/>
        
      </Routes>
  );
}

export default App;
