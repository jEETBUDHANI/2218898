const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortCode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiry: Date,
  clicks: [
    {
      timestamp: Date,
      referrer: String,
      location: String,
    },
  ],
});

module.exports = mongoose.model('Url', urlSchema);
