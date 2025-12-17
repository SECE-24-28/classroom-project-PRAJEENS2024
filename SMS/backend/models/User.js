const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },    // New Field
  userid: { type: String, required: true, unique: true }, // New Field (Unique Handle)
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  themePreference: { type: String, default: 'light' }
});

module.exports = mongoose.model('User', UserSchema);