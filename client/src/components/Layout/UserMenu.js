import React ,{useEffect}from 'react';
import '../../styles/UserMenu.css';
import { useAuth } from "../../context/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
    const [auth, setAuth] = useAuth();
    
  return (
    <div className="sidebar">
      <div className="sidebar-header">  
        <div>
      <FontAwesomeIcon icon={faUser} /> 
      </div>
      <div className='heading_sidebar'>
        {auth?.user?.name}</div>
        </div>
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">Profile</li>
        <li className="sidebar-menu-item">Orders</li>
        <li className="sidebar-menu-item"> Orders</li>
      </ul>
    </div>
  );
};

export default Sidebar;
