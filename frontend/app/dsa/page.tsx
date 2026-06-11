"use client"

import { motion } from "framer-motion"
import { 
  Code2, 
  TrendingUp, 
  Target, 
  Zap,
  ChevronRight,
  CheckCircle,
  Circle,
  Flame
} from "lucide-react"
import { GlassCard, ProgressRing, GradientText } from "@/components/zentrix/ui-components"
import { Sidebar } from "@/components/zentrix/navigation"
import { TopNav } from "@/components/zentrix/top-nav"
import { useEffect, useState } from "react"
import API from "@/services/api"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts"

const topicData = [
  { topic: "Arrays", solved: 45, total: 60, easy: 25, medium: 15, hard: 5 },
  { topic: "Strings", solved: 30, total: 40, easy: 15, medium: 12, hard: 3 },
  { topic: "Linked Lists", solved: 18, total: 30, easy: 10, medium: 6, hard: 2 },
  { topic: "Trees", solved: 20, total: 50, easy: 8, medium: 10, hard: 2 },
  { topic: "Graphs", solved: 15, total: 45, easy: 5, medium: 8, hard: 2 },
  { topic: "Dynamic Programming", solved: 10, total: 55, easy: 3, medium: 5, hard: 2 },
  { topic: "Recursion", solved: 22, total: 35, easy: 12, medium: 8, hard: 2 },
  { topic: "Sorting", solved: 28, total: 30, easy: 15, medium: 10, hard: 3 },
]

const weeklyData = [
  { day: "Mon", easy: 3, medium: 2, hard: 0 },
  { day: "Tue", easy: 4, medium: 3, hard: 1 },
  { day: "Wed", easy: 2, medium: 1, hard: 0 },
  { day: "Thu", easy: 5, medium: 4, hard: 2 },
  { day: "Fri", easy: 3, medium: 2, hard: 1 },
  { day: "Sat", easy: 6, medium: 5, hard: 2 },
  { day: "Sun", easy: 4, medium: 3, hard: 1 },
]



const radarData = [
  { subject: "Arrays", A: 85, fullMark: 100 },
  { subject: "Strings", A: 75, fullMark: 100 },
  { subject: "Trees", A: 40, fullMark: 100 },
  { subject: "Graphs", A: 33, fullMark: 100 },
  { subject: "DP", A: 18, fullMark: 100 },
  { subject: "Sorting", A: 93, fullMark: 100 },
]

const recentProblems = [
  { name: "Two Sum", difficulty: "Easy", status: "solved", time: "12 min" },
  { name: "LRU Cache", difficulty: "Medium", status: "solved", time: "45 min" },
  { name: "Merge K Sorted Lists", difficulty: "Hard", status: "attempted", time: "60 min" },
  { name: "Valid Parentheses", difficulty: "Easy", status: "solved", time: "8 min" },
  { name: "Binary Tree Level Order", difficulty: "Medium", status: "solved", time: "22 min" },
]

const heatmapData = Array.from({ length: 365 }, (_, i) => ({
  date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000),
  count: Math.floor(Math.random() * 10)
}))

export default function DSAPage() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [recentProblems, setRecentProblems] =
  useState<any[]>([])

useEffect(() => {

  const fetchAnalytics = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      )

      const res = await API.get(
        `/dsa-analytics/${user._id}`
      )

      setAnalytics(res.data)
      const recentRes = await API.get(
  `/problems/recent/${user._id}`
)

setRecentProblems(
  recentRes.data
)


    } catch (error) {

      console.log(error)

    }

  }

  fetchAnalytics()

}, [])
const difficultyBreakdown = analytics
  ? [
      {
        name: "Easy",
        value: analytics.easy,
        color: "#22c55e",
      },
      {
        name: "Medium",
        value: analytics.medium,
        color: "#f59e0b",
      },
      {
        name: "Hard",
        value: analytics.hard,
        color: "#ef4444",
      },
    ]
  : [
      {
        name: "Easy",
        value: 0,
        color: "#22c55e",
      },
      {
        name: "Medium",
        value: 0,
        color: "#f59e0b",
      },
      {
        name: "Hard",
        value: 0,
        color: "#ef4444",
      },
    ]
  const totalSolved =
analytics?.totalSolved || 0
  const readinessScore = 78

const aiInsights = {
  strengths: ["Arrays", "Strings", "Sorting"],
  weaknesses: ["Graphs", "Dynamic Programming"],
  recommendations: [
    "Solve 15 Graph problems",
    "Solve 10 DP problems",
    "Participate in 2 contests this week",
  ],
}
  
  return (
    <div className="min-h-screen gradient-bg">
      <Sidebar currentPath="/dsa" />
      <div className="ml-64 transition-all duration-300">
        <TopNav userName="Alex" />
        
        <main className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">DSA <GradientText>Analytics</GradientText></h1>
                <p className="text-muted-foreground">Track your problem-solving progress</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:glow-cyan transition-all flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Practice Now
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlassCard glowColor="cyan">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Total Solved</p>
                    <p className="text-3xl font-bold">{totalSolved}</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard glowColor="purple">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-secondary/20">
                    <Flame className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Current Streak</p>
                    <p className="text-3xl font-bold">32 days</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard glowColor="cyan">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/20">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">This Week</p>
                    <p className="text-3xl font-bold">47</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard glowColor="purple">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-amber-500/20">
                    <Target className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Acceptance Rate</p>
                    <p className="text-3xl font-bold">76%</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Difficulty Breakdown */}
              <GlassCard glowColor="cyan" hover={false}>
                <h3 className="text-lg font-semibold mb-4">Difficulty Breakdown</h3>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={difficultyBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {difficultyBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.12 0.02 270)",
                          border: "1px solid oklch(0.25 0.03 270)",
                          borderRadius: "8px"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {difficultyBreakdown.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Topic Mastery Radar */}
              <GlassCard glowColor="purple" hover={false}>
                <h3 className="text-lg font-semibold mb-4">Topic Mastery</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="oklch(0.25 0.03 270)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "oklch(0.65 0.02 270)", fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "oklch(0.65 0.02 270)" }} />
                      <Radar
                        name="Mastery"
                        dataKey="A"
                        stroke="oklch(0.75 0.18 195)"
                        fill="oklch(0.75 0.18 195)"
                        fillOpacity={0.3}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.12 0.02 270)",
                          border: "1px solid oklch(0.25 0.03 270)",
                          borderRadius: "8px"
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              {/* Weekly Performance */}
              <GlassCard glowColor="cyan" hover={false}>
                <h3 className="text-lg font-semibold mb-4">Weekly Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.03 270)" />
                      <XAxis dataKey="day" stroke="oklch(0.65 0.02 270)" />
                      <YAxis stroke="oklch(0.65 0.02 270)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.12 0.02 270)",
                          border: "1px solid oklch(0.25 0.03 270)",
                          borderRadius: "8px"
                        }}
                      />
                      <Bar dataKey="easy" stackId="a" fill="oklch(0.7 0.15 145)" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="medium" stackId="a" fill="oklch(0.75 0.15 85)" />
                      <Bar dataKey="hard" stackId="a" fill="oklch(0.65 0.2 25)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>

            {/* Topic Progress */}
            <GlassCard glowColor="purple" hover={false}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Topic Progress</h3>
                <select className="bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm">
                  <option>All Topics</option>
                  <option>Arrays</option>
                  <option>Strings</option>
                  <option>Trees</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topicData.map((topic) => (
                  <div key={topic.topic} className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{topic.topic}</span>
                      <span className="text-sm text-muted-foreground">{topic.solved}/{topic.total}</span>
                    </div>
                    <div className="h-2 bg-muted/50 rounded-full overflow-hidden mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(topic.solved / topic.total) * 100}%` }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="text-emerald-400">E: {topic.easy}</span>
                      <span className="text-amber-400">M: {topic.medium}</span>
                      <span className="text-red-400">H: {topic.hard}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
           <GlassCard glowColor="cyan" hover={false}>
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-lg font-semibold">
      Interview Readiness
    </h3>

    <Zap className="w-6 h-6 text-yellow-400" />
  </div>

  <div className="flex items-center gap-8">

    <div className="text-6xl font-bold text-cyan-400">
      {readinessScore}%
    </div>

    <div className="space-y-2">

      <p className="text-emerald-400">
        ✅ Ready for OA Rounds
      </p>

      <p className="text-emerald-400">
        ✅ Internship Interviews
      </p>

      <p className="text-amber-400">
        ⚠ Improve Graphs
      </p>

      <p className="text-amber-400">
        ⚠ Improve Dynamic Programming
      </p>

    </div>

  </div>
</GlassCard> 

            {/* Bottom Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Activity Heatmap */}
              <GlassCard glowColor="cyan" hover={false}>
                <h3 className="text-lg font-semibold mb-4">Consistency Heatmap</h3>
                <div className="overflow-x-auto">
                  <div className="flex flex-wrap gap-1" style={{ width: "fit-content" }}>
                    {heatmapData.map((day, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-sm ${
                          day.count === 0 ? "bg-muted/30" :
                          day.count < 3 ? "bg-primary/30" :
                          day.count < 6 ? "bg-primary/60" : "bg-primary"
                        }`}
                        title={`${day.date.toDateString()}: ${day.count} problems`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-muted/30" />
                    <div className="w-3 h-3 rounded-sm bg-primary/30" />
                    <div className="w-3 h-3 rounded-sm bg-primary/60" />
                    <div className="w-3 h-3 rounded-sm bg-primary" />
                  </div>
                  <span>More</span>
                </div>
              </GlassCard>
              <GlassCard glowColor="purple" hover={false}>
  <h3 className="text-lg font-semibold mb-6">
    AI Insights
  </h3>

  <div className="grid md:grid-cols-3 gap-6">

    <div>
      <h4 className="font-semibold text-emerald-400 mb-3">
        Strengths
      </h4>

      <ul className="space-y-2">
        {aiInsights.strengths.map((item) => (
          <li key={item}>
            ✅ {item}
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h4 className="font-semibold text-amber-400 mb-3">
        Weak Areas
      </h4>

      <ul className="space-y-2">
        {aiInsights.weaknesses.map((item) => (
          <li key={item}>
            ⚠ {item}
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h4 className="font-semibold text-cyan-400 mb-3">
        Recommendations
      </h4>

      <ul className="space-y-2">
        {aiInsights.recommendations.map((item) => (
          <li key={item}>
            🎯 {item}
          </li>
        ))}
      </ul>
    </div>

  </div>
</GlassCard>

              {/* Recent Problems */}
              <GlassCard glowColor="purple" hover={false}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recent Problems</h3>
                  <button className="text-primary text-sm hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {recentProblems.map((problem, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        {problem.status === "solved" ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-amber-400" />
                        )}
                        <div>
                          <p className="font-medium">{problem.name}</p>
                          <p className={`text-xs ${
                            problem.difficulty === "Easy" ? "text-emerald-400" :
                            problem.difficulty === "Medium" ? "text-amber-400" : "text-red-400"
                          }`}>{problem.difficulty}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{problem.time}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
<GlassCard glowColor="cyan" hover={false}>
  <h3 className="text-lg font-semibold mb-6">
    Contest Analytics
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <div>
      <p className="text-muted-foreground text-sm">
        Current Rating
      </p>

      <p className="text-2xl font-bold">
        1650
      </p>
    </div>

    <div>
      <p className="text-muted-foreground text-sm">
        Best Rating
      </p>

      <p className="text-2xl font-bold text-cyan-400">
        1720
      </p>
    </div>

    <div>
      <p className="text-muted-foreground text-sm">
        Global Rank
      </p>

      <p className="text-2xl font-bold">
        4521
      </p>
    </div>

    <div>
      <p className="text-muted-foreground text-sm">
        Last Contest
      </p>

      <p className="text-2xl font-bold text-emerald-400">
        +82
      </p>
    </div>

  </div>
</GlassCard>
