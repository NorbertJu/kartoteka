const mongoose = require('mongoose');

const Progress = new mongoose.Schema({
  state: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  date: {
    type: Date,
  },
  user_id: {
    type: String,
    required: true,
  },
  document_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
});

module.exports = mongoose.model('Progress', Progress)