"use client"

import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { GlassCard, StatCard } from "@/components/glass-card"
import { motion } from "framer-motion"
import {
  Sparkles,
  TrendingUp,
  Users,
  FolderKanban,
  CheckSquare,
  ArrowRight,
  Play,
  Clock,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const projects = [
  {
    name: "AI Content Generator",
    status: "In Progress",
    progress: 75,
    tasks: 24,
    team: 4,
  },
  {
    name: "Data Analysis Pipeline",
    status: "Review",
    progress: 90,
    tasks: 18,
    team: 3,
  },
  {
    name: "Customer Chatbot",
    status: "Planning",
    progress: 30,
    tasks: 12,
    team: 2,
  },
]

const activities = [
  {
    action: "Task completed",
    project: "AI Content Generator",
    time: "2 min ago",
    icon: CheckSquare,
  },
  {
    action: "New comment",
    project: "Data Analysis Pipeline",
    time: "15 min ago",
    icon: Sparkles,
  },
  {
    action: "Project updated",
    project: "Customer Chatbot",
    time: "1 hour ago",
    icon: FolderKanban,
  },
  {
    action: "Team member joined",
    project: "AI Content Generator",
    time: "3 hours ago",
    icon: Users,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <div className="flex-1 ml-[260px]">
        <TopNav />
        
        <main className="p-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={item} className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, <span className="text-cyan text-glow-cyan">Alex</span>
                </h1>
                <p className="text-muted-foreground">
                  Here&apos;s what&apos;s happening with your projects today.
                </p>
              </div>
              <Link href="/chat">
                <Button className="bg-gradient-to-r from-cyan to-purple hover:opacity-90 glow-cyan text-primary-foreground">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ask AI Assistant
                </Button>
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Projects"
                value={12}
                change="+2 this month"
                changeType="positive"
                icon={<FolderKanban className="w-6 h-6 text-cyan" />}
                glow="cyan"
              />
              <StatCard
                title="Tasks Completed"
                value={87}
                change="+15 this week"
                changeType="positive"
                icon={<CheckSquare className="w-6 h-6 text-purple" />}
                glow="purple"
              />
              <StatCard
                title="AI Conversations"
                value={156}
                change="+28 today"
                changeType="positive"
                icon={<Sparkles className="w-6 h-6 text-cyan" />}
                glow="cyan"
              />
              <StatCard
                title="Team Members"
                value={8}
                change="2 online"
                changeType="neutral"
                icon={<Users className="w-6 h-6 text-purple" />}
                glow="purple"
              />
            </motion.div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Projects Section */}
              <motion.div variants={item} className="lg:col-span-2">
                <GlassCard hover={false}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Active Projects</h2>
                    <Link href="/projects">
                      <Button variant="ghost" size="sm" className="text-cyan hover:text-cyan-glow">
                        View All
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-cyan/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/20 to-purple/20 flex items-center justify-center">
                              <FolderKanban className="w-5 h-5 text-cyan" />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{project.name}</h3>
                              <p className="text-sm text-muted-foreground">{project.tasks} tasks</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "In Progress"
                              ? "bg-cyan/20 text-cyan"
                              : project.status === "Review"
                              ? "bg-purple/20 text-purple"
                              : "bg-secondary text-muted-foreground"
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              className="h-full bg-gradient-to-r from-cyan to-purple rounded-full"
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{project.progress}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* AI Assistant Quick Panel */}
              <motion.div variants={item}>
                <GlassCard hover={false} glow="cyan">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-purple flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">AI Assistant</h2>
                      <p className="text-xs text-cyan">Online & Ready</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">
                    Ask me anything about your projects, tasks, or get help with your work.
                  </p>

                  <div className="space-y-2 mb-4">
                    {["Generate report", "Analyze data", "Write documentation"].map((suggestion) => (
                      <button
                        key={suggestion}
                        className="w-full p-3 rounded-lg bg-secondary/50 border border-border/50 text-sm text-left text-foreground hover:border-cyan/50 hover:bg-cyan/5 transition-all flex items-center gap-2"
                      >
                        <Zap className="w-4 h-4 text-cyan" />
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  <Link href="/chat">
                    <Button className="w-full bg-gradient-to-r from-cyan to-purple hover:opacity-90 text-primary-foreground">
                      <Play className="w-4 h-4 mr-2" />
                      Start Conversation
                    </Button>
                  </Link>
                </GlassCard>
              </motion.div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Activity Feed */}
              <motion.div variants={item}>
                <GlassCard hover={false}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                          <activity.icon className="w-5 h-5 text-cyan" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.project}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Analytics Overview */}
              <motion.div variants={item}>
                <GlassCard hover={false}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Performance</h2>
                    <TrendingUp className="w-5 h-5 text-cyan" />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Task Completion Rate</span>
                        <span className="text-sm font-medium text-cyan">92%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "92%" }}
                          transition={{ duration: 1, delay: 0.8 }}
                          className="h-full bg-gradient-to-r from-cyan to-cyan-glow rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">AI Utilization</span>
                        <span className="text-sm font-medium text-purple">78%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "78%" }}
                          transition={{ duration: 1, delay: 0.9 }}
                          className="h-full bg-gradient-to-r from-purple to-purple-glow rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Team Productivity</span>
                        <span className="text-sm font-medium text-cyan">85%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1, delay: 1 }}
                          className="h-full bg-gradient-to-r from-cyan to-purple rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
