const Project = require("../models/Project");

// create project
const createProject = async (req, res) => {

    try {

        const project = await Project.create({

            title: req.body.title,

            description: req.body.description,

            user: req.user.id

        });

        res.status(201).json(project);

    } catch (err) {

        res.status(500).json(err.message);

    }

};

// get projects
const getProjects = async (req, res) => {

    try {

        const projects = await Project.find({
            user: req.user.id
        });

        res.json(projects);

    } catch (err) {

        res.status(500).json(err.message);

    }

};

module.exports = {
    createProject,
    getProjects
};