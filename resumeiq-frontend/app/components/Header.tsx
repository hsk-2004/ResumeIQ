"use client"

import Link from "next/link"
import { useAuth } from "@/app/context/AuthContext"

export default function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E1A]/40 backdrop-blur-md border-b border-white/10">

      <div className="max-w-7xl mx-auto h-14 px-6 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="text-xl font-semibold text-white">
          ResumeIQ
        </Link>

        {/* Navigation */}
        {isAuthenticated && (
          <nav className="flex items-center gap-6 text-sm">
            
            {/* Features → Analyze Section */}
            <a
              href="#analyze"
              className="text-gray-400 hover:text-white transition"
            >
              Features
            </a>

            <Link href="/dashboard" className="text-gray-400 hover:text-white">
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="text-gray-400 hover:text-white"
            >
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
