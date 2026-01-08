"use client"

import { useState } from "react"

export default function ResumeUpload() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      setError("Only PDF resumes are supported")
      setFileName(null)
      return
    }

    setError(null)
    setFileName(file.name)
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        Upload Resume (PDF)
      </label>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full text-sm"
      />

      {fileName && (
        <p className="text-sm text-green-600">
          Selected file: {fileName}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
