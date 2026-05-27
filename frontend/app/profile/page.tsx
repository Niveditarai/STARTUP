"use client"

import { useEffect, useState } from "react"

import API from "@/services/api"

export default function ProfilePage() {

  const [isEditing, setIsEditing] = useState(false)

  const [loading, setLoading] = useState(false)

  const [profile, setProfile] = useState({

    name: "",

    email: "",

    bio: "",

    targetRole: "",

    github: "",

    linkedin: "",

    dailyGoal: "",

    skills: "",

  })

  // FETCH PROFILE

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const user = JSON.parse(

          localStorage.getItem("user") || "{}"

        )

        // LOAD NAME + EMAIL

        setProfile((prev) => ({

          ...prev,

          name: user.name || "",

          email: user.email || "",

        }))

        // FETCH PROFILE

        const res = await API.get(

          `/profile/${user._id}`

        )

        if (res.data) {

          setProfile({

            name: user.name || "",

            email: user.email || "",

            bio: res.data.bio || "",

            targetRole: res.data.targetRole || "",

            github: res.data.github || "",

            linkedin: res.data.linkedin || "",

            dailyGoal: res.data.dailyGoal || "",

            skills: res.data.skills?.join(", ") || "",

          })

        }

      } catch (error) {

        console.log(error)

      }

    }

    fetchProfile()

  }, [])

  // SAVE PROFILE

  const handleSave = async () => {

    try {

      setLoading(true)

      const user = JSON.parse(

        localStorage.getItem("user") || "{}"

      )

      await API.post("/profile", {

        userId: user._id,

        bio: profile.bio,

        targetRole: profile.targetRole,

        github: profile.github,

        linkedin: profile.linkedin,

        dailyGoal: profile.dailyGoal,

        skills: profile.skills

          .split(",")

          .map((skill) => skill.trim()),

      })

      alert("Profile Saved 🚀")

      setIsEditing(false)

    } catch (error) {

      console.log(error)

      alert("Profile Save Failed ❌")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-cyan-400">

            My Profile

          </h1>

          <p className="text-zinc-400 mt-2">

            Manage your Zentrix AI profile.

          </p>

        </div>

        {/* PROFILE CARD */}

        <div className="bg-zinc-900 border border-cyan-500/30 rounded-3xl p-8 space-y-6">

          {/* NAME */}

          <div>

            <label className="block mb-2 text-sm text-zinc-400">

              Full Name

            </label>

            <input

              type="text"

              value={profile.name}

              disabled

              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"

            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="block mb-2 text-sm text-zinc-400">

              Email

            </label>

            <input

              type="email"

              value={profile.email}

              disabled

              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"

            />

          </div>

          {/* BIO */}

          <div>

            <label className="block mb-2 text-sm text-zinc-400">

              Bio

            </label>

            <textarea

              value={profile.bio}

              disabled={!isEditing}

              onChange={(e) =>

                setProfile({

                  ...profile,

                  bio: e.target.value,

                })

              }

              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700 min-h-[120px]"

            />

          </div>

          {/* TARGET ROLE */}

          <div>

            <label className="block mb-2 text-sm text-zinc-400">

              Target Role

            </label>

            <input

              type="text"

              value={profile.targetRole}

              disabled={!isEditing}

              onChange={(e) =>

                setProfile({

                  ...profile,

                  targetRole: e.target.value,

                })

              }

              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"

            />

          </div>

          {/* GITHUB */}

          <div>

            <label className="block mb-2 text-sm text-zinc-400">

              GitHub Username

            </label>

            <input

              type="text"

              value={profile.github}

              disabled={!isEditing}

              onChange={(e) =>

                setProfile({

                  ...profile,

                  github: e.target.value,

                })

              }

              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"

            />

          </div>

          {/* LINKEDIN */}

          <div>

            <label className="block mb-2 text-sm text-zinc-400">

              LinkedIn

            </label>

            <input

              type="text"

              value={profile.linkedin}

              disabled={!isEditing}

              onChange={(e) =>

                setProfile({

                  ...profile,

                  linkedin: e.target.value,

                })

              }

              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"

            />

          </div>

          {/* DAILY GOAL */}

          <div>

            <label className="block mb-2 text-sm text-zinc-400">

              Daily Study Goal

            </label>

            <input

              type="text"

              value={profile.dailyGoal}

              disabled={!isEditing}

              onChange={(e) =>

                setProfile({

                  ...profile,

                  dailyGoal: e.target.value,

                })

              }

              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"

            />

          </div>

          {/* SKILLS */}

          <div>

            <label className="block mb-2 text-sm text-zinc-400">

              Skills (comma separated)

            </label>

            <input

              type="text"

              value={profile.skills}

              disabled={!isEditing}

              onChange={(e) =>

                setProfile({

                  ...profile,

                  skills: e.target.value,

                })

              }

              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"

            />

          </div>

          {/* BUTTONS */}

          <div className="flex gap-4 pt-4">

            {!isEditing ? (

              <button

                onClick={() => setIsEditing(true)}

                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition-all"

              >

                Edit Profile

              </button>

            ) : (

              <button

                onClick={handleSave}

                disabled={loading}

                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition-all"

              >

                {loading ? "Saving..." : "Save Profile"}

              </button>

            )}

          </div>

        </div>

      </div>

    </div>

  )

}