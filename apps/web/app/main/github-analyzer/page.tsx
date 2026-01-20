"use client"

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import CursorGlow from "@/components/shared/CursorGlow"

interface FormErrors {
  githubUrl?: string
  role?: string
  general?: string
}

export default function GitHubAnalyzerPage() {
  const [githubUrl, setGithubUrl] = useState("")
  const [role, setRole] = useState("")
  const [score, setScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState({ githubUrl: false, role: false })
  const githubInputRef = useRef<HTMLInputElement>(null)
  const roleInputRef = useRef<HTMLInputElement>(null)

  // Reset score if inputs change (professional behavior)
  useEffect(() => {
    setScore(null)
    setErrors({})
  }, [githubUrl, role])

  // Validate GitHub URL
  const validateGitHubUrl = (value: string): string | undefined => {
    if (!value.trim()) {
      return "Please enter a GitHub profile URL"
    }
    
    // Accept both github.com/username and github.com/users/username formats
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/([a-zA-Z0-9]([a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})\/?$/
    if (!githubRegex.test(value.trim())) {
      return "Please enter a valid GitHub profile URL (e.g., github.com/username)"
    }
    
    return undefined
  }

  // Validate role
  const validateRole = (value: string): string | undefined => {
    if (!value.trim()) {
      return "Please enter a job role"
    }
    if (value.trim().length < 3) {
      return "Job role must be at least 3 characters"
    }
    if (value.trim().length > 100) {
      return "Job role must be less than 100 characters"
    }
    return undefined
  }

  // Handle GitHub URL change
  const handleGitHubUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setGithubUrl(value)
    setErrors((prev) => ({ ...prev, githubUrl: undefined, general: undefined }))
    if (touched.githubUrl) {
      const error = validateGitHubUrl(value)
      setErrors((prev) => ({ ...prev, githubUrl: error }))
    }
  }

  // Handle role change
  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRole(value)
    setErrors((prev) => ({ ...prev, role: undefined, general: undefined }))
    if (touched.role) {
      const error = validateRole(value)
      setErrors((prev) => ({ ...prev, role: error }))
    }
  }

  // Handle GitHub URL blur
  const handleGitHubUrlBlur = () => {
    setTouched((prev) => ({ ...prev, githubUrl: true }))
    const error = validateGitHubUrl(githubUrl)
    setErrors((prev) => ({ ...prev, githubUrl: error }))
  }

  // Handle role blur
  const handleRoleBlur = () => {
    setTouched((prev) => ({ ...prev, role: true }))
    const error = validateRole(role)
    setErrors((prev) => ({ ...prev, role: error }))
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({ githubUrl: true, role: true })

    // Validate form
    const githubUrlError = validateGitHubUrl(githubUrl)
    const roleError = validateRole(role)

    if (githubUrlError || roleError) {
      setErrors({
        githubUrl: githubUrlError,
        role: roleError,
      })
      // Focus first error field
      if (githubUrlError) {
        githubInputRef.current?.focus()
      } else if (roleError) {
        roleInputRef.current?.focus()
      }
      return
    }

    // Clear errors and analyze
    setErrors({})
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const mockScore = Math.floor(70 + Math.random() * 25)
      setScore(mockScore)
    } catch (error) {
      setErrors({
        general: "An error occurred while analyzing your GitHub profile. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle analyze button click (for backward compatibility)
  const handleAnalyze = async () => {
    setTouched({ githubUrl: true, role: true })
    
    const githubUrlError = validateGitHubUrl(githubUrl)
    const roleError = validateRole(role)

    if (githubUrlError || roleError) {
      setErrors({
        githubUrl: githubUrlError,
        role: roleError,
      })
      if (githubUrlError) {
        githubInputRef.current?.focus()
      } else if (roleError) {
        roleInputRef.current?.focus()
      }
      return
    }

    setErrors({})
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const mockScore = Math.floor(70 + Math.random() * 25)
      setScore(mockScore)
    } catch (error) {
      setErrors({
        general: "An error occurred while analyzing your GitHub profile. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = !validateGitHubUrl(githubUrl) && !validateRole(role) && githubUrl.trim() && role.trim()

  return (
    <div className="relative min-h-screen bg-[#0B0F1A] text-gray-100 flex flex-col">
      <CursorGlow />
      <Header />

      <main className="relative z-10 flex-1 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16">
          {/* Page header */}
          <div className="mb-10 sm:mb-14 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              GitHub Profile Analyzer
            </h1>
            <p className="mt-2 sm:mt-3 text-sm text-gray-400">
              Analyze your GitHub profile, repositories, activity, and README quality
              to see how well it aligns with your target job role.
            </p>
          </div>

          {/* General error message */}
          {errors.general && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-6 rounded-md bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400"
            >
              <div className="flex items-start gap-2">
                <svg
                  className="h-5 w-5 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <div className="whitespace-pre-line">{errors.general}</div>
                </div>
                <button
                  onClick={() => setErrors((prev) => ({ ...prev, general: undefined }))}
                  className="flex-shrink-0 text-red-400 hover:text-red-300 transition-colors"
                  aria-label="Dismiss error"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Main grid */}
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-3">
            {/* LEFT: Inputs */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-10">
              <form onSubmit={handleSubmit} noValidate>
                {/* GitHub URL input */}
                <div className="rounded-xl border border-white/10 p-4 sm:p-6 backdrop-blur-sm">
                  <label
                    htmlFor="github-url"
                    className="mb-3 block text-base sm:text-lg font-medium text-white"
                  >
                    GitHub Profile URL
                  </label>
                  <input
                    id="github-url"
                    ref={githubInputRef}
                    type="url"
                    name="githubUrl"
                    value={githubUrl}
                    onChange={handleGitHubUrlChange}
                    onBlur={handleGitHubUrlBlur}
                    placeholder="https://github.com/username"
                    maxLength={200}
                    aria-invalid={touched.githubUrl && !!errors.githubUrl}
                    aria-describedby={touched.githubUrl && errors.githubUrl ? "github-url-error" : "github-url-help"}
                    className={`w-full rounded-md border px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 ${
                      touched.githubUrl && errors.githubUrl
                        ? "border-red-500/50 bg-red-500/5 focus:ring-red-500/50"
                        : "border-white/10 bg-white/5 focus:ring-indigo-500 focus:border-indigo-500/50"
                    }`}
                    disabled={loading}
                  />
                  {touched.githubUrl && errors.githubUrl && (
                    <p
                      id="github-url-error"
                      role="alert"
                      className="mt-2 text-xs text-red-400 flex items-center gap-1"
                    >
                      <svg className="h-3 w-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.githubUrl}
                    </p>
                  )}
                  <p id="github-url-help" className="mt-1 text-xs text-gray-500 sr-only">
                    Enter your GitHub profile URL. Example: https://github.com/username
                  </p>
                </div>

                {/* Target role */}
                <div className="rounded-xl border border-white/10 p-4 sm:p-6 backdrop-blur-sm">
                  <label
                    htmlFor="job-role"
                    className="mb-3 block text-base sm:text-lg font-medium text-white"
                  >
                    Targeted Job Role
                  </label>
                  <input
                    id="job-role"
                    ref={roleInputRef}
                    type="text"
                    name="jobRole"
                    value={role}
                    onChange={handleRoleChange}
                    onBlur={handleRoleBlur}
                    placeholder="e.g. Software Engineer, Data Analyst"
                    maxLength={100}
                    aria-invalid={touched.role && !!errors.role}
                    aria-describedby={touched.role && errors.role ? "role-error" : "role-help"}
                    className={`w-full rounded-md border px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 ${
                      touched.role && errors.role
                        ? "border-red-500/50 bg-red-500/5 focus:ring-red-500/50"
                        : "border-white/10 bg-white/5 focus:ring-indigo-500 focus:border-indigo-500/50"
                    }`}
                    disabled={loading}
                  />
                  {touched.role && errors.role && (
                    <p
                      id="role-error"
                      role="alert"
                      className="mt-2 text-xs text-red-400 flex items-center gap-1"
                    >
                      <svg className="h-3 w-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.role}
                    </p>
                  )}
                  <p id="role-help" className="mt-1 text-xs text-gray-500 sr-only">
                    Enter the job role you are applying for. This helps us analyze your profile compatibility.
                  </p>
                </div>

                {/* Analyze CTA */}
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="w-full rounded-md bg-indigo-600 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0B0F1A] disabled:cursor-not-allowed disabled:bg-indigo-600/50 disabled:hover:bg-indigo-600/50"
                  aria-busy={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze GitHub Profile"
                  )}
                </button>
              </form>
            </div>

            {/* RIGHT: Profile Score */}
            <div className="flex flex-col justify-center rounded-xl border border-white/10 p-6 sm:p-8 text-center backdrop-blur-sm">
              <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wide text-gray-400">
                Profile Score
              </h3>

              <div
                className="my-6 text-5xl sm:text-6xl font-semibold text-white transition-all"
                aria-live="polite"
                aria-atomic="true"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="h-12 w-12 animate-spin text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-label="Analyzing"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                ) : (
                  <>
                    {score !== null ? (
                      <span className={score >= 80 ? "text-green-400" : score >= 65 ? "text-yellow-400" : "text-red-400"}>
                        {score}
                      </span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                    <span className="text-xl sm:text-2xl text-gray-400">/100</span>
                  </>
                )}
              </div>

              <p className="mx-auto max-w-xs text-xs sm:text-sm text-gray-400">
                Indicates how well your GitHub profile aligns with your target job role
                based on repositories, activity, and project quality.
              </p>

              {score !== null && !loading && (
                <div
                  className={`mt-6 rounded-lg px-4 py-3 text-sm ${
                    score >= 80
                      ? "bg-green-500/10 text-green-300 border border-green-500/20"
                      : score >= 65
                      ? "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20"
                      : "bg-red-500/10 text-red-300 border border-red-500/20"
                  }`}
                  role="status"
                >
                  {score >= 80
                    ? "✓ Excellent profile. Strong technical presence."
                    : score >= 65
                    ? "⚠ Good profile. Some improvements recommended."
                    : "✗ Profile needs optimization. More activity and projects needed."}
                </div>
              )}

              {score === null && !loading && (
                <div className="mt-6 rounded-lg bg-white/5 px-4 py-3 text-xs sm:text-sm text-gray-500">
                  Enter your GitHub URL and job role to get started.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
