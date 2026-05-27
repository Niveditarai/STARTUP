"use client"

import { Bell, Search } from "lucide-react"

interface TopNavProps {

  userName?: string

}

export function TopNav({

  userName = "Nivi",

}: TopNavProps) {

  return (

    <header className="h-20 border-b border-zinc-800 bg-black/60 backdrop-blur-xl flex items-center justify-between px-8">

      {/* SEARCH */}

      <div className="relative w-full max-w-md">

        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />

        <input

          type="text"

          placeholder="Search anything..."

          className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl pl-12 pr-4 py-3 outline-none text-white"

        />

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-5">

        {/* NOTIFICATION */}

        <button className="relative text-zinc-400 hover:text-white transition-all">

          <Bell className="w-6 h-6" />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full" />

        </button>

        {/* USER */}

        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">

          {userName.charAt(0)}

        </div>

      </div>

    </header>

  )

}