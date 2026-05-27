"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  FolderKanban, 
  Plus, 
  Users, 
  GitBranch,
  Clock,
  CheckCircle,
  Circle,
  MoreHorizontal,
  ExternalLink,
  Search
} from "lucide-react"
import { GlassCard, NeonButton, GradientText } from "@/components/zentrix/ui-components"
import { Sidebar, TopNav } from "@/components/zentrix/navigation"

const projects = [
  {
    id: "1",
    name: "Portfolio Website",
    description: "Personal portfolio showcasing projects and skills",
    status: "in-progress",
    progress: 75,
    members: [
      { name: "Alex", avatar: "A" },
    ],
    tasks: { completed: 12, total: 16 },
    github: "alexjohnson/portfolio-v2",
    lastUpdated: "2 hours ago",
    tags: ["React", "Next.js", "Tailwind"]
  },
  {
    id: "2",
    name: "E-commerce API",
    description: "RESTful API for e-commerce platform with authentication",
    status: "in-progress",
    progress: 45,
    members: [
      { name: "Alex", avatar: "A" },
      { name: "Sarah", avatar: "S" },
      { name: "Mike", avatar: "M" },
    ],
    tasks: { completed: 8, total: 18 },
    github: "team-dev/ecommerce-api",
    lastUpdated: "1 day ago",
    tags: ["Node.js", "Express", "MongoDB"]
  },
  {
    id: "3",
    name: "Chat Application",
    description: "Real-time chat app with Socket.io",
    status: "completed",
    progress: 100,
    members: [
      { name: "Alex", avatar: "A" },
      { name: "John", avatar: "J" },
    ],
    tasks: { completed: 24, total: 24 },
    github: "alexjohnson/realtime-chat",
    lastUpdated: "2 weeks ago",
    tags: ["React", "Socket.io", "Node.js"]
  },
  {
    id: "4",
    name: "Task Manager",
    description: "Kanban-style task management application",
    status: "planning",
    progress: 10,
    members: [
      { name: "Alex", avatar: "A" },
    ],
    tasks: { completed: 2, total: 20 },
    github: null,
    lastUpdated: "3 days ago",
    tags: ["TypeScript", "React", "Prisma"]
  },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter(project => {
    if (filter !== "all" && project.status !== filter) return false
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen gradient-bg">
      <Sidebar currentPath="/projects" />
      <div className="ml-64 transition-all duration-300">
        <TopNav userName="Alex" />
        
        <main className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Project <GradientText>Collaboration</GradientText></h1>
                <p className="text-muted-foreground">Manage and collaborate on your projects</p>
              </div>
              <NeonButton variant="cyan" className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Project
              </NeonButton>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                {["all", "in-progress", "completed", "planning"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === f 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                >
                  <GlassCard 
                    glowColor={project.status === "completed" ? "purple" : "cyan"} 
                    hover={false}
                    className="h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          project.status === "completed" ? "bg-emerald-500/20" :
                          project.status === "in-progress" ? "bg-primary/20" : "bg-amber-500/20"
                        }`}>
                          <FolderKanban className={`w-5 h-5 ${
                            project.status === "completed" ? "text-emerald-400" :
                            project.status === "in-progress" ? "text-primary" : "text-amber-400"
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{project.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            project.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                            project.status === "in-progress" ? "bg-primary/20 text-primary" :
                            "bg-amber-500/20 text-amber-400"
                          }`}>
                            {project.status.replace("-", " ")}
                          </span>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1 }}
                          className={`h-full rounded-full ${
                            project.status === "completed" ? "bg-emerald-400" : "bg-primary"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded text-xs bg-muted/50">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4">
                        {/* Team Members */}
                        <div className="flex -space-x-2">
                          {project.members.slice(0, 3).map((member, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold border-2 border-background"
                            >
                              {member.avatar}
                            </div>
                          ))}
                          {project.members.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                              +{project.members.length - 3}
                            </div>
                          )}
                        </div>
                        {/* Tasks */}
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          {project.tasks.completed}/{project.tasks.total}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a href={`https://github.com/${project.github}`} className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                            <GitBranch className="w-4 h-4 text-muted-foreground" />
                          </a>
                        )}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {project.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
