const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  try {
    // Check if userid or email already exists
    const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { userid: req.body.userid }] });
    if (existingUser) return res.status(400).json("User ID or Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      userid: req.body.userid,
      email: req.body.email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) { res.status(500).json(err); }
});

// Login
router.post('/login', async (req, res) => {
  try {
    // Find by USERID, not email
    const user = await User.findOne({ userid: req.body.userid });
    if (!user) return res.status(404).json("User not found");
    
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    // Send back details for the Profile Popup (excluding password)
    res.status(200).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        userid: user.userid, 
        email: user.email,
        theme: user.themePreference 
      } 
    });
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;