const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., Entertainment, Health
  startDate: { type: Date, required: true },
  cycle: { type: Number, required: true }, // Number of months
  status: { type: String, enum: ['Active', 'Paused'], default: 'Active' },
  isStarred: { type: Boolean, default: false }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);