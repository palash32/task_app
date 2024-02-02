const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1], 
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
});
subtaskSchema.pre('save', async function (next) {
  this.updatedAt = Date.now();
  next();
});
subtaskSchema.pre('remove', async function (next) {
  this.deletedAt = Date.now();
  next();
});

module.exports = mongoose.model('Subtask', subtaskSchema);
