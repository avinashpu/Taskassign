const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /api/tasks - Get all tasks
router.get('/', taskController.getAllTasks);

// POST /api/tasks - Create a new task
router.post('/', taskController.createTask);

// PUT /api/tasks/:id - Update a task by ID
router.put('/:id', taskController.updateTask);

// DELETE /api/tasks/:id - Delete a task by ID
router.delete('/:id', taskController.deleteTask);

// DELETE /api/tasks/selected - Delete multiple tasks by IDs
router.delete('/selected', taskController.deleteSelectedTasks);

module.exports = router;
