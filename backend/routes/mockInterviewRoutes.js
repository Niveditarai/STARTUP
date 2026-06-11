const express = require("express")

const router = express.Router()

const {
  startInterview,
  submitAnswer,
  getHistory,
} = require(
  "../controllers/mockInterviewController"
)

router.post(
  "/start",
  startInterview
)

router.post(
  "/answer",
  submitAnswer
)

router.get(
  "/history/:userId",
  getHistory
)

module.exports = router