export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Profile Analysis</h1>

        <div className="bg-white p-6 rounded-lg border">
          Resume Upload (PDF)
        </div>

        <div className="bg-white p-6 rounded-lg border">
          LinkedIn Details
        </div>

        <div className="bg-white p-6 rounded-lg border">
          GitHub Username
        </div>

        <button className="w-full py-3 bg-black text-white rounded-lg">
          Analyze
        </button>
      </div>
    </main>
  )
}
