"use client"

import { motion } from "framer-motion"
import { 
  Flame, 
  Target, 
  Code2, 
  GitBranch, 
  Sparkles,
  TrendingUp,
  Calendar,
  BookOpen,
  Trophy,
  Clock,
  ChevronRight,
  Play
} from "lucide-react"
import { GlassCard, StatCard, ProgressRing, GradientText } from "@/components/zentrix/ui-components"
import Link from "next/link"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts"

const weeklyProgress = [
  { day: "Mon", problems: 5, hours: 2 },
  { day: "Tue", problems: 8, hours: 3 },
  { day: "Wed", problems: 3, hours: 1.5 },
  { day: "Thu", problems: 12, hours: 4 },
  { day: "Fri", problems: 7, hours: 2.5 },
  { day: "Sat", problems: 15, hours: 5 },
  { day: "Sun", problems: 10, hours: 3.5 },
]

const dsaTopics = [
  { name: "Arrays", solved: 45, total: 60, color: "bg-primary" },
  { name: "Strings", solved: 30, total: 40, color: "bg-secondary" },
  { name: "Trees", solved: 20, total: 50, color: "bg-chart-3" },
  { name: "Graphs", solved: 15, total: 45, color: "bg-chart-4" },
  { name: "DP", solved: 10, total: 55, color: "bg-chart-5" },
]

const recentActivity = [
  { type: "problem", title: "Two Sum", difficulty: "Easy", time: "2 hours ago" },
  { type: "roadmap", title: "Completed: Arrays Basics", time: "5 hours ago" },
  { type: "github", title: "Pushed to portfolio-v2", time: "1 day ago" },
  { type: "interview", title: "Completed Mock Interview", time: "2 days ago" },
]

const upcomingTasks = [
  { title: "Complete Binary Search module", due: "Today", priority: "high" },
  { title: "Review Graph algorithms", due: "Tomorrow", priority: "medium" },
  { title: "Submit resume for review", due: "3 days", priority: "low" },
]

const quickActions = [
  { icon: Code2, label: "Solve Problem", href: "/dsa", color: "from-primary to-cyan-400" },
  { icon: Sparkles, label: "Ask AI", href: "/assistant", color: "from-secondary to-purple-400" },
  { icon: Target, label: "View Roadmap", href: "/roadmap", color: "from-emerald-500 to-green-400" },
  { icon: GitBranch, label: "GitHub", href: "/github", color: "from-orange-500 to-amber-400" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-8 glass-card glow-cyan"
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Good morning, <GradientText>Alex</GradientText>!
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            {"You're on a 32-day coding streak. Keep it up!"}
          </p>
          <div className="flex flex-wrap gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${action.color} text-white font-medium`}
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </motion.button>
              </Link>
            ))}
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Coding Streak"
          value="32 days"
          icon={<Flame className="w-6 h-6" />}
          trend={{ value: 15, positive: true }}
          glowColor="cyan"
        />
        <StatCard
          label="Problems Solved"
          value="247"
          icon={<Code2 className="w-6 h-6" />}
          trend={{ value: 23, positive: true }}
          glowColor="purple"
        />
        <StatCard
          label="Roadmap Progress"
          value="68%"
          icon={<Target className="w-6 h-6" />}
          trend={{ value: 8, positive: true }}
          glowColor="cyan"
        />
        <StatCard
          label="GitHub Commits"
          value="156"
          icon={<GitBranch className="w-6 h-6" />}
          trend={{ value: 12, positive: true }}
          glowColor="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <GlassCard className="lg:col-span-2" glowColor="cyan" hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Weekly Progress</h3>
              <p className="text-muted-foreground text-sm">Problems solved this week</p>
            </div>
            <select className="bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProgress}>
                <defs>
                  <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.75 0.18 195)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.75 0.18 195)" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="problems"
                  stroke="oklch(0.75 0.18 195)"
                  fillOpacity={1}
                  fill="url(#colorProblems)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* DSA Progress */}
        <GlassCard glowColor="purple" hover={false}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">DSA Progress</h3>
            <Link href="/dsa" className="text-primary text-sm hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {dsaTopics.map((topic) => (
              <div key={topic.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{topic.name}</span>
                  <span className="text-muted-foreground">{topic.solved}/{topic.total}</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(topic.solved / topic.total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded-full ${topic.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <ProgressRing progress={68} color="purple" label="Overall" />
          </div>
        </GlassCard>
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* AI Assistant Quick Access */}
        <GlassCard glowColor="cyan">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-muted-foreground text-sm">Get instant help</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <button className="w-full text-left px-3 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-sm">
              Explain Binary Search
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-sm">
              Review my code
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-sm">
              Interview tips for Amazon
            </button>
          </div>
          <Link href="/assistant">
            <button className="w-full py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium">
              Open AI Assistant
            </button>
          </Link>
        </GlassCard>

        {/* Recent Activity */}
        <GlassCard glowColor="purple" hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === "problem" ? "bg-primary" :
                  activity.type === "roadmap" ? "bg-secondary" :
                  activity.type === "github" ? "bg-emerald-400" : "bg-amber-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Upcoming Tasks */}
        <GlassCard glowColor="cyan" hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Upcoming Tasks</h3>
            <Link href="/tasks" className="text-primary text-sm hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{task.title}</p>
                  <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  task.priority === "high" ? "bg-red-500/20 text-red-400" :
                  task.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-green-500/20 text-green-400"
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Study Hours Chart */}
      <GlassCard glowColor="purple" hover={false}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Daily Study Hours</h3>
            <p className="text-muted-foreground text-sm">Track your consistency</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-secondary" />
              Hours
            </span>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyProgress}>
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
              <Bar dataKey="hours" fill="oklch(0.65 0.2 300)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* GitHub Activity Heatmap */}
      <GlassCard glowColor="cyan" hover={false}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">GitHub Activity</h3>
            <p className="text-muted-foreground text-sm">156 contributions in the last year</p>
          </div>
          <Link href="/github" className="text-primary text-sm hover:underline flex items-center gap-1">
            View Full Activity <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 52 * 7 }).map((_, i) => {
            const intensity = Math.random()
            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${
                  intensity > 0.8 ? "bg-primary" :
                  intensity > 0.6 ? "bg-primary/70" :
                  intensity > 0.4 ? "bg-primary/40" :
                  intensity > 0.2 ? "bg-primary/20" : "bg-muted/30"
                }`}
              />
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}
