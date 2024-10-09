const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'client'], default: 'client' },
  });
  

const User = mongoose.model('User', UserSchema);

module.exports = User;