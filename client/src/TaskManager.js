import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/tasks"; // backend base URL

const TaskManager = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
 
  const [editId, setEditId] = useState(null);

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data.data); // backend sends { data: [...] }
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  // Add or Update Task
  const handleAddTask = async () => {
    if (!input.trim()) {
      toast.error("Task cannot be empty!");
      return;
    }

    if (editId) {
      // Update
      try {
        await axios.put(`${API_URL}/${editId}`, { taskName: input });
        toast.success("Task updated!");
        setInput("");
        setEditId(null);
        fetchTasks();
      } catch (error) {
        toast.error("Failed to update task");
      }
    } else {
      // Create
      try {
        await axios.post(API_URL, { taskName: input, isDone: false });
        toast.success("Task added!");
        setInput("");
        fetchTasks();
      } catch (error) {
        toast.error("Failed to add task");
      }
    }
  };

  // Mark Done / Undo
  const handleDone = async (id, currentStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { isDone: !currentStatus });
      toast.info(!currentStatus ? "Task completed!" : "Task undone!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Edit Task
  const handleEdit = (id, name) => {
    setInput(name);
    setEditId(id);
  };

  // Delete Task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.error("Task deleted!");
      if (editId === id) {
        setInput("");
        setEditId(null);
      }
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  // Search filter



  return (
    <div className="container my-4 p-4 border rounded shadow-sm bg-light d-flex flex-column">
      <h1 className="text-center mb-4">📝 Task Manager App</h1>

      {/* Input */}
      <div className="d-flex mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control me-2"
          placeholder="Enter a new task..."
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          <FaPlus /> {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Search */}
     

      {/* Task List */}
      <div className="list-group">
        {tasks.length === 0 ? (
          <div className="text-center text-muted">No tasks found</div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span
                className={
                  task.isDone ? "text-decoration-line-through text-muted" : ""
                }
              >
                {task.taskName}
              </span>
              <div>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => handleDone(task._id, task.isDone)}
                >
                  <FaCheck /> {task.isDone ? "Undo" : "Done"}
                </button>
                <button
                  className="btn btn-sm btn-warning me-2 text-white"
                  onClick={() => handleEdit(task._id, task.taskName)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(task._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default TaskManager;
