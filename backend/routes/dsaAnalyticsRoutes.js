const express = require("express")

const router = express.Router()

const {
  getAnalytics,
} = require(
  "../controllers/dsaAnalyticsController"
)

router.get(
  "/:userId",
  getAnalytics
)

module.exports = router