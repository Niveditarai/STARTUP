"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import {
  Sparkles,
  Eye,
  EyeOff,
  Mail,
  ArrowRight,
} from "lucide-react"

import {
  GlassCard,
  NeonButton,
  FloatingOrb,
} from "@/components/zentrix/ui-components"

import API from "@/services/api"

export default function LoginPage() {

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({

    email: "",
    password: "",

  })

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault()

    try {

      setIsLoading(true)

      const res = await API.post("/auth/login", {

        email: formData.email,

        password: formData.password,

      })

      console.log(res.data)

      // SAVE TOKEN

      localStorage.setItem("token", res.data.token)

      localStorage.setItem(

        "user",

        JSON.stringify(res.data.user)

      )

      alert("Login Successful 🚀")

      // REDIRECT

      router.push("/dashboard")

    } catch (err: any) {

      console.log(err)

      alert(

        err?.response?.data?.message ||

        "Login Failed ❌"

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

            Welcome back to Zentrix AI.

          </p>

        </motion.div>

        {/* Login Card */}

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 0.1 }}

        >

          <GlassCard className="p-8 glow-cyan">

            <form onSubmit={handleLogin} className="space-y-5">

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

                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none"

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

                    placeholder="Enter password"

                    required

                    className="w-full pl-4 pr-12 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none"

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

              </div>

              {/* Submit */}

              <NeonButton

                type="submit"

                variant="cyan"

                className="w-full flex items-center justify-center gap-2"

                disabled={isLoading}

              >

                {isLoading ? (

                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                ) : (

                  <>

                    Login

                    <ArrowRight className="w-5 h-5" />

                  </>

                )}

              </NeonButton>

            </form>

            {/* Footer */}

            <p className="text-center mt-6 text-sm text-muted-foreground">

              Don&apos;t have an account?{" "}

              <Link

                href="/register"

                className="text-primary hover:underline"

              >

                Create one

              </Link>

            </p>

          </GlassCard>

        </motion.div>

      </div>

    </div>

  )

}