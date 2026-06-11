"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import API from "@/services/api"

export default function AddProblemPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    questionName: "",
    platform: "Leetcode",
    difficulty: "Easy",
    topic: "Array",
    status: "Solved",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      setLoading(true)

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      )

      await API.post("/problems", {
        ...formData,
        userId: user._id,
      })

      alert("Problem Added Successfully 🚀")

      router.push("/dsa")
    } catch (error) {
      console.log(error)

      alert("Failed To Add Problem ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          Add DSA Problem
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6"
        >

          <div>
            <label className="block mb-2">
              Question Name
            </label>

            <input
              type="text"
              name="questionName"
              value={formData.questionName}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2">
              Platform
            </label>

            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            >
              <option>Leetcode</option>
              <option>GFG</option>
              <option>Codeforces</option>
              <option>CodeChef</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Difficulty
            </label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Topic
            </label>

            <select
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            >
              <option>Array</option>
              <option>String</option>
              <option>Linked List</option>
              <option>Stack</option>
              <option>Queue</option>
              <option>Tree</option>
              <option>Graph</option>
              <option>DP</option>
              <option>Greedy</option>
              <option>Backtracking</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700"
            >
              <option>Solved</option>
              <option>Revision</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-xl"
          >
            {loading
              ? "Saving..."
              : "Add Problem"}
          </button>

        </form>

      </div>

    </div>
  )
}