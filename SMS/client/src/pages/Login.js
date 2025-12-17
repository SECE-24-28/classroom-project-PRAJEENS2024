import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { userid, password });
      
      // Save Token and User Details
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      
      // Save Profile Info for the Navbar
      const profileData = {
        name: res.data.user.name,
        userid: res.data.user.userid,
        email: res.data.user.email
      };
      localStorage.setItem('userProfile', JSON.stringify(profileData));

      alert("Login Successful");
      
      // FIX: Force a page reload so the Navbar updates immediately
      window.location.href = "/"; 
      
    } catch (err) {
      alert("Invalid User ID or Password");
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <div className="card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <input type="text" placeholder="User ID" value={userid} onChange={e => setUserId(e.target.value)} required style={{ padding: '10px' }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '10px' }} />
          
          <button type="submit" className="btn" textAlight>Login</button>
        </form>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          New here? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;