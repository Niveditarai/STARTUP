"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: "cyan" | "purple" | "none"
  hover?: boolean
}

export function GlassCard({ 
  children, 
  className, 
  glowColor = "none",
  hover = true 
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300",
        glowColor === "cyan" && "hover:glow-cyan",
        glowColor === "purple" && "hover:glow-purple",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

interface NeonButtonProps {
  children: React.ReactNode
  variant?: "cyan" | "purple" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
}

export function NeonButton({ 
  children, 
  variant = "cyan", 
  size = "md",
  className,
  onClick,
  type = "button",
  disabled = false
}: NeonButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  const variantClasses = {
    cyan: "bg-primary text-primary-foreground hover:glow-cyan",
    purple: "bg-secondary text-secondary-foreground hover:glow-purple",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10"
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.button>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span className={cn(
      "bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent",
      className
    )}>
      {children}
    </span>
  )
}

interface FloatingOrbProps {
  className?: string
  color?: "cyan" | "purple"
  size?: "sm" | "md" | "lg"
}

export function FloatingOrb({ className, color = "cyan", size = "md" }: FloatingOrbProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96"
  }

  const colorClasses = {
    cyan: "bg-primary/30",
    purple: "bg-secondary/30"
  }

  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl animate-float pointer-events-none",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  )
}

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: { value: number; positive: boolean }
  glowColor?: "cyan" | "purple"
}

export function StatCard({ label, value, icon, trend, glowColor = "cyan" }: StatCardProps) {
  return (
    <GlassCard glowColor={glowColor} className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm mt-2 flex items-center gap-1",
              trend.positive ? "text-emerald-400" : "text-red-400"
            )}>
              {trend.positive ? "+" : "-"}{Math.abs(trend.value)}%
              <span className="text-muted-foreground">vs last week</span>
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          glowColor === "cyan" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
        )}>
          {icon}
        </div>
      </div>
    </GlassCard>
  )
}

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: "cyan" | "purple"
  label?: string
}

export function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8,
  color = "cyan",
  label
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/30"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={color === "cyan" ? "text-primary" : "text-secondary"}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold">{progress}%</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  )
}
