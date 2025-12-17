import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubscription = ({ onAdded, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Entertainment',
    startDate: '',
    cycle: 1
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (initialData) {
      const formattedDate = new Date(initialData.startDate).toISOString().split('T')[0];
      setFormData({ ...initialData, startDate: formattedDate });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await axios.put(`http://localhost:5000/api/subscriptions/${initialData._id}`, formData);
        alert("Subscription Updated!");
      } else {
        await axios.post('http://localhost:5000/api/subscriptions', { ...formData, userId });
        alert("Subscription Added!");
      }
      onAdded(); 
    } catch (err) {
      console.error(err);
      alert("Error saving subscription");
    }
  };

  return (
    <div className="card" style={{ flexDirection: 'column', alignItems: 'flex-start', background: 'var(--card-bg)', border: '1px solid #ddd' }}>
      <h3>{initialData ? "Edit Subscription" : "Add New Subscription"}</h3>
      <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="name" value={formData.name} placeholder="Name (e.g. Netflix)" onChange={handleChange} required style={{padding: '8px'}} />
        
        {/* Updated Placeholder for Rupees */}
        <input type="number" name="price" value={formData.price} placeholder="Price in ₹ (e.g. 150)" onChange={handleChange} required style={{padding: '8px'}} />
        
        <select name="category" value={formData.category} onChange={handleChange} style={{padding: '8px'}}>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Work">Work</option>
          <option value="Utilities">Utilities</option>
          <option value="Education">Education</option>
        </select>

        <label>Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required style={{padding: '8px'}} />

        <label>Billing Cycle (Months):</label>
        <select name="cycle" value={formData.cycle} onChange={handleChange} style={{padding: '8px'}}>
          <option value="1">Monthly (1)</option>
          <option value="3">Quarterly (3)</option>
          <option value="12">Yearly (12)</option>
        </select>

        <div style={{marginTop: '10px'}}>
          <button type="submit" className="btn" style={{marginRight: '10px'}}>
            {initialData ? "Update" : "Save"}
          </button>
          <button type="button" onClick={onCancel} style={{padding: '8px 16px', cursor: 'pointer'}}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddSubscription;