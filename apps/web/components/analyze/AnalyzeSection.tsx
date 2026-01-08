"use client"

import ResumeUpload from "@/app/analyze/components/ResumeUpload"
import LinkedInInput from "@/app/analyze/components/LinkedInInput"
import GitHubInput from "@/app/analyze/components/GitHubInput"
import SectionCard from "@/app/analyze/components/SectionCard"

export default function AnalyzeSection() {
  return (
    <section
      id="analyze"
      className="flex justify-center px-6 py-16 bg-[#0B0F1A]"
    >
      <div className="w-full max-w-2xl space-y-6">
        
        <h2 className="text-2xl font-semibold text-center text-white">
          Profile Analysis
        </h2>

        <SectionCard title="Resume">
          <ResumeUpload />
        </SectionCard>

        <SectionCard title="LinkedIn Profile">
          <LinkedInInput />
        </SectionCard>

        <SectionCard title="GitHub Profile">
          <GitHubInput />
        </SectionCard>

        <button className="w-full mt-8 rounded-lg bg-white text-black py-3 font-medium hover:bg-gray-200 transition">
          Analyze Profile
        </button>
      </div>
    </section>
  )
}
