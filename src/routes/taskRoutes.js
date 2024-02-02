const express = require('express');
const router = express.Router();
const jwt = require('../utils/jwt');
require("dotenv").config();
const Task = require('../models/task');

router.post('/create-task',authenticateToken, async (req, res) => {
  const { title, description, due_date } = req.body;
  const token = req.header('Authorization');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user_id = decoded.user_id;

  try {
    const task = new Task({
      title,
      description,
      due_date,
      user_id,
      priority: 0,
      status: 'TODO',
    });

    await task.save();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating task' });
  }
});

router.get('/get-tasks',authenticateToken, async (req, res) => {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
  
    try {
      const tasks = await Task.find({ user_id })
        .sort({ due_date: 1 })
        .skip(parseInt(req.query.skip) || 0)
        .limit(parseInt(req.query.limit) || 10);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json({ message: 'Error getting tasks' });
    }
});

  router.put('/update-task/:task_id',authenticateToken, async (req, res) => {
    const { task_id } = req.params;
    const { title, description, due_date, priority, status } = req.body;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
  
    try {
      const task = await Task.findById(task_id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      if (task.user_id.toString() !== user_id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      if (title) {
        task.title = title;
      }
  
      if (description) {
        task.description = description;
      }
  
      if (due_date) {
        task.due_date = due_date;
      }
  
      if (priority) {
        task.priority = priority;
      }
  
      if (status) {
        task.status = status;
      }
  
      await task.save();
      res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error updating task' });
    }
  });

  router.delete('/delete-task/:task_id', authenticateToken ,async (req, res) => {
    const { task_id } = req.params;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
  
    try {
      const task = await Task.findById(task_id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      if (task.user_id.toString() !== user_id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      await Task.findByIdAndDelete(task_id);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting task' });
    }
  });
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token)
      .then(decoded => {
        req.userId = decoded.userId;
        next();
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(403); 
      });
  }



module.exports = router;