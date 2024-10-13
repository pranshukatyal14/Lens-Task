const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      createdBy: req.user.userId,
      assignedTo,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'username');
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
