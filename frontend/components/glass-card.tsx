"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: "cyan" | "purple" | "none"
}

export function GlassCard({ children, className, hover = true, glow = "none" }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "glass rounded-2xl p-6",
        hover && "cursor-pointer",
        glow === "cyan" && "glow-cyan-sm",
        glow === "purple" && "glow-purple-sm",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: ReactNode
  glow?: "cyan" | "purple"
}

export function StatCard({ title, value, change, changeType = "neutral", icon, glow = "cyan" }: StatCardProps) {
  return (
    <GlassCard glow={glow}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className={cn(
            "text-3xl font-bold",
            glow === "cyan" ? "text-cyan text-glow-cyan" : "text-purple text-glow-purple"
          )}>
            {value}
          </p>
          {change && (
            <p className={cn(
              "text-sm mt-2",
              changeType === "positive" && "text-green-400",
              changeType === "negative" && "text-red-400",
              changeType === "neutral" && "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          glow === "cyan" ? "bg-cyan/10" : "bg-purple/10"
        )}>
          {icon}
        </div>
      </div>
    </GlassCard>
  )
}
