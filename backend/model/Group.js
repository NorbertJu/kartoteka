const mongoose = require('mongoose');

const Group = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  manager_id: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
  },
});

module.exports = mongoose.model('Group', Group)