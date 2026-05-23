const router = require("express").Router();

const {
    createProject,
    getProjects
} = require("../controllers/projectController");

const auth = require("../middleware/authMiddleware");

// protected routes
router.post("/", auth, createProject);

router.get("/", auth, getProjects);

module.exports = router;