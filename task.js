const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 0,
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO',
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subtasks: [{ type: mongoose.Types.ObjectId, ref: 'Subtask' }],
  deletedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.virtual('completionPercentage').get(function () {
  const completedSubtasks = this.subtasks.filter((subtask) => subtask.status === 1).length;
  const totalSubtasks = this.subtasks.length;
  return (completedSubtasks / totalSubtasks) * 100;
});

module.exports = mongoose.model('Task', taskSchema);