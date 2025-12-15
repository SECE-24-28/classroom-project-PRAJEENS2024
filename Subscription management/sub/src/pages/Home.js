import React, { useState } from 'react';
import '../App.css'; // Importing styles from src/App.css

const Home = () => {
  // --- 1. STATE ---
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: 'Netflix Premium', price: 649, date: '2023-10-01', status: 'Active' },
    { id: 2, name: 'Amazon Prime', price: 1499, date: '2023-12-31', status: 'Paused' },
  ]);

  const [form, setForm] = useState({ name: '', price: '', date: '', status: 'Active' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  // --- 2. HANDLERS ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATION: Date must be in the future
    const selectedDate = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      setError("Error: Subscription end date must be in the future.");
      return;
    }

    // VALIDATION: Duplicate Name Check
    const isDuplicate = subscriptions.some(
      (sub) => sub.name.toLowerCase() === form.name.toLowerCase() && sub.id !== editingId
    );

    if (isDuplicate) {
      setError("Error: A subscription with this name already exists.");
      return;
    }

    // SAVE DATA
    if (editingId) {
      // Update existing
      setSubscriptions(subscriptions.map((sub) => 
        sub.id === editingId ? { ...form, id: editingId } : sub
      ));
      setEditingId(null);
    } else {
      // Add new
      const newSub = { ...form, id: Date.now() };
      setSubscriptions([...subscriptions, newSub]);
    }

    // Reset Form
    setForm({ name: '', price: '', date: '', status: 'Active' });
  };

  const handleEdit = (sub) => {
    setEditingId(sub.id);
    setForm(sub);
    setError('');
  };

  const handleDelete = (id) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  // --- 3. UI RENDER ---
  return (
    <div className="dashboard-container">
      <div className="main-content">
        {/* FORM SECTION */}
        <div className="form-card">
          <h3>{editingId ? 'Edit Subscription' : 'Add Subscription'}</h3>
          {error && <p className="error-msg">{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <input 
              type="text" name="name" placeholder="Service Name" 
              value={form.name} onChange={handleChange} required 
            />
            <input 
              type="number" name="price" placeholder="Price" 
              value={form.price} onChange={handleChange} required 
            />
            <input 
              type="date" name="date" 
              value={form.date} onChange={handleChange} required 
            />
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">{editingId ? 'Update' : 'Add'}</button>
              {editingId && (
                <button type="button" className="cancel-btn" onClick={() => {
                  setEditingId(null);
                  setForm({ name: '', price: '', date: '', status: 'Active' });
                }}>Cancel</button>
              )}
            </div>
          </form>
        </div>

        {/* LIST SECTION */}
        <div className="list-card">
          <h3>Your Subscriptions</h3>
          <div className="sub-list">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="sub-item">
                <div className="sub-info">
                  <h4>{sub.name} <span className={`badge ${sub.status.toLowerCase()}`}>{sub.status}</span></h4>
                  <p>Next Bill: {sub.date}</p>
                </div>
                <div className="sub-actions">
                  <span className="price">₹{sub.price}</span>
                  <button onClick={() => handleEdit(sub)} className="icon-btn edit">✎</button>
                  <button onClick={() => handleDelete(sub.id)} className="icon-btn delete">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;