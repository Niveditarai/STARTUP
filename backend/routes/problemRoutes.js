const express = require("express")

const router = express.Router()

const {
  addProblem,
  getProblems,
  getRecentProblems,
  deleteProblem,
} = require("../controllers/problemController")

// ======================
// ADD PROBLEM
// ======================

router.post("/", addProblem)

// ======================
// GET RECENT PROBLEMS
// IMPORTANT:
// Recent route should come
// BEFORE /:userId route
// ======================

router.get(
  "/recent/:userId",
  getRecentProblems
)

// ======================
// GET ALL PROBLEMS
// ======================

router.get(
  "/:userId",
  getProblems
)

// ======================
// DELETE PROBLEM
// ======================

router.delete(
  "/:id",
  deleteProblem
)

module.exports = router