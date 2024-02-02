const express = require('express');
const router = express.Router();
const jwt = require('../utils/jwt');
require("dotenv").config();
const SubTask = require('../models/subtask');

router.post('/create-sub-task/:task_id',authenticateToken, async (req, res) => {
    const { task_id } = req.params;
    const { status } = req.body;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
  
    try {
      const task = await Task.findById(task_id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      const subTask = new SubTask({
        task_id,
        status,
      });
  
      await subTask.save();
      res.status(201).json({ message: 'Sub task created successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error creating sub task' });
    }
  });

  router.get('/get-sub-tasks/:task_id?',authenticateToken, async (req, res) => {
    const { task_id } = req.params;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
  
    try {
      let subTasks;
      if (task_id) {
        subTasks = await SubTask.find({ task_id });
      } else {
        subTasks = await SubTask.find({ user_id });
      }
      res.status(200).json(subTasks);
    } catch (error) {
      res.status(400).json({ message: 'Error getting sub tasks' });
    }
  });

  router.put('/update-sub-task/:sub_task_id',authenticateToken, async (req, res) => {
    const { sub_task_id } = req.params;
    const { status } = req.body;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
  
    try {
      const subTask = await SubTask.findById(sub_task_id);
      if (!subTask) {
        return res.status(404).json({ message: 'Sub task not found' });
      }
  
      if (subTask.user_id.toString() !== user_id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      if (status) {
        subTask.status = status;
      }
  
      await subTask.save();
      res.status(200).json({ message: 'Sub task updated successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error updating sub task' });
    }
  });

  router.delete('/delete-sub-task/:sub_task_id',authenticateToken, async (req, res) => {
    const { sub_task_id } = req.params;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
  
    try {
      const subTask = await SubTask.findById(sub_task_id);
      if (!subTask) {
        return res.status(404).json({ message: 'Sub task not found' });
      }
  
      if (subTask.user_id.toString() !== user_id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      await SubTask.findByIdAndDelete(sub_task_id);
      res.status(200).json({ message: 'Sub task deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting sub task' });
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