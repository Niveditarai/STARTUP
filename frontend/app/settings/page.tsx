"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Settings,
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Check
} from "lucide-react"
import { GlassCard, NeonButton, GradientText } from "@/components/zentrix/ui-components"
import { Sidebar, TopNav } from "@/components/zentrix/navigation"

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "language", label: "Language", icon: Globe },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "help", label: "Help & Support", icon: HelpCircle },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
    marketing: false,
  })
  const [theme, setTheme] = useState("dark")

  return (
    <div className="min-h-screen gradient-bg">
      <Sidebar currentPath="/settings" />
      <div className="ml-64 transition-all duration-300">
        <TopNav userName="Alex" />
        
        <main className="p-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2"><GradientText>Settings</GradientText></h1>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <GlassCard hover={false} className="p-2">
                  <nav className="space-y-1">
                    {settingsSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          activeSection === section.id 
                            ? "bg-primary/20 text-primary" 
                            : "hover:bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        <section.icon className="w-5 h-5" />
                        <span className="font-medium">{section.label}</span>
                      </button>
                    ))}
                    <hr className="border-border my-2" />
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors">
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Log Out</span>
                    </button>
                  </nav>
                </GlassCard>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                {activeSection === "profile" && (
                  <GlassCard glowColor="cyan" hover={false}>
                    <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                    <div className="space-y-6">
                      {/* Avatar */}
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white">
                          AJ
                        </div>
                        <div>
                          <button className="px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                            Change Avatar
                          </button>
                          <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                        </div>
                      </div>

                      {/* Form */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Full Name</label>
                          <input
                            type="text"
                            defaultValue="Alex Johnson"
                            className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Username</label>
                          <input
                            type="text"
                            defaultValue="alexjohnson"
                            className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Email</label>
                          <input
                            type="email"
                            defaultValue="alex.johnson@email.com"
                            className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Bio</label>
                          <textarea
                            rows={3}
                            defaultValue="Passionate developer focused on building scalable web applications."
                            className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <NeonButton variant="cyan">Save Changes</NeonButton>
                      </div>
                    </div>
                  </GlassCard>
                )}

                {activeSection === "notifications" && (
                  <GlassCard glowColor="purple" hover={false}>
                    <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                    <div className="space-y-4">
                      {Object.entries({
                        email: "Email Notifications",
                        push: "Push Notifications",
                        updates: "Product Updates",
                        marketing: "Marketing Emails",
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                          <div>
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-muted-foreground">
                              {key === "email" && "Receive notifications via email"}
                              {key === "push" && "Receive push notifications on your device"}
                              {key === "updates" && "Get notified about new features"}
                              {key === "marketing" && "Receive promotional content"}
                            </p>
                          </div>
                          <button
                            onClick={() => setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              notifications[key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                              notifications[key as keyof typeof notifications] ? "translate-x-6" : "translate-x-0.5"
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                {activeSection === "security" && (
                  <GlassCard glowColor="cyan" hover={false}>
                    <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">Password</p>
                            <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                          </div>
                          <button className="px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                            Change Password
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                          </div>
                          <button className="px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                            Enable 2FA
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Active Sessions</p>
                            <p className="text-sm text-muted-foreground">Manage your logged in devices</p>
                          </div>
                          <button className="px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                            View Sessions
                          </button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                )}

                {activeSection === "appearance" && (
                  <GlassCard glowColor="purple" hover={false}>
                    <h2 className="text-xl font-semibold mb-6">Appearance</h2>
                    <div className="space-y-6">
                      <div>
                        <p className="font-medium mb-4">Theme</p>
                        <div className="flex gap-4">
                          {[
                            { id: "dark", label: "Dark", icon: Moon },
                            { id: "light", label: "Light", icon: Sun },
                          ].map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setTheme(t.id)}
                              className={`flex-1 p-4 rounded-xl border transition-all ${
                                theme === t.id 
                                  ? "border-primary bg-primary/10" 
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <t.icon className={`w-6 h-6 mx-auto mb-2 ${theme === t.id ? "text-primary" : "text-muted-foreground"}`} />
                              <p className="font-medium">{t.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium mb-4">Accent Color</p>
                        <div className="flex gap-3">
                          {["cyan", "purple", "emerald", "amber", "rose"].map((color) => (
                            <button
                              key={color}
                              className={`w-10 h-10 rounded-full ${
                                color === "cyan" ? "bg-cyan-500" :
                                color === "purple" ? "bg-purple-500" :
                                color === "emerald" ? "bg-emerald-500" :
                                color === "amber" ? "bg-amber-500" : "bg-rose-500"
                              } ${color === "cyan" ? "ring-2 ring-offset-2 ring-offset-background ring-white" : ""}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                )}

                {(activeSection === "language" || activeSection === "billing" || activeSection === "help") && (
                  <GlassCard glowColor="cyan" hover={false}>
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                        <Settings className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                      <p className="text-muted-foreground">This section is under development.</p>
                    </div>
                  </GlassCard>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
