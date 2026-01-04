export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">ResumeIQ Dashboard</h1>

        <div className="bg-white p-6 rounded-lg border">
          ATS Score
        </div>

        <div className="bg-white p-6 rounded-lg border">
          Section Breakdown
        </div>

        <div className="bg-white p-6 rounded-lg border">
          Suggestions
        </div>
      </div>
    </main>
  )
}
