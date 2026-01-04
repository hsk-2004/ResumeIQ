import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          ResumeIQ
        </h1>

        <p className="text-gray-600">
          Analyze your Resume, LinkedIn, and GitHub using
          explainable ATS logic and actionable feedback.
        </p>

        <Link
          href="/analyze"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg"
        >
          Analyze My Profile
        </Link>
      </div>
    </main>
  )
}
