"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import CursorGlow from "@/components/shared/CursorGlow"

export default function ATSPage() {
  const [file, setFile] = useState<File | null>(null)
  const [role, setRole] = useState("")
  const [score, setScore] = useState<number | null>(null)

  // Reset score if inputs change (professional behavior)
  useEffect(() => {
    setScore(null)
  }, [file, role])

  const handleAnalyze = () => {
    const mockScore = Math.floor(60 + Math.random() * 30)
    setScore(mockScore)
  }

  const removeFile = () => {
    setFile(null)
  }

  return (
    <div className="relative min-h-screen bg-[#0B0F1A] text-gray-100 flex flex-col">
      <CursorGlow />
      <Header />

      <main className="relative z-10 flex-1 pt-4">
        <div className="mx-auto max-w-7xl px-6 py-16">

          {/* Page header */}
          <div className="mb-14 max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              ATS Score Analysis
            </h1>
            <p className="mt-3 text-sm text-gray-400">
              Check how well your resume aligns with Applicant Tracking Systems
              for a specific job role.
            </p>
          </div>

          {/* Main grid */}
          <div className="grid gap-12 lg:grid-cols-3">

            {/* LEFT: Inputs */}
            <div className="lg:col-span-2 space-y-10">

              {/* Resume upload */}
              <div className="rounded-xl border border-white/10 p-6 backdrop-blur-sm">
                <h2 className="mb-3 text-lg font-medium text-white">
                  Resume (PDF)
                </h2>

                {!file ? (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/5 px-6 py-10 text-sm text-gray-400 hover:border-white/30">
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) =>
                        setFile(e.target.files?.[0] || null)
                      }
                    />
                    <span className="font-medium text-gray-300">
                      Upload your resume
                    </span>
                    <span className="mt-1 text-xs">
                      PDF format only
                    </span>
                  </label>
                ) : (
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-sm text-gray-200 truncate">
                      {file.name}
                    </span>

                    <button
                      onClick={removeFile}
                      className="text-xs font-medium text-red-400 hover:text-red-300 transition"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Target role */}
              <div className="rounded-xl border border-white/10 p-6 backdrop-blur-sm">
                <h2 className="mb-3 text-lg font-medium text-white">
                  Targeted Job Role
                </h2>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Software Engineer, Data Analyst"
                  className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Analyze CTA */}
              <button
                onClick={handleAnalyze}
                disabled={!file || !role}
                className="w-full rounded-md bg-indigo-600 py-3 text-sm font-medium transition
                           hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-600/50"
              >
                Analyze ATS Compatibility
              </button>
            </div>

            {/* RIGHT: ATS Score */}
            <div className="flex flex-col justify-center rounded-xl border border-white/10 p-8 text-center backdrop-blur-sm">
              <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
                ATS Score
              </h3>

              <div className="my-6 text-6xl font-semibold text-white">
                {score !== null ? score : "—"}
                <span className="text-2xl text-gray-400">/100</span>
              </div>

              <p className="mx-auto max-w-xs text-sm text-gray-400">
                Indicates how well your resume may perform in automated ATS
                systems for the selected role.
              </p>

              {score !== null && (
                <div className="mt-6 rounded-lg bg-white/5 px-4 py-3 text-sm text-gray-300">
                  {score >= 80
                    ? "Strong alignment. Resume is ATS-friendly."
                    : score >= 65
                    ? "Moderate alignment. Improvements recommended."
                    : "Low alignment. Significant optimization needed."}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
