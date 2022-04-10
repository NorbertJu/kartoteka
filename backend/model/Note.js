const mongoose = require('mongoose');

const Note = new mongoose.Schema({
  text: {
    type: String,
    max: 500,
    min: 0,
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