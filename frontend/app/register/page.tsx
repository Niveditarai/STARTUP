"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Sparkles,
  Eye,
  EyeOff,
  Github,
  Mail,
  User,
  ArrowRight,
  Check,
} from "lucide-react"

import {
  GlassCard,
  NeonButton,
  FloatingOrb,
} from "@/components/zentrix/ui-components"

import API from "@/services/api"

export default function RegisterPage() {

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: "",
    confirmPassword: "",

  })

  const passwordStrength = () => {

    const { password } = formData

    if (password.length === 0) return 0

    let strength = 0

    if (password.length >= 8) strength++

    if (/[A-Z]/.test(password)) strength++

    if (/[0-9]/.test(password)) strength++

    if (/[^A-Za-z0-9]/.test(password)) strength++

    return strength

  }

  const strengthLabels = ["Weak", "Fair", "Good", "Strong"]

  const strengthColors = [

    "bg-red-500",

    "bg-yellow-500",

    "bg-blue-500",

    "bg-green-500",

  ]

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {

      alert("Passwords do not match ❌")

      return

    }

    try {

      setIsLoading(true)

      const res = await API.post("/auth/register", {

        name: formData.name,

        email: formData.email,

        password: formData.password,

      })

      console.log(res.data)

      alert("Registration Successful 🚀")

      router.push("/login")

    } catch (err: any) {

      console.log(err)

      alert(

        err?.response?.data?.message ||

        "Registration Failed ❌"

      )

    } finally {

      setIsLoading(false)

    }

  }

  return (

    <div className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center p-6">

      {/* Floating Orbs */}

      <FloatingOrb className="top-10 -right-20" color="purple" size="lg" />

      <FloatingOrb className="bottom-10 -left-20" color="cyan" size="lg" />

      <FloatingOrb className="top-1/3 right-1/4" color="cyan" size="sm" />

      {/* Grid */}

      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}

        <motion.div

          initial={{ opacity: 0, y: -20 }}

          animate={{ opacity: 1, y: 0 }}

          className="text-center mb-8"

        >

          <Link href="/" className="inline-flex items-center gap-3 mb-4">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">

              <Sparkles className="w-7 h-7 text-white" />

            </div>

            <span className="text-3xl font-bold glow-text-cyan">

              Zentrix AI

            </span>

          </Link>

          <p className="text-muted-foreground">

            Create your account to get started.

          </p>

        </motion.div>

        {/* Register Card */}

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 0.1 }}

        >

          <GlassCard className="p-8 glow-purple">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}

              <div className="space-y-2">

                <label className="text-sm font-medium">

                  Full Name

                </label>

                <div className="relative">

                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                  <input

                    type="text"

                    value={formData.name}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        name: e.target.value,

                      })

                    }

                    placeholder="John Doe"

                    required

                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-secondary focus:outline-none"

                  />

                </div>

              </div>

              {/* Email */}

              <div className="space-y-2">

                <label className="text-sm font-medium">

                  Email Address

                </label>

                <div className="relative">

                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                  <input

                    type="email"

                    value={formData.email}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        email: e.target.value,

                      })

                    }

                    placeholder="you@example.com"

                    required

                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-secondary focus:outline-none"

                  />

                </div>

              </div>

              {/* Password */}

              <div className="space-y-2">

                <label className="text-sm font-medium">

                  Password

                </label>

                <div className="relative">

                  <input

                    type={showPassword ? "text" : "password"}

                    value={formData.password}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        password: e.target.value,

                      })

                    }

                    placeholder="Create password"

                    required

                    className="w-full pl-4 pr-12 py-3 rounded-lg bg-muted/50 border border-border focus:border-secondary focus:outline-none"

                  />

                  <button

                    type="button"

                    onClick={() => setShowPassword(!showPassword)}

                    className="absolute right-3 top-1/2 -translate-y-1/2"

                  >

                    {showPassword ? (

                      <EyeOff className="w-5 h-5" />

                    ) : (

                      <Eye className="w-5 h-5" />

                    )}

                  </button>

                </div>

                {/* Password Strength */}

                {formData.password && (

                  <div className="space-y-2">

                    <div className="flex gap-1">

                      {[0, 1, 2, 3].map((i) => (

                        <div

                          key={i}

                          className={`h-1 flex-1 rounded-full transition-colors ${

                            i < passwordStrength()

                              ? strengthColors[passwordStrength() - 1]

                              : "bg-muted"

                          }`}

                        />

                      ))}

                    </div>

                    <p className="text-xs text-muted-foreground">

                      Password strength:

                      <span className="ml-1 text-green-400">

                        {strengthLabels[passwordStrength() - 1] || "Too weak"}

                      </span>

                    </p>

                  </div>

                )}

              </div>

              {/* Confirm Password */}

              <div className="space-y-2">

                <label className="text-sm font-medium">

                  Confirm Password

                </label>

                <div className="relative">

                  <input

                    type={showPassword ? "text" : "password"}

                    value={formData.confirmPassword}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        confirmPassword: e.target.value,

                      })

                    }

                    placeholder="Confirm password"

                    required

                    className="w-full pl-4 pr-12 py-3 rounded-lg bg-muted/50 border border-border focus:border-secondary focus:outline-none"

                  />

                  {formData.confirmPassword &&

                    formData.password === formData.confirmPassword && (

                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />

                    )}

                </div>

              </div>

              {/* Submit */}

              <NeonButton

                type="submit"

                variant="purple"

                className="w-full flex items-center justify-center gap-2"

                disabled={isLoading}

              >

                {isLoading ? (

                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                ) : (

                  <>

                    Create Account

                    <ArrowRight className="w-5 h-5" />

                  </>

                )}

              </NeonButton>

            </form>

            {/* Footer */}

            <p className="text-center mt-6 text-sm text-muted-foreground">

              Already have an account?{" "}

              <Link

                href="/login"

                className="text-secondary hover:underline"

              >

                Sign in

              </Link>

            </p>

          </GlassCard>

        </motion.div>

      </div>

    </div>

  )

}