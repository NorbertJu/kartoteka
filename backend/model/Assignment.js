const mongoose = require('mongoose');

const Assignment = new mongoose.Schema({
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  document_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
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