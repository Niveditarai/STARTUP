const mongoose = require("mongoose");

const dsaAnalyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  totalSolved: Number,
  easySolved: Number,
  mediumSolved: Number,
  hardSolved: Number,

  arrays: Number,
  strings: Number,
  linkedList: Number,
  trees: Number,
  graphs: Number,
  dp: Number,

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "DSAAnalytics",
  dsaAnalyticsSchema
);