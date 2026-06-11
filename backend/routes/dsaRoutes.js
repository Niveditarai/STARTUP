const express = require("express");

const router = express.Router();

const {
  saveAnalytics,
  getAnalytics,
} = require("../controllers/dsaController");

router.post("/save", saveAnalytics);

router.get("/:userId", getAnalytics);

module.exports = router;