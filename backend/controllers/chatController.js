const Chat = require("../models/Chat")

// CREATE CHAT

const createChat = async (req, res) => {

  try {

    const { userId, firstMessage } = req.body

    const chat = await Chat.create({

      userId,

      title: firstMessage.slice(0, 30),

      messages: [],

    })

    res.json(chat)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Chat creation failed",

    })

  }

}

// SAVE MESSAGE

const saveMessage = async (req, res) => {

  try {

    const {

      chatId,

      role,

      content,

    } = req.body

    const chat = await Chat.findById(chatId)

    if (!chat) {

      return res.status(404).json({

        message: "Chat not found",

      })

    }

    chat.messages.push({

      role,

      content,

    })

    await chat.save()

    res.json(chat)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Save message failed",

    })

  }

}

// GET USER CHATS

const getUserChats = async (req, res) => {

  try {

    const chats = await Chat.find({

      userId: req.params.userId,

    }).sort({

      updatedAt: -1,

    })

    res.json(chats)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Fetch chats failed",

    })

  }

}

// GET SINGLE CHAT

const getSingleChat = async (req, res) => {

  try {

    const chat = await Chat.findById(

      req.params.chatId

    )

    res.json(chat)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Fetch single chat failed",

    })

  }

}

module.exports = {

  createChat,

  saveMessage,

  getUserChats,

  getSingleChat,

}