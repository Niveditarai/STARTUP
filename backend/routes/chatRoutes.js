const express = require("express")

const router = express.Router()

const {

  createChat,

  saveMessage,

  getUserChats,

  getSingleChat,

} = require("../controllers/chatController")

router.post("/create", createChat)

router.post("/message", saveMessage)

router.get("/:userId", getUserChats)

router.get("/single/:chatId", getSingleChat)

module.exports = router