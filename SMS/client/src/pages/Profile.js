import React, { useEffect, useState } from 'react';
import { User, Mail, AtSign, Lock } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("userProfile");
    if (data) setUser(JSON.parse(data));
  }, []);

  if (!user) return <div className="container">Loading Profile...</div>;

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
      <div style={{ 
        width: '100%', maxWidth: '600px', 
        background: 'var(--card-bg)', borderRadius: '12px', 
        boxShadow: 'var(--shadow)', overflow: 'hidden'
      }}>
        
        <div style={{ background: 'var(--primary)', padding: '30px', color: 'white', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '50%' }}>
             <User size={40} color="white" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'white' }}>My Profile</h2>
            <p style={{ margin: '5px 0 0 0', opacity: 0.9, color: 'rgba(255,255,255,0.8)' }}>Read-Only Account View</p>
          </div>
        </div>

        <div style={{ padding: '30px' }}>
          <div style={rowStyle}>
            <div className="profile-label" style={labelStyle}><User size={18} /> Full Name</div>
            <div className="profile-value">{user.name}</div>
          </div>
          <div style={rowStyle}>
            <div className="profile-label" style={labelStyle}><AtSign size={18} /> Username</div>
            <div className="profile-value">@{user.userid}</div>
          </div>
          <div style={rowStyle}>
            <div className="profile-label" style={labelStyle}><Mail size={18} /> Email Address</div>
            <div className="profile-value">{user.email}</div>
          </div>
          <div style={{ ...rowStyle, borderBottom: 'none' }}>
            <div className="profile-label" style={labelStyle}><Lock size={18} /> Password</div>
            <div className="profile-value" style={{ letterSpacing: '2px' }}>••••••••••••••</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const rowStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '20px 0', borderBottom: '1px solid #eee'
};
const labelStyle = { display: 'flex', alignItems: 'center', gap: '10px' };

export default Profile;