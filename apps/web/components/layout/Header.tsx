"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Header() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" })
    setMobileMenuOpen(false)
  }

  const handleFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMobileMenuOpen(false)

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

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E1A]/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto h-14 px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/main" className="text-lg sm:text-xl font-semibold text-white flex-shrink-0">
          ResumeIQ
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {isAuthenticated ? (
            <>
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
              <div className="h-6 w-px bg-white/10" />
              <div className="flex items-center gap-4">
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
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
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
              <div className="h-6 w-px bg-white/10" />
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
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0F1A] border-t border-white/10 py-4">
          <nav className="max-w-7xl mx-auto px-4 flex flex-col gap-3 text-sm">
            {isAuthenticated ? (
              <>
                <a
                  href="#analyze"
                  onClick={handleFeaturesClick}
                  className="text-gray-400 hover:text-white transition cursor-pointer py-2"
                >
                  Features
                </a>
                <Link
                  href="/main/ats-score"
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-white transition py-2"
                >
                  ATS Score
                </Link>
                <Link
                  href="/main/linkedin-analyzer"
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-white transition py-2"
                >
                  LinkedIn
                </Link>
                <Link
                  href="/main/github-analyzer"
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-white transition py-2"
                >
                  GitHub
                </Link>
                <div className="h-px bg-white/10 my-2" />
                <Link
                  href="/main/profile"
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-white transition py-2"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white transition text-left py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="#analyze"
                  onClick={handleFeaturesClick}
                  className="text-gray-400 hover:text-white transition cursor-pointer py-2"
                >
                  Features
                </a>
                <Link
                  href="/main/ats-score"
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-white transition py-2"
                >
                  ATS Score
                </Link>
                <Link
                  href="/main/linkedin-analyzer"
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-white transition py-2"
                >
                  LinkedIn
                </Link>
                <Link
                  href="/main/github-analyzer"
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-white transition py-2"
                >
                  GitHub
                </Link>
                <div className="h-px bg-white/10 my-2" />
                <Link
                  href="/login"
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-white transition py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={handleNavClick}
                  className="inline-block px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition text-center w-full"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
