"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { motion, Reorder } from "framer-motion"
import {
  Plus,
  MoreVertical,
  Calendar,
  Tag,
  MessageSquare,
  Paperclip,
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  Circle,
  Timer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  tags: string[]
  assignee: string
  dueDate: string
  comments: number
  attachments: number
}

interface Column {
  id: string
  title: string
  icon: React.ElementType
  color: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    icon: Circle,
    color: "text-muted-foreground",
    tasks: [
      {
        id: "1",
        title: "Research competitor analysis",
        description: "Analyze top 5 competitors and their AI features",
        priority: "medium",
        tags: ["Research", "Strategy"],
        assignee: "Alex Chen",
        dueDate: "2024-02-20",
        comments: 3,
        attachments: 1,
      },
      {
        id: "2",
        title: "Design system documentation",
        description: "Create comprehensive docs for the design system",
        priority: "low",
        tags: ["Documentation"],
        assignee: "Sarah Kim",
        dueDate: "2024-02-25",
        comments: 0,
        attachments: 0,
      },
    ],
  },
  {
    id: "todo",
    title: "To Do",
    icon: Timer,
    color: "text-cyan",
    tasks: [
      {
        id: "3",
        title: "Implement user authentication",
        description: "Add OAuth2 with Google and GitHub providers",
        priority: "high",
        tags: ["Backend", "Security"],
        assignee: "Mike Johnson",
        dueDate: "2024-02-10",
        comments: 5,
        attachments: 2,
      },
      {
        id: "4",
        title: "Create onboarding flow",
        description: "Design and implement new user onboarding experience",
        priority: "medium",
        tags: ["UX", "Frontend"],
        assignee: "Alex Chen",
        dueDate: "2024-02-15",
        comments: 2,
        attachments: 3,
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    icon: AlertCircle,
    color: "text-purple",
    tasks: [
      {
        id: "5",
        title: "AI chat interface redesign",
        description: "Improve the chat UI with new components",
        priority: "high",
        tags: ["UI", "AI"],
        assignee: "Sarah Kim",
        dueDate: "2024-02-08",
        comments: 8,
        attachments: 4,
      },
      {
        id: "6",
        title: "API rate limiting",
        description: "Implement rate limiting for all API endpoints",
        priority: "medium",
        tags: ["Backend", "Security"],
        assignee: "Mike Johnson",
        dueDate: "2024-02-12",
        comments: 1,
        attachments: 0,
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    icon: Clock,
    color: "text-yellow-400",
    tasks: [
      {
        id: "7",
        title: "Dashboard analytics widgets",
        description: "Add real-time analytics to the dashboard",
        priority: "medium",
        tags: ["Frontend", "Analytics"],
        assignee: "Alex Chen",
        dueDate: "2024-02-05",
        comments: 4,
        attachments: 1,
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    icon: CheckCircle2,
    color: "text-green-400",
    tasks: [
      {
        id: "8",
        title: "Setup CI/CD pipeline",
        description: "Configure GitHub Actions for automated deployments",
        priority: "high",
        tags: ["DevOps"],
        assignee: "Mike Johnson",
        dueDate: "2024-02-01",
        comments: 6,
        attachments: 2,
      },
    ],
  },
]

const priorityColors = {
  low: "bg-secondary text-muted-foreground",
  medium: "bg-cyan/20 text-cyan",
  high: "bg-destructive/20 text-destructive",
}

export default function TasksPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)

  const handleReorder = (columnId: string, newTasks: Task[]) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, tasks: newTasks } : col))
    )
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <div className="flex-1 ml-[260px]">
        <TopNav />
        
        <main className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Task Board</h1>
                <p className="text-muted-foreground">
                  Manage your tasks with drag and drop kanban board
                </p>
              </div>
              <Button className="bg-gradient-to-r from-cyan to-purple hover:opacity-90 glow-cyan text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            {/* Kanban Board */}
            <div className="flex gap-6 overflow-x-auto pb-4">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className="flex-shrink-0 w-80"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2">
                      <column.icon className={cn("w-5 h-5", column.color)} />
                      <h3 className="font-semibold text-foreground">{column.title}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                        {column.tasks.length}
                      </span>
                    </div>
                    <button className="p-1 hover:bg-secondary/50 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Tasks */}
                  <div className="space-y-3">
                    <Reorder.Group
                      axis="y"
                      values={column.tasks}
                      onReorder={(tasks) => handleReorder(column.id, tasks)}
                      className="space-y-3"
                    >
                      {column.tasks.map((task) => (
                        <Reorder.Item
                          key={task.id}
                          value={task}
                          className="cursor-grab active:cursor-grabbing"
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="glass p-4 rounded-xl space-y-3 hover:border-cyan/30 border border-transparent transition-all"
                          >
                            {/* Priority & Tags */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                                priorityColors[task.priority]
                              )}>
                                {task.priority}
                              </span>
                              {task.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-full bg-purple/20 text-purple text-xs flex items-center gap-1"
                                >
                                  <Tag className="w-3 h-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Title & Description */}
                            <div>
                              <h4 className="font-medium text-foreground mb-1">{task.title}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {task.description}
                              </p>
                            </div>

                            {/* Meta */}
                            <div className="flex items-center justify-between pt-3 border-t border-border/50">
                              <div className="flex items-center gap-3 text-muted-foreground">
                                <span className="flex items-center gap-1 text-xs">
                                  <MessageSquare className="w-3 h-3" />
                                  {task.comments}
                                </span>
                                <span className="flex items-center gap-1 text-xs">
                                  <Paperclip className="w-3 h-3" />
                                  {task.attachments}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan/20 to-purple/20 flex items-center justify-center">
                                  <User className="w-3 h-3 text-cyan" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>

                    {/* Add Task Button */}
                    <button className="w-full p-3 rounded-xl border border-dashed border-border/50 text-muted-foreground hover:border-cyan/50 hover:text-cyan transition-all flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
