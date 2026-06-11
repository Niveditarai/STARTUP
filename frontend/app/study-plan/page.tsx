"use client"

import { useEffect, useState } from "react"
import API from "@/services/api"

export default function StudyPlanPage() {

  const [plan, setPlan] = useState<any[]>([])
  const [weakTopics, setWeakTopics] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchPlan = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem("user") || "{}"
        )

        const res = await API.get(
          `/study-plan/${user._id}`
        )

        setPlan(res.data.plan)
        setWeakTopics(
          res.data.weakTopics
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }
    }

    fetchPlan()

  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Study Plan...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-cyan-400 mb-2">
          AI Study Planner
        </h1>

        <p className="text-zinc-400 mb-8">
          Personalized 7-Day DSA Roadmap
        </p>

        {/* Weak Topics */}

        <div className="bg-zinc-900 border border-red-500/20 rounded-2xl p-6 mb-8">

          <h2 className="text-xl font-bold text-red-400 mb-4">
            Weak Areas Detected
          </h2>

          <div className="flex flex-wrap gap-3">

            {weakTopics.map((topic) => (

              <span
                key={topic}
                className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300"
              >
                {topic}
              </span>

            ))}

          </div>

        </div>

        {/* Study Plan */}

        <div className="grid md:grid-cols-2 gap-6">

          {plan.map((item, index) => (

            <div
              key={index}
              className="bg-zinc-900 border border-cyan-500/20 rounded-2xl p-6"
            >

              <div className="flex items-center justify-between mb-4">

                <h3 className="text-xl font-bold text-cyan-400">
                  {item.day}
                </h3>

                <span className="text-sm bg-cyan-500/10 px-3 py-1 rounded-lg">
                  Task
                </span>

              </div>

              <p className="text-zinc-300">
                {item.task}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}