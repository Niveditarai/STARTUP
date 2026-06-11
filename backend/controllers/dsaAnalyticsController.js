const Problem = require("../models/Problem")

const getAnalytics = async (req, res) => {
  try {

    const { userId } = req.params

    const problems = await Problem.find({
      userId,
    })

    const analytics = {
      totalSolved: problems.length,

      easy: 0,
      medium: 0,
      hard: 0,

      topics: {
        Array: 0,
        String: 0,
        "Linked List": 0,
        Stack: 0,
        Queue: 0,
        Tree: 0,
        Graph: 0,
        DP: 0,
        Greedy: 0,
        Backtracking: 0,
      },
    }

    problems.forEach((problem) => {

      // Difficulty Count

      if (
        problem.difficulty === "Easy"
      ) analytics.easy++

      if (
        problem.difficulty === "Medium"
      ) analytics.medium++

      if (
        problem.difficulty === "Hard"
      ) analytics.hard++

      // Topic Count

      if (
        analytics.topics[
          problem.topic
        ] !== undefined
      ) {
        analytics.topics[
          problem.topic
        ]++
      }
    })

    res.json(analytics)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message:
        "Analytics fetch failed",
    })
  }
}

module.exports = {
  getAnalytics,
}