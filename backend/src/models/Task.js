const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Finished']
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  totalTime: {
    type: Number, // Total time in hours
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
