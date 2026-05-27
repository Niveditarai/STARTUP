const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({

  userId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: true,

  },

  bio: String,

  skills: [String],

  targetRole: String,

  github: String,

  linkedin: String,

  dailyGoal: String,

}, {

  timestamps: true,

})

module.exports = mongoose.model("Profile", profileSchema)