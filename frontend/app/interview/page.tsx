"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mic, 
  Video,
  Play,
  Pause,
  RotateCcw,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Target,
  Sparkles,
  ChevronRight,
  CheckCircle
} from "lucide-react"
import { GlassCard, NeonButton, GradientText, ProgressRing } from "@/components/zentrix/ui-components"
import { Sidebar, TopNav } from "@/components/zentrix/navigation"

const interviewTypes = [
  { id: "hr", label: "HR Interview", icon: MessageSquare, description: "Practice behavioral and situational questions" },
  { id: "technical", label: "Technical Interview", icon: Target, description: "DSA, system design, and coding questions" },
  { id: "behavioral", label: "Behavioral", icon: ThumbsUp, description: "STAR method and leadership questions" },
]

const companies = ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix"]

const previousInterviews = [
  { id: "1", type: "Technical", company: "Google", date: "May 20, 2024", score: 85, feedback: "Good problem-solving skills" },
  { id: "2", type: "HR", company: "Amazon", date: "May 18, 2024", score: 78, feedback: "Work on STAR responses" },
  { id: "3", type: "Behavioral", company: "Microsoft", date: "May 15, 2024", score: 92, feedback: "Excellent communication" },
]

const sampleQuestions = [
  "Tell me about yourself.",
  "Why do you want to work here?",
  "Describe a challenging project you worked on.",
  "How do you handle tight deadlines?",
  "Where do you see yourself in 5 years?",
]

export default function InterviewPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [isInterviewActive, setIsInterviewActive] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const startInterview = () => {
    setIsInterviewActive(true)
    setCurrentQuestion(0)
    setShowFeedback(false)
  }

  const endInterview = () => {
    setIsInterviewActive(false)
    setShowFeedback(true)
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Sidebar currentPath="/interview" />
      <div className="ml-64 transition-all duration-300">
        <TopNav userName="Alex" />
        
        <main className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Mock <GradientText>Interview</GradientText></h1>
                <p className="text-muted-foreground">Practice interviews with AI feedback</p>
              </div>
            </div>

            {!isInterviewActive && !showFeedback ? (
              <>
                {/* Interview Type Selection */}
                <GlassCard glowColor="cyan" hover={false}>
                  <h3 className="text-lg font-semibold mb-4">Select Interview Type</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {interviewTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-6 rounded-xl border transition-all text-left ${
                          selectedType === type.id 
                            ? "border-primary bg-primary/10 glow-cyan" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <type.icon className={`w-8 h-8 mb-3 ${selectedType === type.id ? "text-primary" : "text-muted-foreground"}`} />
                        <h4 className="font-semibold mb-1">{type.label}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </GlassCard>

                {/* Company Selection */}
                {selectedType && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <GlassCard glowColor="purple" hover={false}>
                      <h3 className="text-lg font-semibold mb-4">Select Target Company</h3>
                      <div className="flex flex-wrap gap-3">
                        {companies.map((company) => (
                          <button
                            key={company}
                            onClick={() => setSelectedCompany(company)}
                            className={`px-4 py-2 rounded-lg transition-all ${
                              selectedCompany === company 
                                ? "bg-secondary text-secondary-foreground" 
                                : "bg-muted/50 hover:bg-muted"
                            }`}
                          >
                            {company}
                          </button>
                        ))}
                      </div>
                      {selectedCompany && (
                        <div className="mt-6">
                          <NeonButton variant="cyan" className="flex items-center gap-2" onClick={startInterview}>
                            <Play className="w-5 h-5" />
                            Start Interview
                          </NeonButton>
                        </div>
                      )}
                    </GlassCard>
                  </motion.div>
                )}

                {/* Previous Interviews */}
                <GlassCard glowColor="purple" hover={false}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Interview History</h3>
                    <button className="text-primary text-sm hover:underline flex items-center gap-1">
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {previousInterviews.map((interview) => (
                      <div key={interview.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Mic className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{interview.type} - {interview.company}</p>
                            <p className="text-sm text-muted-foreground">{interview.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className={`font-bold ${interview.score >= 80 ? "text-emerald-400" : interview.score >= 60 ? "text-amber-400" : "text-red-400"}`}>
                              {interview.score}%
                            </p>
                            <p className="text-xs text-muted-foreground">Score</p>
                          </div>
                          <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </>
            ) : isInterviewActive ? (
              /* Active Interview */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-3xl mx-auto"
              >
                <GlassCard glowColor="cyan" hover={false}>
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {sampleQuestions.length}</span>
                    <div className="flex gap-1">
                      {sampleQuestions.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-8 h-1 rounded ${idx <= currentQuestion ? "bg-primary" : "bg-muted/50"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{sampleQuestions[currentQuestion]}</h2>
                    <p className="text-muted-foreground">Take your time and structure your response.</p>
                  </div>

                  {/* Recording Controls */}
                  <div className="flex items-center justify-center gap-4 py-8">
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                        isRecording 
                          ? "bg-red-500 glow-cyan animate-pulse" 
                          : "bg-primary hover:glow-cyan"
                      }`}
                    >
                      {isRecording ? <Pause className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
                    </button>
                  </div>

                  {isRecording && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-red-400 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        Recording...
                      </div>
                      <p className="text-sm text-muted-foreground">Click to stop and submit your answer</p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
                    <button
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {currentQuestion < sampleQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:glow-cyan transition-all"
                      >
                        Next Question
                      </button>
                    ) : (
                      <button
                        onClick={endInterview}
                        className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all"
                      >
                        Finish Interview
                      </button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              /* Feedback */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
              >
                <GlassCard glowColor="purple" hover={false}>
                  <div className="text-center py-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Interview Complete!</h2>
                    <p className="text-muted-foreground mb-8">Here&apos;s your AI-generated feedback</p>
                    
                    <div className="flex justify-center mb-8">
                      <ProgressRing progress={82} size={150} color="cyan" label="Overall Score" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <p className="text-2xl font-bold text-primary">85%</p>
                        <p className="text-sm text-muted-foreground">Communication</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <p className="text-2xl font-bold text-secondary">78%</p>
                        <p className="text-sm text-muted-foreground">Confidence</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <p className="text-2xl font-bold text-emerald-400">82%</p>
                        <p className="text-sm text-muted-foreground">Content</p>
                      </div>
                    </div>

                    <div className="text-left p-6 rounded-lg bg-muted/30 mb-6">
                      <h4 className="font-semibold mb-3">AI Feedback</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ThumbsUp className="w-4 h-4 text-emerald-400 mt-0.5" />
                          Good use of specific examples to illustrate your points.
                        </li>
                        <li className="flex items-start gap-2">
                          <ThumbsUp className="w-4 h-4 text-emerald-400 mt-0.5" />
                          Clear and structured responses following the STAR method.
                        </li>
                        <li className="flex items-start gap-2">
                          <ThumbsDown className="w-4 h-4 text-amber-400 mt-0.5" />
                          Consider adding more quantifiable results to your answers.
                        </li>
                        <li className="flex items-start gap-2">
                          <ThumbsDown className="w-4 h-4 text-amber-400 mt-0.5" />
                          Practice maintaining eye contact and reducing filler words.
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-center gap-4">
                      <NeonButton variant="outline" onClick={() => { setShowFeedback(false); setSelectedType(null); setSelectedCompany(null); }}>
                        New Interview
                      </NeonButton>
                      <NeonButton variant="cyan" onClick={() => { setShowFeedback(false); startInterview(); }}>
                        Retry Interview
                      </NeonButton>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
