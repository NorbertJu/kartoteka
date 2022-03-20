const mongoose = require('mongoose');

const Assignment = new mongoose.Schema({
  manager_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  document_id: {
    type: String,
    required: true,
  },
  date_to: {
    type: Date,
    required: true,
  },
  date_from: {
    type: Date,
  },
});

module.exports = mongoose.model('Assignment', Assignment)