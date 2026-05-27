"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import { Sidebar } from "@/components/zentrix/navigation"

import { TopNav } from "@/components/zentrix/top-nav"
export default function DashboardLayout({

  children,

}: {

  children: React.ReactNode

}) {

  const router = useRouter()

  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {

    const token = localStorage.getItem("token")

    // NO TOKEN

    if (!token) {

      router.replace("/login")

    }

    // TOKEN EXISTS

    else {

      setAuthorized(true)

    }

  }, [router])

  // BLOCK RENDER UNTIL CHECK

  if (!authorized) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-black text-white">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-cyan-400 text-lg">

            Checking Authentication...

          </p>

        </div>

      </div>

    )

  }

  return (

    <div className="min-h-screen gradient-bg">

      {/* Sidebar */}

      <Sidebar currentPath="/dashboard" />

      {/* Main */}

      <div className="ml-64 transition-all duration-300">

        {/* Navbar */}

        <TopNav userName="Nivi" />

        {/* Content */}

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>

  )

}