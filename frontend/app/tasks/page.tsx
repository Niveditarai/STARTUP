"use client"

import { useState } from "react"
import { motion, Reorder } from "framer-motion"
import { 
  CheckSquare, 
  Plus, 
  Calendar,
  Clock,
  Flag,
  MoreHorizontal,
  CheckCircle,
  Circle,
  Trash2,
  Edit3
} from "lucide-react"
import { GlassCard, NeonButton, GradientText } from "@/components/zentrix/ui-components"
import { Sidebar, TopNav } from "@/components/zentrix/navigation"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface Task {
  id: string
  title: string
  description?: string
  priority: "high" | "medium" | "low"
  dueDate: string
  completed: boolean
  category: string
}

const initialTasks: Task[] = [
  { id: "1", title: "Complete Binary Search module", description: "Finish all problems in the module", priority: "high", dueDate: "Today", completed: false, category: "DSA" },
  { id: "2", title: "Review Graph algorithms", priority: "medium", dueDate: "Tomorrow", completed: false, category: "DSA" },
  { id: "3", title: "Submit resume for review", priority: "low", dueDate: "May 27", completed: false, category: "Career" },
  { id: "4", title: "Practice mock interview", priority: "high", dueDate: "May 28", completed: false, category: "Interview" },
  { id: "5", title: "Push portfolio updates", priority: "medium", dueDate: "May 26", completed: true, category: "Project" },
  { id: "6", title: "Complete React hooks tutorial", priority: "low", dueDate: "May 29", completed: true, category: "Learning" },
]

const productivityData = [
  { name: "Completed", value: 12, color: "oklch(0.7 0.15 145)" },
  { name: "In Progress", value: 5, color: "oklch(0.75 0.18 195)" },
  { name: "Pending", value: 8, color: "oklch(0.65 0.2 300)" },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  const completedCount = tasks.filter(t => t.completed).length
  const pendingCount = tasks.filter(t => !t.completed).length

  return (
    <div className="min-h-screen gradient-bg">
      <Sidebar currentPath="/tasks" />
      <div className="ml-64 transition-all duration-300">
        <TopNav userName="Alex" />
        
        <main className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Task <GradientText>Manager</GradientText></h1>
                <p className="text-muted-foreground">Stay organized and track your progress</p>
              </div>
              <NeonButton variant="cyan" className="flex items-center gap-2" onClick={() => setShowAddModal(true)}>
                <Plus className="w-5 h-5" />
                Add Task
              </NeonButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <GlassCard glowColor="cyan">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <CheckSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Total Tasks</p>
                    <p className="text-3xl font-bold">{tasks.length}</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard glowColor="purple">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/20">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Completed</p>
                    <p className="text-3xl font-bold">{completedCount}</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard glowColor="cyan">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-amber-500/20">
                    <Clock className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Pending</p>
                    <p className="text-3xl font-bold">{pendingCount}</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard glowColor="purple" hover={false}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Completion Rate</p>
                    <p className="text-3xl font-bold">{Math.round((completedCount / tasks.length) * 100)}%</p>
                  </div>
                  <div className="w-16 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { value: completedCount },
                            { value: pendingCount }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={20}
                          outerRadius={30}
                          dataKey="value"
                        >
                          <Cell fill="oklch(0.7 0.15 145)" />
                          <Cell fill="oklch(0.25 0.03 270)" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Task List */}
              <div className="lg:col-span-2">
                <GlassCard glowColor="cyan" hover={false}>
                  {/* Filters */}
                  <div className="flex items-center gap-2 mb-6">
                    {["all", "pending", "completed"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filter === f 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Tasks */}
                  <div className="space-y-3">
                    {filteredTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-all ${
                          task.completed ? "opacity-60" : ""
                        }`}
                      >
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="shrink-0"
                        >
                          {task.completed ? (
                            <CheckCircle className="w-6 h-6 text-emerald-400" />
                          ) : (
                            <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                          )}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </p>
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              task.priority === "high" ? "bg-red-500/20 text-red-400" :
                              task.priority === "medium" ? "bg-amber-500/20 text-amber-400" :
                              "bg-emerald-500/20 text-emerald-400"
                            }`}>
                              {task.priority}
                            </span>
                            <span className="px-2 py-0.5 rounded text-xs bg-primary/20 text-primary">
                              {task.category}
                            </span>
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {task.dueDate}
                          </span>
                          <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Productivity Chart */}
                <GlassCard glowColor="purple" hover={false}>
                  <h3 className="font-semibold mb-4">Task Overview</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productivityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {productivityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {productivityData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Today's Focus */}
                <GlassCard glowColor="cyan" hover={false}>
                  <h3 className="font-semibold mb-4">{"Today's Focus"}</h3>
                  <div className="space-y-3">
                    {tasks.filter(t => t.dueDate === "Today" && !t.completed).map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
                        <Flag className={`w-4 h-4 ${
                          task.priority === "high" ? "text-red-400" :
                          task.priority === "medium" ? "text-amber-400" : "text-emerald-400"
                        }`} />
                        <span className="text-sm font-medium">{task.title}</span>
                      </div>
                    ))}
                    {tasks.filter(t => t.dueDate === "Today" && !t.completed).length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No tasks due today!
                      </p>
                    )}
                  </div>
                </GlassCard>

                {/* Categories */}
                <GlassCard glowColor="purple" hover={false}>
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {["DSA", "Interview", "Project", "Learning", "Career"].map((cat) => {
                      const count = tasks.filter(t => t.category === cat).length
                      return (
                        <div key={cat} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                          <span className="text-sm">{cat}</span>
                          <span className="text-xs px-2 py-1 rounded bg-muted/50">{count}</span>
                        </div>
                      )
                    })}
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
