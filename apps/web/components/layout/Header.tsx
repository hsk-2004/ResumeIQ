"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"

export default function Header() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  const handleFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // If we're on the main page, just scroll to the section
    if (pathname === "/main") {
      const analyzeSection = document.getElementById("analyze")
      if (analyzeSection) {
        analyzeSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      // If we're on another page, navigate to main page with hash
      router.push("/main#analyze")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E1A]/40 backdrop-blur-md border-b border-white/10">

      <div className="max-w-7xl mx-auto h-14 px-6 flex items-center justify-between">

        {/* Brand */}
        <Link href="/main" className="text-xl font-semibold text-white">
          ResumeIQ
        </Link>

        {/* Navigation */}
        {isAuthenticated ? (
          // Authenticated User Navigation
          <div className="flex items-center gap-8">
            {/* Main Navigation Links */}
            <nav className="flex items-center gap-6 text-sm">
              {/* Features → Analyze Section */}
              <a
                href="#analyze"
                onClick={handleFeaturesClick}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                Features
              </a>

              <Link href="/main/ats-score" className="text-gray-400 hover:text-white transition">
                ATS Score
              </Link>

              <Link href="/main/linkedin-analyzer" className="text-gray-400 hover:text-white transition">
                LinkedIn
              </Link>

              <Link href="/main/github-analyzer" className="text-gray-400 hover:text-white transition">
                GitHub
              </Link>
            </nav>

            {/* Divider */}
            <div className="h-6 w-px bg-white/10" />

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {/* Profile Button */}
              <Link
                href="/main/profile"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition group"
              >
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-7 h-7 rounded-full group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold group-hover:scale-110 transition-transform">
                    {session?.user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <span className="text-sm">Profile</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          // Guest User Navigation
          <div className="flex items-center gap-8">
            {/* Main Navigation Links */}
            <nav className="flex items-center gap-6 text-sm">
              <a
                href="#analyze"
                onClick={handleFeaturesClick}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                Features
              </a>

              <Link href="/main/ats-score" className="text-gray-400 hover:text-white transition">
                ATS Score
              </Link>

              <Link href="/main/linkedin-analyzer" className="text-gray-400 hover:text-white transition">
                LinkedIn
              </Link>

              <Link href="/main/github-analyzer" className="text-gray-400 hover:text-white transition">
                GitHub
              </Link>
            </nav>

            {/* Divider */}
            <div className="h-6 w-px bg-white/10" />

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
