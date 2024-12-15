const Task = require('../models/Task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, priority, status, startTime, endTime } = req.body;

    if (!title || !priority || !status || !startTime || !endTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const totalTime = calculateTotalTime(startTime, endTime);
    const id = generateTaskId();

    const newTask = new Task({ id, title, priority, status, startTime, endTime, totalTime });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, priority, status, startTime, endTime } = req.body;

    const task = await Task.findOne({ id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.startTime = startTime || task.startTime;
    task.endTime = endTime || task.endTime;
    task.totalTime = calculateTotalTime(task.startTime, task.endTime);

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete a single task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

// Delete multiple tasks
exports.deleteSelectedTasks = async (req, res) => {
    try {
      const { ids } = req.body; // Array of task IDs to delete
  
      // Validate input
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'No task IDs provided for deletion' });
      }
  
      // Check if the tasks exist in the database
      const tasksToDelete = await Task.find({ id: { $in: ids } });
      if (tasksToDelete.length === 0) {
        return res.status(404).json({ message: 'No tasks found with the provided IDs' });
      }
  
      // Perform the delete operation
      const result = await Task.deleteMany({ id: { $in: ids } });
  
      res.status(200).json({
        message: `${result.deletedCount} task(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting tasks', error });
    }
  };
  
  

// Helper function to calculate total time in hours
const calculateTotalTime = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffInMs = endDate - startDate;
  return diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
};

// Helper function to generate unique task ID
const generateTaskId = () => {
  return `T-${Date.now()}`; // Simple unique ID based on timestamp
};
