"use client"

import { useAuth } from "@/app/context/AuthContext"

export default function AppSidebar() {
  const { logout } = useAuth()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <aside className="w-64 bg-[#111827] p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-8">ResumeIQ</h2>

      <button onClick={() => scrollTo("analyze")} className="mb-4">
        Analyze
      </button>
      <button onClick={() => scrollTo("dashboard")}>
        Dashboard
      </button>

      <button onClick={logout} className="mt-auto text-sm">
        Logout
      </button>
    </aside>
  )
}
