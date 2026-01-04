import SectionCard from "../components/SectionCard"
import ResumeUpload from "../components/ResumeUpload"
import LinkedInInput from "../components/LinkedInInput"
import GitHubInput from "../components/GitHubInput"

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto space-y-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Profile Analysis
        </h1>

        <SectionCard title="Resume">
          <ResumeUpload />
        </SectionCard>

        <SectionCard title="LinkedIn Profile">
          <LinkedInInput />
        </SectionCard>

        <SectionCard title="GitHub Profile">
          <GitHubInput />
        </SectionCard>

        <button
          disabled
          className="w-full py-3 rounded-xl bg-black text-white font-medium disabled:opacity-40"
        >
          Analyze Profile
        </button>
      </div>
    </main>
  )
}
