"use client"

import Link from "next/link"

import { motion } from "framer-motion"

import {

  LayoutDashboard,

  MessageSquare,

  User,

  BarChart3,

  Github,

  Map,

  FolderKanban,

  CheckSquare,

  Mic,

  FileText,

  Settings,

  ChevronLeft,

  ChevronRight,

  Sparkles,

  LogOut,

} from "lucide-react"

import { cn } from "@/lib/utils"

import { useState } from "react"

const navItems = [

  {

    icon: LayoutDashboard,

    label: "Dashboard",

    href: "/dashboard",

  },

  {

    icon: MessageSquare,

    label: "AI Assistant",

    href: "/ai",

  },

  {

    icon: User,

    label: "Profile",

    href: "/profile",

  },

  {

    icon: BarChart3,

    label: "DSA Analytics",

    href: "/dsa",

  },

  {

    icon: Github,

    label: "GitHub Activity",

    href: "/github",

  },

  {

    icon: Map,

    label: "AI Roadmap",

    href: "/roadmap",

  },

  {

    icon: FolderKanban,

    label: "Projects",

    href: "/projects",

  },

  {

    icon: CheckSquare,

    label: "Tasks",

    href: "/tasks",

  },

  {

    icon: Mic,

    label: "Mock Interview",

    href: "/interview",

  },

  {

    icon: FileText,

    label: "Resume Analyzer",

    href: "/resume",

  },

] as const

interface SidebarProps {

  currentPath?: string

}

export function Sidebar({

  currentPath = "/dashboard",

}: SidebarProps) {

  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("user")

    window.location.href = "/login"

  }

  return (

    <motion.aside

      initial={{ x: -100, opacity: 0 }}

      animate={{ x: 0, opacity: 1 }}

      transition={{ duration: 0.5 }}

      className={cn(

        "fixed left-0 top-0 h-screen glass-card border-r border-border z-50 flex flex-col transition-all duration-300 bg-black/80 backdrop-blur-xl",

        collapsed ? "w-20" : "w-64"

      )}

    >

      {/* LOGO */}

      <div className="p-6 border-b border-border flex items-center justify-between">

        <Link

          href="/dashboard"

          className="flex items-center gap-3"

        >

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg">

            <Sparkles className="w-6 h-6 text-white" />

          </div>

          {!collapsed && (

            <motion.span

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              className="text-2xl font-bold text-cyan-400"

            >

              Zentrix AI

            </motion.span>

          )}

        </Link>

        <button

          onClick={() => setCollapsed(!collapsed)}

          className="text-zinc-400 hover:text-white transition-all"

        >

          {collapsed ? (

            <ChevronRight className="w-5 h-5" />

          ) : (

            <ChevronLeft className="w-5 h-5" />

          )}

        </button>

      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 p-4 overflow-y-auto">

        <ul className="space-y-2">

          {navItems.map((item) => {

            const isActive = currentPath === item.href

            return (

              <li key={item.href}>

                <Link

                  href={item.href}

                  className={cn(

                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",

                    isActive

                      ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"

                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"

                  )}

                >

                  <item.icon

                    className={cn(

                      "w-5 h-5 transition-transform group-hover:scale-110",

                      isActive && "text-cyan-400"

                    )}

                  />

                  {!collapsed && (

                    <span className="font-medium">

                      {item.label}

                    </span>

                  )}

                </Link>

              </li>

            )

          })}

        </ul>

      </nav>

      {/* BOTTOM */}

      <div className="p-4 border-t border-zinc-800 space-y-2">

        <Link

          href="/settings"

          className={cn(

            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",

            currentPath === "/settings"

              ? "bg-cyan-500/20 text-cyan-400"

              : "text-zinc-400 hover:text-white hover:bg-zinc-800"

          )}

        >

          <Settings className="w-5 h-5" />

          {!collapsed && (

            <span className="font-medium">

              Settings

            </span>

          )}

        </Link>

        <button

          onClick={handleLogout}

          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"

        >

          <LogOut className="w-5 h-5" />

          {!collapsed && (

            <span className="font-medium">

              Logout

            </span>

          )}

        </button>

      </div>

    </motion.aside>

  )

}