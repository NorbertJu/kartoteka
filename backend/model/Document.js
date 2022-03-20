const mongoose = require('mongoose');

const Document = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  description: {
    type: String,
    max: 500,
  },
});

module.exports = mongoose.model('Document', Document)