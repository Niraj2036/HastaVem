import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/header.css';
import { useAuth } from '../../context/auth';
import logo from '../../assets/images/hastavem.png';
import toast from 'react-hot-toast';

const Header = () => {
  const { auth, setAuth } = useAuth();
  const [menuActive, setMenuActive] = useState(false);

  const handleLogout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('token');
    toast.success('Logged out Successfully');
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className='nav_home' >
      <nav className="navbar">
        <div className="navbar-left">
          <div className='namanlogo'>
            <div className="logo-container">
              <img src={logo} alt="CanteenConnect Logo" className="logo" />
            </div>
            <Link to="/" className='sitename'>Hastavem</Link>
          </div>
          <div className={`menu-toggle ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={`navbar-right ${menuActive ? 'active' : ''}`}>
          
          
          {auth.user ? (
            <>
            <Link to="/wishlist" className="nav-button">Wishlist</Link>
            <Link to="/cart" className="nav-button">Cart</Link>
            <Link to="/orders" className="nav-button">My Orders</Link>
              <div className="dropdown">
                <button className="nav-button">{auth.user.name}</button>
                <div className="dropdown-content">
                  <Link to="/dashboard">Profile</Link>
                  <Link onClick={handleLogout} to="/login">Logout</Link>
                </div>
              </div>
       
            </>
          ) : (
            <>
              <div className="sign_btns">
              <Link to="/login" className="nav-button">Login/Signup</Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
