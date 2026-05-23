"use client"

import { motion } from "framer-motion"
import { Bell, Search, Command, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function TopNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-16 glass-strong border-b border-border/50 flex items-center justify-between px-6"
    >
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search anything..."
          className="pl-10 pr-12 bg-secondary/50 border-border/50 focus:border-cyan focus:glow-cyan-sm transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-xl hover:bg-secondary/50 transition-colors"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan glow-cyan-sm" />
        </motion.button>

        {/* User */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 pl-4 border-l border-border/50"
        >
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Alex Chen</p>
            <p className="text-xs text-muted-foreground">Pro Plan</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan/20 to-purple/20 border border-border/50"
          >
            <User className="w-5 h-5 text-cyan" />
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}
