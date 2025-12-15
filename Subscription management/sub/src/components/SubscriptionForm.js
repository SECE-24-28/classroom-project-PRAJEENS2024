import React, { useState } from 'react';

const SubscriptionForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: '', price: '', date: '', status: 'Active' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.date) return;
    onAdd(form);
    setForm({ name: '', price: '', date: '', status: 'Active' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 sticky top-4">
      <h3 className="text-xl font-bold mb-4">Add Subscription</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Service Name (e.g. Netflix)" className="w-full p-2 border rounded"
          value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">₹</span>
          <input type="number" placeholder="Price" className="w-full p-2 pl-8 border rounded"
            value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
        </div>

        <input type="date" className="w-full p-2 border rounded"
          value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} />

        <select className="w-full p-2 border rounded bg-white"
          value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Add Subscription
        </button>
      </form>
    </div>
  );
};
export default SubscriptionForm;