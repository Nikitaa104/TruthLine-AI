
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    enum: ['Twitter', 'Facebook', 'WhatsApp', 'News', 'Reddit', 'Telegram']
  },
  claim: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['verified', 'misinformation', 'pending', 'unverified']
  },
  category: {
    type: String,
    required: true,
    enum: ['Health', 'Disaster', 'Politics', 'Technology', 'Environment', 'Economy']
  },
  verifiedBy: {
    type: String,
    required: true
  },
  location: {
    city: String,
    country: String,
    region: String
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  evidenceLinks: [String],
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
alertSchema.index({ status: 1, timestamp: -1 });
alertSchema.index({ location: 1 });

module.exports = mongoose.model('Alert', alertSchema);