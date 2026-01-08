"use client"

import { useAuth } from "@/app/context/AuthContext"

export default function AppSidebar() {
  const { logout } = useAuth()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <aside className="w-64 bg-[#111827] border-r border-gray-800 p-6 flex flex-col">
      <div>
        <h2 className="text-xl font-semibold mb-8">ResumeIQ</h2>

        <nav className="space-y-4 text-sm">
          <button onClick={() => scrollTo("analyze")} className="block text-gray-400 hover:text-white">
            Analyze
          </button>
          <button onClick={() => scrollTo("dashboard")} className="block text-gray-400 hover:text-white">
            Dashboard
          </button>
        </nav>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-800">
        <button onClick={logout} className="text-sm text-gray-400 hover:text-white">
          Log out
        </button>
      </div>
    </aside>
  )
}
