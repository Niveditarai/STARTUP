const express = require("express")

const router = express.Router()

const {
  generateStudyPlan,
} = require(
  "../controllers/studyPlanController"
)

router.get(
  "/:userId",
  generateStudyPlan
)

module.exports = router