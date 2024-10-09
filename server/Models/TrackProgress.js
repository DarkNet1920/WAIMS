const mongoose = require('mongoose');

const TrakProgSchema = new mongoose.Schema({
  status: { type: String, enum: ['not started', 'in progress', 'completed'], default: 'not started' },
  progress: { type: Number, default: 0 }, // progress percentage from 0 to 100
  createdAt: { type: Date, default: Date.now },
});

const TrackProgress = mongoose.model('TrackProgress', TrakProgSchema);
module.exports = TrackProgress;
