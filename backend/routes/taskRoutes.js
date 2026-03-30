const router = require("express").Router();
const { createTask, getTasks, updateTask } = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, createTask);
router.get("/:projectId", auth, getTasks);
router.put("/:taskId", auth, updateTask);

module.exports = router;