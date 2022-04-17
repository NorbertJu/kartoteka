const mongoose = require('mongoose');

const Group = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      member: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
      active: {type: Boolean, default: false},
    }
  ],
});

module.exports = mongoose.model('Group', Group)