"use client"

import { motion } from "framer-motion"
import { 
  GitBranch, 
  Star, 
  GitFork, 
  Code2,
  ExternalLink,
  Users,
  Calendar,
  TrendingUp,
  Activity,
  Eye
} from "lucide-react"
import { GlassCard, GradientText, ProgressRing } from "@/components/zentrix/ui-components"
import { Sidebar } from "@/components/zentrix/navigation"
import { TopNav } from "@/components/zentrix/top-nav"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts"

const repositories = [
  { 
    name: "portfolio-v2", 
    description: "My personal portfolio website built with Next.js and Tailwind CSS",
    language: "TypeScript",
    stars: 45,
    forks: 12,
    updated: "2 days ago",
    visibility: "public"
  },
  { 
    name: "dsa-solutions", 
    description: "Collection of Data Structures and Algorithms solutions",
    language: "JavaScript",
    stars: 128,
    forks: 34,
    updated: "5 hours ago",
    visibility: "public"
  },
  { 
    name: "react-components", 
    description: "Reusable React component library with TypeScript",
    language: "TypeScript",
    stars: 67,
    forks: 18,
    updated: "1 week ago",
    visibility: "public"
  },
  { 
    name: "api-starter", 
    description: "Express.js REST API boilerplate with authentication",
    language: "JavaScript",
    stars: 23,
    forks: 8,
    updated: "3 weeks ago",
    visibility: "public"
  },
]

const contributionData = [
  { month: "Jan", contributions: 45 },
  { month: "Feb", contributions: 62 },
  { month: "Mar", contributions: 78 },
  { month: "Apr", contributions: 91 },
  { month: "May", contributions: 85 },
  { month: "Jun", contributions: 102 },
  { month: "Jul", contributions: 120 },
  { month: "Aug", contributions: 95 },
  { month: "Sep", contributions: 110 },
  { month: "Oct", contributions: 135 },
  { month: "Nov", contributions: 142 },
  { month: "Dec", contributions: 156 },
]

const activityData = [
  { day: "Mon", commits: 5, prs: 1, reviews: 2 },
  { day: "Tue", commits: 8, prs: 2, reviews: 3 },
  { day: "Wed", commits: 3, prs: 0, reviews: 1 },
  { day: "Thu", commits: 12, prs: 3, reviews: 4 },
  { day: "Fri", commits: 6, prs: 1, reviews: 2 },
  { day: "Sat", commits: 15, prs: 2, reviews: 0 },
  { day: "Sun", commits: 10, prs: 1, reviews: 1 },
]

const languageStats = [
  { name: "TypeScript", percentage: 45, color: "bg-blue-500" },
  { name: "JavaScript", percentage: 30, color: "bg-yellow-400" },
  { name: "Python", percentage: 15, color: "bg-green-500" },
  { name: "CSS", percentage: 7, color: "bg-pink-500" },
  { name: "Other", percentage: 3, color: "bg-gray-500" },
]

const heatmapData = Array.from({ length: 52 * 7 }, () => Math.floor(Math.random() * 10))

export default function GitHubPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Sidebar currentPath="/github" />
      <div className="ml-64 transition-all duration-300">
        <TopNav userName="Alex" />
        
        <main className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">GitHub <GradientText>Activity</GradientText></h1>
                <p className="text-muted-foreground">Track your coding activity and repositories</p>
              </div>
              <a 
                href="https://github.com/alexjohnson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted border border-border transition-colors flex items-center gap-2"
              >
                <GitBranch className="w-5 h-5" />
                View GitHub Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlassCard glowColor="cyan">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Total Contributions</p>
                    <p className="text-3xl font-bold">1,221</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard glowColor="purple">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-secondary/20">
                    <Code2 className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Repositories</p>
                    <p className="text-3xl font-bold">32</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard glowColor="cyan">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-amber-500/20">
                    <Star className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Total Stars</p>
                    <p className="text-3xl font-bold">263</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard glowColor="purple">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/20">
                    <Users className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Followers</p>
                    <p className="text-3xl font-bold">156</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Contribution Heatmap */}
            <GlassCard glowColor="cyan" hover={false}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Contribution Activity</h3>
                <span className="text-sm text-muted-foreground">1,221 contributions in the last year</span>
              </div>
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-1 min-w-max">
                  {Array.from({ length: 52 }).map((_, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-1">
                      {Array.from({ length: 7 }).map((_, dayIdx) => {
                        const value = heatmapData[weekIdx * 7 + dayIdx]
                        return (
                          <div
                            key={dayIdx}
                            className={`w-3 h-3 rounded-sm ${
                              value === 0 ? "bg-muted/30" :
                              value < 3 ? "bg-primary/30" :
                              value < 6 ? "bg-primary/60" : "bg-primary"
                            }`}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">Learn how we count contributions</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-muted/30" />
                    <div className="w-3 h-3 rounded-sm bg-primary/30" />
                    <div className="w-3 h-3 rounded-sm bg-primary/60" />
                    <div className="w-3 h-3 rounded-sm bg-primary" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </GlassCard>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Contribution Trend */}
              <GlassCard glowColor="purple" hover={false}>
                <h3 className="text-lg font-semibold mb-4">Contribution Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={contributionData}>
                      <defs>
                        <linearGradient id="colorContrib" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.65 0.2 300)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="oklch(0.65 0.2 300)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.03 270)" />
                      <XAxis dataKey="month" stroke="oklch(0.65 0.02 270)" />
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
                        dataKey="contributions"
                        stroke="oklch(0.65 0.2 300)"
                        fillOpacity={1}
                        fill="url(#colorContrib)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              {/* Language Distribution */}
              <GlassCard glowColor="cyan" hover={false}>
                <h3 className="text-lg font-semibold mb-4">Language Distribution</h3>
                <div className="space-y-4">
                  {languageStats.map((lang) => (
                    <div key={lang.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${lang.color}`} />
                          {lang.name}
                        </span>
                        <span className="text-muted-foreground">{lang.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.percentage}%` }}
                          transition={{ duration: 1 }}
                          className={`h-full rounded-full ${lang.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Repositories */}
            <GlassCard glowColor="purple" hover={false}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Popular Repositories</h3>
                <button className="text-primary text-sm hover:underline">View All</button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {repositories.map((repo) => (
                  <motion.div
                    key={repo.name}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">{repo.name}</h4>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted/50">{repo.visibility}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{repo.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${repo.language === "TypeScript" ? "bg-blue-500" : "bg-yellow-400"}`} />
                        {repo.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" /> {repo.forks}
                      </span>
                      <span className="text-muted-foreground">{repo.updated}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  )
}
