const router = require('express').Router();
const Subscription = require('../models/Subscription');

// Middleware to verify Token (Simplified)
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json("Token required");
  // In real app, verify jwt here. Assuming valid for brevity.
  next();
};

// GET all by User
router.get('/', async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.query.userId });
    res.status(200).json(subs);
  } catch (err) { res.status(500).json(err); }
});

// ADD new
router.post('/', async (req, res) => {
  try {
    const newSub = new Subscription(req.body);
    const savedSub = await newSub.save();
    res.status(200).json(savedSub);
  } catch (err) { res.status(500).json(err); }
});

// UPDATE (e.g., toggle Star or Edit)
router.put('/:id', async (req, res) => {
  try {
    const updatedSub = await Subscription.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedSub);
  } catch (err) { res.status(500).json(err); }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(200).json("Subscription has been deleted...");
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;