import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Star, Trash2, Edit2, Plus, Filter, PauseCircle, PlayCircle, ChevronDown } from 'lucide-react'; 
import AddSubscription from '../components/AddSubscription';

const Dashboard = () => {
  const navigate = useNavigate();
  const [subs, setSubs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) navigate('/login');
    else fetchSubs();
    // eslint-disable-next-line
  }, [userId, navigate]);

  const fetchSubs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/subscriptions?userId=${userId}`);
      setSubs(res.data.sort((a, b) => Number(b.isStarred) - Number(a.isStarred)));
    } catch (err) { console.error(err); }
  };

  const togglePause = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    await axios.put(`http://localhost:5000/api/subscriptions/${id}`, { status: newStatus });
    fetchSubs();
  };

  const calculateMonthlyCost = (price, cycle) => {
    return (price / cycle);
  };

  const getDaysRemaining = (startDate, cycleMonths) => {
    const start = new Date(startDate);
    const today = new Date();
    let nextBill = new Date(start);
    while (nextBill < today) {
      nextBill.setMonth(nextBill.getMonth() + Number(cycleMonths));
    }
    return Math.ceil((nextBill - today) / (1000 * 60 * 60 * 24)); 
  };

  const toggleStar = async (id, currentStatus) => {
    await axios.put(`http://localhost:5000/api/subscriptions/${id}`, { isStarred: !currentStatus });
    fetchSubs();
  };

  const deleteSub = async (id) => {
    if (window.confirm("Delete this subscription?")) {
      await axios.delete(`http://localhost:5000/api/subscriptions/${id}`);
      fetchSubs();
    }
  };

  const filteredSubs = subs.filter(sub => {
    if (filter === 'All') return true;
    if (filter === 'Starred') return sub.isStarred;
    return sub.status === filter;
  });

  const totalCost = filteredSubs
    .filter(sub => sub.status === 'Active')
    .reduce((acc, sub) => acc + calculateMonthlyCost(sub.price, sub.cycle), 0);

  return (
    <div className="container">
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>Dashboard</h2>
          <p style={{ margin: '5px 0 0 0' }}>Manage your recurring expenses</p>
        </div>
        <div className="card" style={{ padding: '15px 25px', marginBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
           <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Monthly Cost</span>
           <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)' }}>₹{totalCost.toFixed(0)}</span>
        </div>
      </div>

      {/* CONTROLS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        <button className="btn" onClick={() => { setEditingSub(null); setShowForm(!showForm); }}>
          <Plus size={18} /> {showForm ? "Close Form" : "Add Subscription"}
        </button>

        {/* CUSTOM FILTER DROPDOWN */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Filter size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)', zIndex: 1 }} />
          
          <select 
            className="custom-select"
            onChange={(e) => setFilter(e.target.value)} 
            value={filter}
          >
            <option value="All">All Subscriptions</option>
            <option value="Active">Active Only</option>
            <option value="Paused">Paused Only</option>
            <option value="Starred">Favorites</option>
          </select>
          
          <ChevronDown size={16} style={{ position: 'absolute', right: '12px', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        </div>
      </div>

      {showForm && (
        <AddSubscription 
          initialData={editingSub}
          onAdded={() => { fetchSubs(); setShowForm(false); setEditingSub(null); }} 
          onCancel={() => { setShowForm(false); setEditingSub(null); }} 
        />
      )}

      {/* CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredSubs.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No subscriptions found.</p>
        ) : (
          filteredSubs.map((sub) => {
            const daysLeft = getDaysRemaining(sub.startDate, sub.cycle); 
            const isPaused = sub.status === 'Paused';

            return (
              <div key={sub._id} className="card" style={{ 
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', 
                opacity: isPaused ? 0.6 : 1, 
                border: isPaused ? '1px dashed #ccc' : 'inherit'
              }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div 
                      onClick={() => toggleStar(sub._id, sub.isStarred)}
                      style={{ cursor: 'pointer', paddingTop: '2px' }}
                    >
                      <Star size={20} fill={sub.isStarred ? "#F59E0B" : "none"} color={sub.isStarred ? "#F59E0B" : "var(--text-muted)"} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{sub.name}</h3>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {sub.category} • {isPaused ? "(Paused)" : `${sub.cycle} Month Cycle`}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{sub.price}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isPaused ? "Status" : "Renews in"}</span>
                    <span style={{ fontWeight: '600', color: isPaused ? 'var(--text-muted)' : (daysLeft < 3 ? 'var(--danger)' : 'var(--text-color)') }}>
                      {isPaused ? "Paused" : `${daysLeft} days`}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => togglePause(sub._id, sub.status)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }} title={isPaused ? "Resume" : "Pause"}>
                      {isPaused ? <PlayCircle size={18} /> : <PauseCircle size={18} />}
                    </button>
                    
                    <button onClick={() => { setEditingSub(sub); setShowForm(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-color)' }}>
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => deleteSub(sub._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

              </div>
            )
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;