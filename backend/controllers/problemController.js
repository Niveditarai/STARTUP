const Problem = require("../models/Problem")

// ======================
// ADD PROBLEM
// ======================

const addProblem = async (req, res) => {
  try {

    const problem = await Problem.create(req.body)

    res.status(201).json({
      success: true,
      problem,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: "Failed to add problem",
    })

  }
}

// ======================
// GET ALL PROBLEMS
// ======================

const getProblems = async (req, res) => {
  try {

    const problems = await Problem.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    })

    res.status(200).json(problems)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch problems",
    })

  }
}

// ======================
// GET RECENT PROBLEMS
// ======================

const getRecentProblems = async (
  req,
  res
) => {
  try {

    const problems = await Problem.find({
      userId: req.params.userId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(5)

    res.status(200).json(problems)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch recent problems",
    })

  }
}

// ======================
// DELETE PROBLEM
// ======================

const deleteProblem = async (
  req,
  res
) => {
  try {

    const deletedProblem =
      await Problem.findByIdAndDelete(
        req.params.id
      )

    if (!deletedProblem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Problem deleted",
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: "Delete failed",
    })

  }
}

module.exports = {
  addProblem,
  getProblems,
  getRecentProblems,
  deleteProblem,
}