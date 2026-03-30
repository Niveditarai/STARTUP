const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            project: req.body.project,
            assignedTo: req.body.assignedTo
        });

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// GET TASKS BY PROJECT
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId })
            .populate("assignedTo", "name email");

        res.json(tasks);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// UPDATE TASK STATUS
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.taskId,
            { status: req.body.status },
            { new: true }
        );

        res.json(task);
    } catch (err) {
        res.status(500).json(err.message);
    }
};