import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const Analytics = () => {
  const [subs, setSubs] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/subscriptions?userId=${userId}`);
        setSubs(res.data);
      } catch (err) { console.error(err); }
    };
    if (userId) fetchSubs();
  }, [userId]);

  const getMonthlyCost = (sub) => {
    if (sub.status === 'Paused') return 0;
    return (sub.price / sub.cycle);
  };

  const getAnnualCost = (sub) => {
    return (sub.price / sub.cycle) * 12;
  };

  const activeSubs = subs.filter(s => s.status === 'Active');

  const barData = activeSubs.map(sub => ({
    name: sub.name,
    cost: parseFloat(getMonthlyCost(sub).toFixed(2)) 
  }));

  const categoryData = activeSubs.reduce((acc, sub) => {
    const existing = acc.find(item => item.name === sub.category);
    const monthly = getMonthlyCost(sub);
    if (existing) {
      existing.value += monthly;
    } else {
      acc.push({ name: sub.category, value: monthly });
    }
    return acc;
  }, []);

  const totalMonthly = activeSubs.reduce((acc, sub) => acc + getMonthlyCost(sub), 0);
  
  const mostExpensive = activeSubs.reduce((prev, current) => 
    (getAnnualCost(prev) > getAnnualCost(current)) ? prev : current, { price: 0, cycle: 1 }
  );
  
  const potentialSavings = getAnnualCost(mostExpensive);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div className="container">
      <h2 style={{ marginBottom: '20px' }}>Analytics & Insights</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
        
        <div className="card" style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', background: '#6200ea', color: 'white' }}>
          <h4 style={{ margin: 0, opacity: 0.8 }}>Total Monthly Cost</h4>
          <h1 style={{ margin: '10px 0', fontSize: '2.5rem' }}>₹{totalMonthly.toFixed(0)}</h1>
          <small>Projected: ₹{(totalMonthly * 12).toFixed(0)} / year</small>
        </div>

        <div className="card" style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
          <h4 style={{ margin: 0, color: '#666' }}>Savings Opportunity</h4>
          <p style={{ margin: '10px 0' }}>
            If you cancel <strong>{mostExpensive.name || "None"}</strong>, you could save:
          </p>
          <h2 style={{ margin: 0, color: 'green' }}>₹{potentialSavings.toFixed(0)} / year</h2>
        </div>

      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        <div className="card" style={{ flex: 1, minWidth: '300px', flexDirection: 'column', alignItems: 'center' }}>
          <h3>Monthly Cost per Subscription</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="var(--text-color)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--text-color)" />
              <Tooltip 
                 formatter={(value) => `₹${value}`}
                 contentStyle={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', borderRadius: '8px' }} 
              />
              <Bar dataKey="cost" fill="#8884d8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ flex: 1, minWidth: '300px', flexDirection: 'column', alignItems: 'center' }}>
          <h3>Spending by Category (Monthly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Analytics;