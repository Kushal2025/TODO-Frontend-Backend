const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },   // ✅ matches frontend
    isDone: { type: Boolean, default: false },    // ✅ matches frontend
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
