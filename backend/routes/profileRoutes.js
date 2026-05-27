const express = require("express")

const router = express.Router()

const {

  saveProfile,

  getProfile,

} = require("../controllers/profileController")

router.post("/", saveProfile)

router.get("/:userId", getProfile)

module.exports = router