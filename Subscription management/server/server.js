const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- MOCK DATABASE ---
let users = []; // Stores registered users { email, password }
let subscriptions = [
    { id: 1, name: 'Netflix Premium', price: 649, date: '2026-10-01', status: 'Active' },
    { id: 2, name: 'Spotify Duo', price: 149, date: '2026-01-05', status: 'Active' },
    { id: 3, name: 'Amazon Prime', price: 1499, date: '2025-12-31', status: 'Paused' }
];

// --- AUTH ROUTES ---

// Register
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    const userExists = users.find(u => u.email === email);
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = { id: Date.now(), email, password };
    users.push(newUser);
    res.json({ message: 'User registered successfully' });
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.json({ message: 'Login success', user: { email: user.email } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// --- SUBSCRIPTION ROUTES ---
app.get('/api/subscriptions', (req, res) => {
    res.json(subscriptions);
});

app.post('/api/subscriptions', (req, res) => {
    // Add default status 'Active' if not provided
    const newSub = { 
        id: Date.now(),
        name: req.body.name,
        price: parseFloat(req.body.price),
        date: req.body.date,
        status: req.body.status || 'Active' 
    };
    subscriptions.push(newSub);
    res.json(newSub);
});

app.delete('/api/subscriptions/:id', (req, res) => {
    const { id } = req.params;
    subscriptions = subscriptions.filter(sub => sub.id != id);
    res.json({ message: 'Deleted successfully' });
});

// Restart Server for changes to take effect
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});