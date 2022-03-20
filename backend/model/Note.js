const mongoose = require('mongoose');

const Note = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    max: 255,
    min: 1,
  },
  user_id: {
    type: String,
    required: true,
  },
  document_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Note', Note)