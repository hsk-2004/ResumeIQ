export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] flex text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] border-r border-gray-800 p-6">
        <h2 className="text-xl font-semibold mb-8">ResumeIQ</h2>

        <nav className="space-y-4 text-sm">
          <a className="block text-gray-300 hover:text-white">Dashboard</a>
          <a className="block text-gray-400 hover:text-white">Analyze</a>
          <a className="block text-gray-400 hover:text-white">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        <header>
          <h1 className="text-2xl font-semibold">Overview</h1>
          <p className="text-gray-400 text-sm">
            Recruiter-grade profile analysis summary
          </p>
        </header>

        {/* KPI Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            ResumeIQ Score
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            Resume
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            LinkedIn
          </div>
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            GitHub
          </div>
        </section>

        {/* Main Panels */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#111827] border border-gray-800 rounded-xl p-6">
            Score Breakdown
          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            Suggestions
          </div>
        </section>
      </main>
    </div>
  )
}
