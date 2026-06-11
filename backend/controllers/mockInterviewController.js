const MockInterview = require(
  "../models/MockInterview"
)

// Start Interview

const startInterview = async (
  req,
  res
) => {
  try {

    const questions = [
      "Tell me about yourself.",
      "What is OOPS?",
      "Explain Polymorphism.",
      "Difference between Stack and Queue?",
      "What is a Binary Tree?",
      "What is Time Complexity?",
      "What is Dynamic Programming?",
    ]

    const randomQuestion =
      questions[
        Math.floor(
          Math.random() *
            questions.length
        )
      ]

    res.json({
      success: true,
      question: randomQuestion,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message:
        "Failed to start interview",
    })

  }
}

// Submit Answer

const submitAnswer = async (
  req,
  res
) => {
  try {

    const {
      userId,
      question,
      answer,
    } = req.body

    const wordCount =
      answer.split(" ").length

    let score = 0

    if (wordCount > 20)
      score += 4

    if (wordCount > 50)
      score += 3

    if (wordCount > 100)
      score += 3

    let feedback = ""

    if (score >= 8) {
      feedback =
        "Excellent answer. Well structured and detailed."
    } else if (score >= 5) {
      feedback =
        "Good answer. Add more technical depth."
    } else {
      feedback =
        "Answer is too short. Explain concepts in more detail."
    }

    const interview =
      await MockInterview.create({
        userId,
        question,
        answer,
        score,
        feedback,
      })

    res.json({
      success: true,
      score,
      feedback,
      interview,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message:
        "Failed to evaluate answer",
    })

  }
}

// Get History

const getHistory = async (
  req,
  res
) => {
  try {

    const history =
      await MockInterview.find({
        userId:
          req.params.userId,
      }).sort({
        createdAt: -1,
      })

    res.json(history)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch history",
    })

  }
}

module.exports = {
  startInterview,
  submitAnswer,
  getHistory,
}