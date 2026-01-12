"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import CursorGlow from "@/components/shared/CursorGlow"

import HeroSection from "@/components/landing/HeroSection"
import AnalyzeSection from "@/components/landing/AnalyzeSection"
import AboutSection from "@/components/landing/AboutSection"
import FAQSection from "@/components/landing/FAQSection"

export default function AppPage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // Prevent UI flash while auth status is resolving
  if (status === "loading") return null

  // Safety (extra guard)
  if (status !== "authenticated") return null

  return (
    <div className="relative min-h-screen bg-[#0B0F1A] text-gray-100 flex flex-col overflow-hidden">
      {/* Cursor-based interactive glow */}
      <CursorGlow />

      {/* Global header */}
      <Header />

      {/* Main content */}
      <main className="relative z-10 flex-1 pt-32">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
          <HeroSection />
          <AnalyzeSection />
          <AboutSection />
          <FAQSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
