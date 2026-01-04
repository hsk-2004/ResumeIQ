import Link from "next/link"

export default function HomePage() {
  return (
    <main className="p-10 text-center space-y-6">
      <h1 className="text-4xl font-bold">ResumeIQ</h1>
      <p className="text-gray-600">
        Analyze your Resume, LinkedIn, and GitHub using explainable ATS logic
      </p>

      <Link
        href="/analyze"
        className="inline-block px-6 py-3 bg-black text-white rounded"
      >
        Analyze My Profile
      </Link>
    </main>
  )
}
