"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { GlassCard } from "@/components/glass-card"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  FolderKanban,
  MoreVertical,
  Users,
  Calendar,
  Star,
  StarOff,
  Grid3X3,
  List,
  Search,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "archived"
  progress: number
  tasks: number
  completedTasks: number
  team: number
  dueDate: string
  starred: boolean
  color: "cyan" | "purple"
}

const initialProjects: Project[] = [
  {
    id: "1",
    name: "AI Content Generator",
    description: "Automated content generation using GPT-4 for marketing materials",
    status: "active",
    progress: 75,
    tasks: 24,
    completedTasks: 18,
    team: 4,
    dueDate: "2024-02-15",
    starred: true,
    color: "cyan",
  },
  {
    id: "2",
    name: "Data Analysis Pipeline",
    description: "Real-time data processing and visualization dashboard",
    status: "active",
    progress: 90,
    tasks: 18,
    completedTasks: 16,
    team: 3,
    dueDate: "2024-01-30",
    starred: true,
    color: "purple",
  },
  {
    id: "3",
    name: "Customer Chatbot",
    description: "AI-powered customer support chatbot with sentiment analysis",
    status: "active",
    progress: 30,
    tasks: 12,
    completedTasks: 4,
    team: 2,
    dueDate: "2024-03-01",
    starred: false,
    color: "cyan",
  },
  {
    id: "4",
    name: "Mobile App Redesign",
    description: "Complete UI/UX overhaul for iOS and Android applications",
    status: "active",
    progress: 60,
    tasks: 32,
    completedTasks: 19,
    team: 5,
    dueDate: "2024-02-28",
    starred: false,
    color: "purple",
  },
  {
    id: "5",
    name: "API Integration Hub",
    description: "Centralized API management and integration platform",
    status: "completed",
    progress: 100,
    tasks: 15,
    completedTasks: 15,
    team: 3,
    dueDate: "2024-01-15",
    starred: false,
    color: "cyan",
  },
  {
    id: "6",
    name: "Security Audit System",
    description: "Automated security scanning and vulnerability detection",
    status: "active",
    progress: 45,
    tasks: 20,
    completedTasks: 9,
    team: 4,
    dueDate: "2024-02-20",
    starred: true,
    color: "purple",
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "completed" | "archived">("all")

  const toggleStar = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, starred: !p.starred } : p))
    )
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

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
                <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
                <p className="text-muted-foreground">
                  Manage and organize all your projects in one place
                </p>
              </div>
              <Button className="bg-gradient-to-r from-cyan to-purple hover:opacity-90 glow-cyan text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50 focus:border-cyan"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "glass border-border/50",
                      filterStatus === "all" && "border-cyan text-cyan"
                    )}
                    onClick={() => setFilterStatus("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "glass border-border/50",
                      filterStatus === "active" && "border-cyan text-cyan"
                    )}
                    onClick={() => setFilterStatus("active")}
                  >
                    Active
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "glass border-border/50",
                      filterStatus === "completed" && "border-cyan text-cyan"
                    )}
                    onClick={() => setFilterStatus("completed")}
                  >
                    Completed
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Filter className="w-5 h-5" />
                </Button>
                <div className="flex items-center border border-border/50 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-md transition-colors",
                      viewMode === "grid" ? "bg-cyan/20 text-cyan" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-md transition-colors",
                      viewMode === "list" ? "bg-cyan/20 text-cyan" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Projects Grid/List */}
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassCard className="h-full" glow={project.starred ? project.color : "none"}>
                        <div className="flex items-start justify-between mb-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            project.color === "cyan" ? "bg-cyan/20" : "bg-purple/20"
                          )}>
                            <FolderKanban className={cn(
                              "w-6 h-6",
                              project.color === "cyan" ? "text-cyan" : "text-purple"
                            )} />
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleStar(project.id)}
                              className="p-1 hover:bg-secondary/50 rounded-lg transition-colors"
                            >
                              {project.starred ? (
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                              ) : (
                                <StarOff className="w-5 h-5 text-muted-foreground" />
                              )}
                            </button>
                            <button className="p-1 hover:bg-secondary/50 rounded-lg transition-colors">
                              <MoreVertical className="w-5 h-5 text-muted-foreground" />
                            </button>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-2">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className={cn(
                              "text-sm font-medium",
                              project.color === "cyan" ? "text-cyan" : "text-purple"
                            )}>
                              {project.progress}%
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-secondary overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ duration: 0.8, delay: index * 0.05 }}
                              className={cn(
                                "h-full rounded-full",
                                project.color === "cyan"
                                  ? "bg-gradient-to-r from-cyan to-cyan-glow"
                                  : "bg-gradient-to-r from-purple to-purple-glow"
                              )}
                            />
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {project.team}
                            </span>
                            <span>{project.completedTasks}/{project.tasks} tasks</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(project.dueDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassCard className="p-4" glow={project.starred ? project.color : "none"}>
                        <div className="flex items-center gap-6">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                            project.color === "cyan" ? "bg-cyan/20" : "bg-purple/20"
                          )}>
                            <FolderKanban className={cn(
                              "w-6 h-6",
                              project.color === "cyan" ? "text-cyan" : "text-purple"
                            )} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                project.status === "active"
                                  ? "bg-cyan/20 text-cyan"
                                  : project.status === "completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-secondary text-muted-foreground"
                              )}>
                                {project.status}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                          </div>

                          <div className="flex items-center gap-6 shrink-0">
                            <div className="w-32">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Progress</span>
                                <span className={cn(
                                  "text-xs font-medium",
                                  project.color === "cyan" ? "text-cyan" : "text-purple"
                                )}>
                                  {project.progress}%
                                </span>
                              </div>
                              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full rounded-full",
                                    project.color === "cyan"
                                      ? "bg-gradient-to-r from-cyan to-cyan-glow"
                                      : "bg-gradient-to-r from-purple to-purple-glow"
                                  )}
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {project.team}
                              </span>
                              <span>{project.completedTasks}/{project.tasks}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(project.dueDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>

                            <button
                              onClick={() => toggleStar(project.id)}
                              className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
                            >
                              {project.starred ? (
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                              ) : (
                                <StarOff className="w-5 h-5 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
