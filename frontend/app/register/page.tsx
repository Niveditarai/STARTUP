"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import {
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  Github,
  Chrome,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import API from "@/services/api"

export default function RegisterPage() {

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: "",

  })

  // update form
  const updateForm = (field: string, value: string) => {

    setFormData({

      ...formData,
      [field]: value,

    })

  }

  // REGISTER FUNCTION
  const handleRegister = async () => {

    try {

      const res = await API.post("/auth/register", {

        name: formData.name,
        email: formData.email,
        password: formData.password,

      })

      // save token
      localStorage.setItem("token", res.data.token)

      alert("Registration Successful 🚀")

      // redirect
      router.push("/login")

    } catch (err) {

      console.log(err)

      alert("Registration Failed")

    }

  }

  return (

    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-6">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Animated Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Register Card */}

      <motion.div

        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}

        className="relative z-10 w-full max-w-md"

      >

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          {/* Logo */}

          <div className="flex justify-center mb-8">

            <motion.div

              whileHover={{ scale: 1.1, rotate: 5 }}

              className="relative"

            >

              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-500/25">

                <Sparkles className="w-10 h-10 text-white" />

              </div>

            </motion.div>

          </div>

          {/* Heading */}

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">

              Create Account

            </h1>

            <p className="text-gray-400 text-lg">
              Join Zentrix AI today 🚀
            </p>

          </div>

          {/* Form */}

          <div className="space-y-6">

            {/* Name */}

            <div className="space-y-2">

              <label className="text-sm font-medium text-gray-300">
                Full Name
              </label>

              <Input

                type="text"

                placeholder="Enter your name"

                value={formData.name}

                onChange={(e) =>
                  updateForm("name", e.target.value)
                }

                className="h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl"

              />

            </div>

            {/* Email */}

            <div className="space-y-2">

              <label className="text-sm font-medium text-gray-300">
                Email
              </label>

              <Input

                type="email"

                placeholder="Enter your email"

                value={formData.email}

                onChange={(e) =>
                  updateForm("email", e.target.value)
                }

                className="h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl"

              />

            </div>

            {/* Password */}

            <div className="space-y-2">

              <label className="text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">

                <Input

                  type={showPassword ? "text" : "password"}

                  placeholder="Create password"

                  value={formData.password}

                  onChange={(e) =>
                    updateForm("password", e.target.value)
                  }

                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl pr-12"

                />

                <button

                  type="button"

                  onClick={() =>
                    setShowPassword(!showPassword)
                  }

                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"

                >

                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}

                </button>

              </div>

            </div>

            {/* Features */}

            <div className="space-y-3 text-sm text-gray-400">

              <div className="flex items-center gap-2">

                <Check className="w-4 h-4 text-cyan-400" />

                AI-powered collaboration

              </div>

              <div className="flex items-center gap-2">

                <Check className="w-4 h-4 text-cyan-400" />

                Smart project management

              </div>

              <div className="flex items-center gap-2">

                <Check className="w-4 h-4 text-cyan-400" />

                Real-time developer workspace

              </div>

            </div>

            {/* Register Button */}

            <Button

              onClick={handleRegister}

              className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02]"

            >

              Create Account

              <ArrowRight className="w-5 h-5 ml-2" />

            </Button>

            {/* Divider */}

            <div className="relative my-8">

              <div className="absolute inset-0 flex items-center">

                <div className="w-full border-t border-white/10"></div>

              </div>

              <div className="relative flex justify-center text-sm">

                <span className="px-4 bg-black text-gray-400">
                  Or continue with
                </span>

              </div>

            </div>

            {/* Social Buttons */}

            <div className="grid grid-cols-2 gap-4">

              <Button

                variant="outline"

                className="h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl"

              >

                <Github className="w-5 h-5 mr-2" />

                GitHub

              </Button>

              <Button

                variant="outline"

                className="h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl"

              >

                <Chrome className="w-5 h-5 mr-2" />

                Google

              </Button>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-8 text-center">

            <p className="text-gray-400">

              Already have an account?{" "}

              <Link

                href="/login"

                className="text-cyan-400 hover:text-cyan-300 font-medium"

              >

                Sign In

              </Link>

            </p>

          </div>

        </div>

      </motion.div>

    </div>

  )

}