import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "../../styles/Dashboard.css";
import { useAuth } from "../../context/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { auth, setAuth } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("DashBody");
    return () => {
      document.body.classList.remove("DashBody");
    };
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("auth");
    toast.success("Logged out Successfully");
    navigate('/login');
  };

  return (
    <Layout showHeader={true} showFooter={true}>
      <div className="completedash">
        <div className="sidebar">
          <div className="sidebar-header">
            <FontAwesomeIcon icon={faUser} />
            <div className='heading_sidebar'>
              {auth?.user?.name}
            </div>
          </div>
          <ul className="sidebar-menu">
            <li className="sidebar-menu-item" onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faHome} /> Home
            </li>
            <li
              className={`sidebar-menu-item ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => handleSectionClick("profile")}
            >
              <FontAwesomeIcon icon={faUser} /> Profile
            </li>
            <li className="sidebar-menu-item" onClick={() => navigate('/orders')}>
              My Orders
            </li>
            <li className="sidebar-menu-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </li>
          </ul>
        </div>
        <div className="content">
          <h1>Welcome to Hastavem, {auth?.user?.name}</h1>
          {activeSection === "profile" && (
            <div className="dashboard-section profile-section">
              <h2>Profile</h2>
              <div>
                <p><strong>Name:</strong> {auth?.user?.name}</p>
                <p><strong>Email:</strong> {auth?.user?.email}</p>
                <p><strong>Phone:</strong> {auth?.user?.phone}</p>
              </div>
            </div>
          )}
          {activeSection === "orders" && (
            <div className="dashboard-section orders-section">
              <h2>Orders</h2>
              <p>Your orders will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
