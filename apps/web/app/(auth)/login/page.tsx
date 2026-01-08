"use client"

import { useAuth } from "@/context/AuthContext"
import CursorGlow from "@/components/shared/CursorGlow"

export default function LoginPage() {
  const { login } = useAuth()

  return (
    <div className="relative min-h-screen bg-[#0A0E1A] overflow-hidden">
      
      {/* Cursor-based interactive glow */}
      <CursorGlow />

      {/* Static background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-20 flex h-20 items-center justify-between px-6 backdrop-blur-md">
        <span className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          ResumeIQ
        </span>

        <span className="text-lg text-gray-500">
          Recruiter-grade intelligence
        </span>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-xl border border-gray-800 bg-[#111827]/80 backdrop-blur-xl p-8 shadow-lg">
          
          {/* Card header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-white">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Access your ResumeIQ dashboard
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-gray-400">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-700 bg-[#0B0F1A] px-3 py-2 text-sm text-white placeholder-gray-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-1 block text-xs text-gray-400">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-gray-700 bg-[#0B0F1A] px-3 py-2 text-sm text-white placeholder-gray-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Sign in */}
          <button
            onClick={login}
            className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Sign in
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3 text-xs text-gray-500">
            <div className="h-px flex-1 bg-gray-800" />
            OR
            <div className="h-px flex-1 bg-gray-800" />
          </div>

          {/* Google login */}
          <button
            onClick={login}
            className="w-full rounded-md border border-gray-700 bg-[#0B0F1A] py-2 text-sm text-white transition hover:bg-gray-800"
          >
            Continue with{" "}
            <span className="font-semibold">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#DB4437]">o</span>
              <span className="text-[#F4B400]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#0F9D58]">l</span>
              <span className="text-[#DB4437]">e</span>
            </span>
          </button>
        </div>
      </main>
    </div>
  )
}
