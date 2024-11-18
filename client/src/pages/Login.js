import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast, { Toaster } from 'react-hot-toast';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', { email, password });
      if (res.data && res.data.success) { // Check for success
        toast.success(res.data.message);
        setAuth({ user: res.data.user, token: res.data.token });
        localStorage.setItem('token', res.data.token);
        navigate(location.state || '/'); // Use route path
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Email or Password');
    }
  };

  useEffect(() => {
    document.body.classList.add('loginBody');
    return () => {
      document.body.classList.remove('loginBody');
    };
  }, []);

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <div className="login-container">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className='labe' htmlFor="email">Email</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className='labe' htmlFor="password">Password</label>
            </div>
            <button type="submit" className="btn btn-login btn-block">Login</button>
            <div className="options">
              <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
