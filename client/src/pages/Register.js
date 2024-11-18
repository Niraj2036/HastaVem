import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast"; // Import Toaster here to include it in the render
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; // Make sure the path is correct

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
        phone: mobileNo
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add('Signupbody');

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('Signupbody');
    };
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <div className="register-container">
          <h2 className="text-center mb-4">Register</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSignup}>
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                className="form-control" 
                id="name" 
                placeholder=" " 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
              />
                       
       <label className='labe' htmlFor="name">Name</label>
            </div>

            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                className="form-control" 
                id="email" 
                placeholder=" " 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className='labe' htmlFor="email">Email</label>
            </div>

            <div className="form-group">
              <input 
                type="tel" 
                name="mobileNo" 
                className="form-control" 
                id="mobileNo" 
                placeholder=" " 
                value={mobileNo} 
                onChange={(e) => setMobileNo(e.target.value)}
                required
              />
              <label className='labe' htmlFor="mobileNo">Phone No.</label>
            </div>

            <div className="form-group">
              <input 
                type="password" 
                name="password" 
                className="form-control" 
                id="password" 
                placeholder=" " 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className='labe' htmlFor="password">Password</label>
            </div>

            <div className="form-group">
              <input 
                type="password" 
                name="confirmPassword" 
                className="form-control" 
                id="confirmPassword" 
                placeholder=" " 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label className='labe' htmlFor="confirmPassword">Confirm Password</label>
            </div>

            <button type="submit" className="btn-register btn btn-block">Register</button>
            <p className="options text-center mt-2 mb-0">
              Already have an account?<a href="/login" style={{ color: '#ed2939' }}>Login here</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
