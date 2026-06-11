const mongoose = require("mongoose")

const problemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questionName: {
      type: String,
      required: true,
      trim: true,
    },

    platform: {
      type: String,
      required: true,
      enum: ["Leetcode", "GFG", "Codeforces", "CodeChef", "Other"],
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },

    topic: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Solved",
      enum: ["Solved", "Revision"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(
  "Problem",
  problemSchema
)