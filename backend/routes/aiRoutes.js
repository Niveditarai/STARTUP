const router = require("express").Router();

const { askAI } = require("../controllers/aiController");

const auth = require("../middleware/authMiddleware");

// protected AI route
router.post("/ask", auth, askAI);

module.exports = router;