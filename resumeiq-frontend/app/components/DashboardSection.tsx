"use client"

import StatCard from "@/app/dashboard/components/StatCard"
import OverallScoreRing from "@/app/dashboard/components/OverallScoreRing"
import ScoreBreakdown from "@/app/dashboard/components/ScoreBreakdown"
import SuggestionsPanel from "@/app/dashboard/components/SuggestionsPanel"

export default function DashboardSection() {
  const data = {
    resume: 78,
    linkedin: 62,
    github: 71,
    overall: 72,
    suggestions: [
      {
        id: "resume-impact",
        message: "Add measurable impact (numbers, outcomes) to resume bullets.",
      },
      {
        id: "linkedin-summary",
        message: "Optimize LinkedIn summary with role-specific keywords.",
      },
    ],
  }

  return (
    <section
      id="dashboard"
      className="min-h-screen px-8 py-16 space-y-8 bg-[#0B0F1A]"
    >
      <header>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-gray-400 text-sm">
          Recruiter-grade profile analysis summary
        </p>
      </header>

      {/* KPI */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="ResumeIQ Score" value={data.overall} highlight />
        <StatCard label="Resume Quality" value={data.resume} />
        <StatCard label="LinkedIn Strength" value={data.linkedin} />
        <StatCard label="GitHub Impact" value={data.github} />
      </section>

      {/* Main Panels */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <OverallScoreRing score={data.overall} />
            <div className="xl:col-span-2">
              <ScoreBreakdown
                resume={data.resume}
                linkedin={data.linkedin}
                github={data.github}
              />
            </div>
          </div>
        </div>

        <SuggestionsPanel suggestions={data.suggestions} />
      </section>
    </section>
  )
}

