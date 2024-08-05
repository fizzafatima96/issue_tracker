// models/User.js
const mongoose = require('mongoose');

const issuestrackerSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  is_deleted: {
    type: Boolean,
    required: true,
    default : false
  },
});

module.exports = mongoose.model('Issuestracker', issuestrackerSchema);
