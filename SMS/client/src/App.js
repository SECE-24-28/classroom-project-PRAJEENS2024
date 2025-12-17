import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { Sun, Moon, User, LogOut, PieChart, Layers } from 'lucide-react'; 
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile'; 
import Analytics from './pages/Analytics';
import './App.css';

const Navbar = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userProfile");
    if (data) setUserProfile(JSON.parse(data));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; 
  };

  return (
    <nav style={{ 
      padding: '0 2rem', 
      height: '70px',
      display:'flex', 
      justifyContent:'space-between', 
      alignItems: 'center',
      background: 'var(--primary)', 
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* LOGO AREA - Renamed to Billora */}
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} 
        onClick={() => navigate('/')}
      >
        <Layers size={28} color="white" />
        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: 'white' }}>Billora</h1>
      </div>
      
      {/* RIGHT CONTROLS */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        
        <button onClick={toggleTheme} className="theme-toggle" title="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {userProfile && (
          <>
            <div 
              onClick={() => navigate('/analytics')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }} 
              title="Analytics"
            >
              <PieChart size={24} color="white" />
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Analytics</span>
            </div>

            <div 
              onClick={() => navigate('/profile')}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'rgba(255,255,255,0.15)',
                padding: '5px 15px 5px 5px',
                borderRadius: '30px',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'white', color: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
              }}>
                <User size={18} />
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{userProfile.name.split(' ')[0]}</span>
            </div>

             <button 
                onClick={handleLogout} 
                style={{ 
                    background: 'white', 
                    border: 'none', 
                    cursor: 'pointer', 
                    color: 'red',
                    padding: '6px',
                    borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} 
                title="Logout"
             >
                <LogOut size={20} />
             </button>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;