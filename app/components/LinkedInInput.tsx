"use client"

import { useState } from "react"

export default function LinkedInInput() {
  const [url, setUrl] = useState("")
  const [summary, setSummary] = useState("")

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">
          LinkedIn Profile URL
        </label>
        <input
          type="url"
          placeholder="https://www.linkedin.com/in/username"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          LinkedIn Summary / About
        </label>
        <textarea
          placeholder="Brief professional summary (skills, role, experience)"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>
  )
}
