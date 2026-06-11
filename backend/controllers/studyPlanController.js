const Problem = require("../models/Problem")

const generateStudyPlan = async (
  req,
  res
) => {
  try {

    const problems =
      await Problem.find({
        userId:
          req.params.userId,
      })

    const topicCount = {}

    problems.forEach((p) => {

      if (!topicCount[p.topic]) {
        topicCount[p.topic] = 0
      }

      topicCount[p.topic]++
    })

    const weakTopics =
      Object.entries(topicCount)
        .sort(
          (a, b) => a[1] - b[1]
        )
        .slice(0, 3)
        .map((item) => item[0])

    const plan = [
      {
        day: "Day 1",
        task:
          `Practice ${weakTopics[0] || "Arrays"}`,
      },
      {
        day: "Day 2",
        task:
          `Practice ${weakTopics[1] || "Strings"}`,
      },
      {
        day: "Day 3",
        task:
          `Practice ${weakTopics[2] || "Trees"}`,
      },
      {
        day: "Day 4",
        task:
          "Solve 5 Medium Problems",
      },
      {
        day: "Day 5",
        task:
          "Participate in Contest",
      },
      {
        day: "Day 6",
        task:
          "Mock Interview Practice",
      },
      {
        day: "Day 7",
        task:
          "Revision Day",
      },
    ]

    res.json({
      success: true,
      weakTopics,
      plan,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message:
        "Failed to generate study plan",
    })
  }
}

module.exports = {
  generateStudyPlan,
}