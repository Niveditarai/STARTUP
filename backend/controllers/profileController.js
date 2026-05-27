const Profile = require("../models/Profile")

// CREATE OR UPDATE PROFILE

const saveProfile = async (req, res) => {

  try {

    const {

      userId,

      bio,

      skills,

      targetRole,

      github,

      linkedin,

      dailyGoal,

    } = req.body

    let profile = await Profile.findOne({ userId })

    if (profile) {

      profile.bio = bio

      profile.skills = skills

      profile.targetRole = targetRole

      profile.github = github

      profile.linkedin = linkedin

      profile.dailyGoal = dailyGoal

      await profile.save()

    } else {

      profile = await Profile.create({

        userId,

        bio,

        skills,

        targetRole,

        github,

        linkedin,

        dailyGoal,

      })

    }

    res.json(profile)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Profile save failed",

    })

  }

}

// GET PROFILE

const getProfile = async (req, res) => {

  try {

    const profile = await Profile.findOne({

      userId: req.params.userId,

    })

    res.json(profile)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: "Profile fetch failed",

    })

  }

}

module.exports = {

  saveProfile,

  getProfile,

}