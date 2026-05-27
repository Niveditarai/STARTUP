"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Map, 
  Target, 
  CheckCircle, 
  Circle,
  Clock,
  BookOpen,
  Code2,
  Briefcase,
  Sparkles,
  ChevronDown,
  ExternalLink,
  Play,
  Lock
} from "lucide-react"
import { GlassCard, NeonButton, GradientText, ProgressRing } from "@/components/zentrix/ui-components"
import { Sidebar, TopNav } from "@/components/zentrix/navigation"

const careerGoals = [
  { id: "frontend", label: "Frontend Developer", icon: Code2 },
  { id: "backend", label: "Backend Developer", icon: Code2 },
  { id: "fullstack", label: "Full Stack Developer", icon: Code2 },
  { id: "ml", label: "ML Engineer", icon: Sparkles },
  { id: "devops", label: "DevOps Engineer", icon: Target },
  { id: "mobile", label: "Mobile Developer", icon: Code2 },
]

const roadmapData = {
  title: "Full Stack Developer Roadmap",
  totalModules: 12,
  completedModules: 8,
  phases: [
    {
      title: "Phase 1: Foundations",
      status: "completed",
      modules: [
        { title: "HTML & CSS Basics", status: "completed", duration: "2 weeks" },
        { title: "JavaScript Fundamentals", status: "completed", duration: "3 weeks" },
        { title: "Git & Version Control", status: "completed", duration: "1 week" },
      ]
    },
    {
      title: "Phase 2: Frontend",
      status: "completed",
      modules: [
        { title: "React.js Fundamentals", status: "completed", duration: "3 weeks" },
        { title: "State Management", status: "completed", duration: "2 weeks" },
        { title: "TypeScript", status: "completed", duration: "2 weeks" },
      ]
    },
    {
      title: "Phase 3: Backend",
      status: "in-progress",
      modules: [
        { title: "Node.js & Express", status: "completed", duration: "3 weeks" },
        { title: "Databases (SQL & NoSQL)", status: "in-progress", duration: "3 weeks" },
        { title: "REST API Design", status: "locked", duration: "2 weeks" },
      ]
    },
    {
      title: "Phase 4: Advanced",
      status: "locked",
      modules: [
        { title: "System Design Basics", status: "locked", duration: "3 weeks" },
        { title: "DevOps & Deployment", status: "locked", duration: "2 weeks" },
        { title: "Final Project", status: "locked", duration: "4 weeks" },
      ]
    },
  ]
}

const recommendedResources = [
  { title: "MongoDB University", type: "Course", url: "#", duration: "4 hours" },
  { title: "SQL for Beginners", type: "Tutorial", url: "#", duration: "2 hours" },
  { title: "Database Design Patterns", type: "Article", url: "#", duration: "30 min" },
]

const recommendedProjects = [
  { title: "Task Manager API", difficulty: "Intermediate", skills: ["Node.js", "MongoDB", "REST"] },
  { title: "E-commerce Backend", difficulty: "Advanced", skills: ["Express", "PostgreSQL", "Auth"] },
  { title: "Real-time Chat App", difficulty: "Intermediate", skills: ["Socket.io", "MongoDB", "React"] },
]

export default function RoadmapPage() {
  const [selectedGoal, setSelectedGoal] = useState("fullstack")
  const [expandedPhase, setExpandedPhase] = useState<number | null>(2)

  const progress = Math.round((roadmapData.completedModules / roadmapData.totalModules) * 100)

  return (
    <div className="min-h-screen gradient-bg">
      <Sidebar currentPath="/roadmap" />
      <div className="ml-64 transition-all duration-300">
        <TopNav userName="Alex" />
        
        <main className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">AI <GradientText>Roadmap</GradientText></h1>
                <p className="text-muted-foreground">Your personalized learning path to success</p>
              </div>
              <NeonButton variant="purple" className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Regenerate Roadmap
              </NeonButton>
            </div>

            {/* Career Goal Selection */}
            <GlassCard glowColor="cyan" hover={false}>
              <h3 className="text-lg font-semibold mb-4">Select Your Career Goal</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {careerGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                      selectedGoal === goal.id 
                        ? "border-primary bg-primary/10 glow-cyan" 
                        : "border-border hover:border-primary/50 hover:bg-muted/30"
                    }`}
                  >
                    <goal.icon className={`w-6 h-6 ${selectedGoal === goal.id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium text-center ${selectedGoal === goal.id ? "text-primary" : ""}`}>
                      {goal.label}
                    </span>
                  </button>
                ))}
              </div>
            </GlassCard>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Roadmap */}
              <div className="lg:col-span-2 space-y-4">
                {/* Progress Overview */}
                <GlassCard glowColor="purple" hover={false}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{roadmapData.title}</h3>
                      <p className="text-muted-foreground">
                        {roadmapData.completedModules} of {roadmapData.totalModules} modules completed
                      </p>
                    </div>
                    <ProgressRing progress={progress} color="purple" />
                  </div>
                </GlassCard>

                {/* Phases */}
                <div className="space-y-4">
                  {roadmapData.phases.map((phase, phaseIdx) => (
                    <GlassCard 
                      key={phaseIdx} 
                      glowColor={phase.status === "in-progress" ? "cyan" : "none"}
                      hover={false}
                      className={phase.status === "locked" ? "opacity-60" : ""}
                    >
                      <button
                        onClick={() => setExpandedPhase(expandedPhase === phaseIdx ? null : phaseIdx)}
                        className="w-full flex items-center justify-between"
                        disabled={phase.status === "locked"}
                      >
                        <div className="flex items-center gap-3">
                          {phase.status === "completed" ? (
                            <CheckCircle className="w-6 h-6 text-emerald-400" />
                          ) : phase.status === "in-progress" ? (
                            <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            </div>
                          ) : (
                            <Lock className="w-6 h-6 text-muted-foreground" />
                          )}
                          <div className="text-left">
                            <h4 className="font-semibold">{phase.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {phase.modules.filter(m => m.status === "completed").length}/{phase.modules.length} modules
                            </p>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedPhase === phaseIdx ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {expandedPhase === phaseIdx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-3 pl-9">
                              {phase.modules.map((module, modIdx) => (
                                <div
                                  key={modIdx}
                                  className={`flex items-center justify-between p-3 rounded-lg ${
                                    module.status === "in-progress" 
                                      ? "bg-primary/10 border border-primary/30" 
                                      : "bg-muted/30"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    {module.status === "completed" ? (
                                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                                    ) : module.status === "in-progress" ? (
                                      <Play className="w-5 h-5 text-primary" />
                                    ) : (
                                      <Lock className="w-5 h-5 text-muted-foreground" />
                                    )}
                                    <span className={module.status === "locked" ? "text-muted-foreground" : ""}>
                                      {module.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    {module.duration}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </GlassCard>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Current Module */}
                <GlassCard glowColor="cyan" hover={false}>
                  <div className="flex items-center gap-2 mb-4">
                    <Play className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Currently Learning</h3>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 mb-4">
                    <h4 className="font-medium mb-1">Databases (SQL & NoSQL)</h4>
                    <p className="text-sm text-muted-foreground mb-3">Learn about relational and document databases</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary">45%</span>
                    </div>
                    <div className="h-2 bg-muted/50 rounded-full overflow-hidden mt-2">
                      <div className="h-full w-[45%] bg-primary rounded-full" />
                    </div>
                  </div>
                  <NeonButton variant="cyan" className="w-full">
                    Continue Learning
                  </NeonButton>
                </GlassCard>

                {/* Recommended Resources */}
                <GlassCard glowColor="purple" hover={false}>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    <h3 className="font-semibold">Recommended Resources</h3>
                  </div>
                  <div className="space-y-3">
                    {recommendedResources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-sm">{resource.title}</p>
                          <p className="text-xs text-muted-foreground">{resource.type} • {resource.duration}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </GlassCard>

                {/* Recommended Projects */}
                <GlassCard glowColor="cyan" hover={false}>
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Recommended Projects</h3>
                  </div>
                  <div className="space-y-3">
                    {recommendedProjects.map((project, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-muted/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm">{project.title}</p>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            project.difficulty === "Advanced" 
                              ? "bg-red-500/20 text-red-400" 
                              : "bg-amber-500/20 text-amber-400"
                          }`}>
                            {project.difficulty}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.skills.map((skill) => (
                            <span key={skill} className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
