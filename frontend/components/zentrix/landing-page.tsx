"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Sparkles, 
  Code2, 
  Brain, 
  Target, 
  Users, 
  Zap,
  Github,
  BarChart3,
  FileText,
  Mic,
  ArrowRight,
  Check
} from "lucide-react"
import { GlassCard, NeonButton, GradientText, FloatingOrb } from "@/components/zentrix/ui-components"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Get personalized AI roadmaps, smart recommendations, and adaptive learning paths tailored to your goals."
  },
  {
    icon: Code2,
    title: "DSA Mastery",
    description: "Track your coding progress with detailed analytics, solve problems, and identify weak areas to improve."
  },
  {
    icon: Target,
    title: "Placement Ready",
    description: "Prepare for interviews with AI mock sessions, resume analysis, and company-specific preparation guides."
  },
  {
    icon: Github,
    title: "GitHub Integration",
    description: "Connect your GitHub to track contributions, analyze coding activity, and showcase your portfolio."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together on projects, assign tasks, and build your portfolio with real team experience."
  },
  {
    icon: Zap,
    title: "Smart Analytics",
    description: "Get insights into your learning patterns, productivity scores, and personalized improvement suggestions."
  }
]

const stats = [
  { value: "50K+", label: "Active Students" },
  { value: "1M+", label: "Problems Solved" },
  { value: "95%", label: "Placement Rate" },
  { value: "500+", label: "Companies Hiring" }
]

const pricing = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: ["Basic DSA tracking", "Limited AI assistance", "Community access", "5 mock interviews/month"],
    highlighted: false
  },
  {
    name: "Pro",
    price: "$19",
    description: "For serious learners",
    features: ["Unlimited DSA tracking", "Full AI assistant access", "Resume analyzer", "Unlimited mock interviews", "GitHub integration", "Priority support"],
    highlighted: true
  },
  {
    name: "Team",
    price: "$49",
    description: "For study groups",
    features: ["Everything in Pro", "Team collaboration", "Shared projects", "Admin dashboard", "Custom roadmaps", "Dedicated support"],
    highlighted: false
  }
]

export function LandingPage() {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Floating Orbs */}
      <FloatingOrb className="top-20 -left-32" color="cyan" size="lg" />
      <FloatingOrb className="top-1/3 right-0" color="purple" size="md" />
      <FloatingOrb className="bottom-20 left-1/4" color="purple" size="lg" />
      <FloatingOrb className="bottom-1/3 right-1/4" color="cyan" size="sm" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Navigation */}
      <nav className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold glow-text-cyan">Zentrix AI</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <NeonButton variant="outline" size="sm">Sign In</NeonButton>
              </Link>
              <Link href="/register">
                <NeonButton variant="cyan" size="sm">Get Started</NeonButton>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary mb-6">
                The Future of Student Learning
              </span>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Master Your <GradientText>Coding Journey</GradientText> with AI
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Track your growth, ace placements, and collaborate on projects with the most advanced AI-powered student platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <NeonButton variant="cyan" size="lg" className="flex items-center gap-2">
                    Start Free Trial <ArrowRight className="w-5 h-5" />
                  </NeonButton>
                </Link>
                <Link href="#features">
                  <NeonButton variant="outline" size="lg">
                    Explore Features
                  </NeonButton>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Hero Image/Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20"
          >
            <GlassCard className="p-2 max-w-5xl mx-auto glow-cyan">
              <div className="rounded-lg bg-background/50 p-4">
                {/* Mock Dashboard Preview */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Sidebar Preview */}
                  <div className="col-span-2 space-y-3">
                    <div className="h-8 w-full rounded bg-muted/50" />
                    <div className="space-y-2">
                      {[1,2,3,4,5].map((i) => (
                        <div key={i} className="h-6 w-full rounded bg-muted/30" />
                      ))}
                    </div>
                  </div>
                  {/* Main Content Preview */}
                  <div className="col-span-10 space-y-4">
                    <div className="h-10 w-full rounded bg-muted/30" />
                    <div className="grid grid-cols-4 gap-4">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="h-24 rounded bg-gradient-to-br from-primary/20 to-secondary/20" />
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-48 rounded bg-muted/20" />
                      <div className="h-48 rounded bg-muted/20" />
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold glow-text-cyan">{stat.value}</p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <GradientText>Succeed</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to accelerate your learning and help you land your dream job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard glowColor={index % 2 === 0 ? "cyan" : "purple"} className="h-full">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    index % 2 === 0 ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                  }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* AI Assistant Highlight */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">AI Assistant</span>
              <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Your Personal <GradientText>AI Mentor</GradientText>
              </h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Get instant help with DSA problems, interview prep, and coding concepts. Our AI understands context and provides personalized guidance.
              </p>
              <ul className="space-y-3">
                {["DSA problem explanations", "Code review & optimization", "Interview preparation", "Career guidance"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-4 glow-cyan">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold">U</span>
                    </div>
                    <div className="glass rounded-lg p-3 max-w-xs">
                      <p className="text-sm">{"How do I solve the Two Sum problem efficiently?"}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="glass rounded-lg p-3 max-w-sm bg-primary/10">
                      <p className="text-sm">{"Use a hash map to store complements. For each element, check if its complement exists. Time: O(n), Space: O(n)."}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Analytics Highlight */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <GlassCard className="p-6 glow-purple">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">Problems Solved</p>
                    <p className="text-3xl font-bold text-primary">247</p>
                    <div className="flex gap-1">
                                      {[35, 48, 28, 55, 42, 60, 38].map((height, i) => (
                                        <div key={i} className="h-8 w-4 rounded bg-primary/20" style={{ height: `${height}px` }} />
                                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">Current Streak</p>
                    <p className="text-3xl font-bold text-secondary">32 days</p>
                    <div className="flex gap-1 flex-wrap">
                      {Array.from({ length: 21 }).map((_, i) => (
                        <div key={i} className={`w-4 h-4 rounded ${i < 15 ? "bg-primary" : "bg-muted"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Analytics</span>
              <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Track Every <GradientText>Milestone</GradientText>
              </h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Visualize your progress with beautiful charts and detailed analytics. Identify patterns, track consistency, and celebrate achievements.
              </p>
              <ul className="space-y-3">
                {["Real-time progress tracking", "Weakness identification", "Performance trends", "Goal setting & tracking"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-secondary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, <GradientText>Transparent</GradientText> Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard 
                  glowColor={plan.highlighted ? "cyan" : "none"}
                  className={`h-full relative ${plan.highlighted ? "border-primary" : ""}`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-4xl font-bold">
                      {plan.price}<span className="text-lg text-muted-foreground">/mo</span>
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register">
                    <NeonButton 
                      variant={plan.highlighted ? "cyan" : "outline"} 
                      className="w-full"
                    >
                      Get Started
                    </NeonButton>
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <GlassCard className="p-12 glow-cyan">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <GradientText>Transform</GradientText> Your Learning?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of students who are already accelerating their careers with Zentrix AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <NeonButton variant="cyan" size="lg" className="flex items-center gap-2">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </NeonButton>
              </Link>
              <Link href="/login">
                <NeonButton variant="outline" size="lg">
                  Sign In
                </NeonButton>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Zentrix AI</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Empowering students with AI-powered learning tools for a successful career.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Zentrix AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
