const mongoose = require("mongoose")

const mockInterviewSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      question: {
        type: String,
        required: true,
      },

      answer: {
        type: String,
        required: true,
      },

      score: {
        type: Number,
        default: 0,
      },

      feedback: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  )

module.exports = mongoose.model(
  "MockInterview",
  mockInterviewSchema
)