import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    userid: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert("Registration Successful! Please Login.");
      navigate('/login');
    } catch (err) {
      alert("Error registering. User ID or Email might be taken.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <div className="card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required style={{ padding: '10px' }} />
          <input type="text" name="userid" placeholder="User ID (Unique Handle)" onChange={handleChange} required style={{ padding: '10px' }} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ padding: '10px' }} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ padding: '10px' }} />
          
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;