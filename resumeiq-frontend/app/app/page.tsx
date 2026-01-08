"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"

import Header from "@/app/components/Header"
import CursorGlow from "@/app/components/CursorGlow"
import HeroSection from "./components/HeroSection"
import AnalyzeSection from "./components/AnalyzeSection"
import DashboardSection from "./components/DashboardSection"
import AboutSection from "./components/AboutSection"



export default function AppPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.push("/login")
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="relative min-h-screen bg-[#0B0F1A] text-gray-100 flex flex-col overflow-hidden">

      {/* Cursor-based interactive glow */}
      <CursorGlow />

      {/* Header */}
      <Header />

      {/* Page content */}
      <main className="relative z-10 flex-1">
       <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">

          <HeroSection />
          <AnalyzeSection />
          <AboutSection />
          <DashboardSection />
        </div>
      </main>
    </div>
  )
}
