const DSAAnalytics = require("../models/DSAAnalytics");

const saveAnalytics = async (req, res) => {
  try {

    const analytics =
      await DSAAnalytics.findOneAndUpdate(
        {
          userId: req.body.userId,
        },
        req.body,
        {
          new: true,
          upsert: true,
        }
      );

    res.json(analytics);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed",
    });

  }
};

const getAnalytics = async (req, res) => {

  try {

    const analytics =
      await DSAAnalytics.findOne({
        userId: req.params.userId,
      });

    res.json(analytics);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed",
    });

  }
};

module.exports = {
  saveAnalytics,
  getAnalytics,
};