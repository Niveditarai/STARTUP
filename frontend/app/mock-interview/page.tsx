"use client"

import { useState } from "react"
import API from "@/services/api"

export default function MockInterviewPage() {

  const [question, setQuestion] =
    useState("")

  const [answer, setAnswer] =
    useState("")

  const [score, setScore] =
    useState<number | null>(null)

  const [feedback, setFeedback] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const startInterview = async () => {

    try {

      setLoading(true)

      const res =
        await API.post(
          "/mock/start"
        )

      setQuestion(
        res.data.question
      )

      setAnswer("")
      setScore(null)
      setFeedback("")

    } catch (error) {

      console.log(error)

      alert(
        "Failed to start interview"
      )

    } finally {

      setLoading(false)

    }
  }

  const submitAnswer = async () => {

    try {

      setLoading(true)

      const user = JSON.parse(
        localStorage.getItem("user") ||
          "{}"
      )

      const res =
        await API.post(
          "/mock/answer",
          {
            userId: user._id,
            question,
            answer,
          }
        )

      setScore(res.data.score)

      setFeedback(
        res.data.feedback
      )

    } catch (error) {

      console.log(error)

      alert(
        "Failed to submit answer"
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          AI Mock Interview
        </h1>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          {!question && (

            <div className="text-center">

              <p className="text-zinc-400 mb-6">
                Start an AI-powered mock interview.
              </p>

              <button
                onClick={
                  startInterview
                }
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-4 rounded-xl"
              >
                {loading
                  ? "Starting..."
                  : "Start Interview"}
              </button>

            </div>
          )}

          {question && (

            <div className="space-y-6">

              <div>

                <h2 className="text-xl font-semibold text-cyan-400 mb-3">
                  Question
                </h2>

                <div className="bg-zinc-800 p-5 rounded-xl">
                  {question}
                </div>

              </div>

              <div>

                <h2 className="text-xl font-semibold mb-3">
                  Your Answer
                </h2>

                <textarea
                  value={answer}
                  onChange={(e) =>
                    setAnswer(
                      e.target.value
                    )
                  }
                  placeholder="Write your answer here..."
                  className="w-full h-40 bg-zinc-800 rounded-xl p-4 outline-none border border-zinc-700"
                />

              </div>

              <button
                onClick={
                  submitAnswer
                }
                disabled={
                  loading ||
                  !answer.trim()
                }
                className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 rounded-xl"
              >
                {loading
                  ? "Evaluating..."
                  : "Submit Answer"}
              </button>

              {score !== null && (

                <div className="mt-6 bg-zinc-800 rounded-xl p-6">

                  <h3 className="text-2xl font-bold text-cyan-400 mb-3">
                    Result
                  </h3>

                  <p className="text-lg mb-2">
                    Score:
                    <span className="font-bold text-green-400">
                      {" "}
                      {score}/10
                    </span>
                  </p>

                  <p className="text-zinc-300">
                    {feedback}
                  </p>

                </div>

              )}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}