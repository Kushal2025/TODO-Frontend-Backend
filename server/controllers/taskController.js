const Task = require("../models/Task");

//
exports.createTask = async (req, res) => {
  const data = req.body;
  try {
    const model = new Task(data);
    await model.save();
    res.status(201).json({ message: "Task Created", success: true });
  } catch (error) {
    res.status(500).json({ message: "error", success: false });
  }
};

//get all task
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ message: "All Tasks", success: true, data:tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get all tasks", success: false });
  }
};
// delete all task
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task is deleted", success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", success: false });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    await Task.findByIdAndUpdate(id, obj);
    res.status(200).json({ message: "Task Updated", success: true });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error" });
    res.status(500).json({ message: "Failed to updated task", success: false });
  }
};
