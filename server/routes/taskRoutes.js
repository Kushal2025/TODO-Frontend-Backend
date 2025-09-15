const express = require('express');
const router = express.Router();
const {createTask,getAllTasks,deleteTask,updateTask} = require("../controllers/taskController");

router.post('/',createTask);
router.get('/',getAllTasks);
router.delete('/:id',deleteTask);
router.put('/:id',updateTask);

module.exports = router;