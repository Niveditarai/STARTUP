const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({

  role: {

    type: String,

    enum: ["user", "assistant"],

  },

  content: String,

})

const chatSchema = new mongoose.Schema({

  userId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: true,

  },

  title: {

    type: String,

    default: "New Chat",

  },

  messages: [messageSchema],

}, {

  timestamps: true,

})

module.exports = mongoose.model("Chat", chatSchema)