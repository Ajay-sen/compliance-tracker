const express = require('express');
const router = express.Router();
const Client = require('../models/Clients');
const Task = require('../models/Task');

// 1. Get all clients
router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Get tasks for a specific client
router.get('/tasks/:clientId', async (req, res) => {
    try {
        const tasks = await Task.find({ client_id: req.params.clientId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Create a new task
router.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. Update task status (Pending -> Completed)
router.patch('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;