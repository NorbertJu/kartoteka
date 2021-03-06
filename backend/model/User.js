const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
});

module.exports = mongoose.model('User', User)