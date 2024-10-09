const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: String,
  recipient: String,
  status: { type: String, default: 'unread' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);