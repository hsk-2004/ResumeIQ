"use client"

import { useState } from "react"

export default function GitHubInput() {
  const [username, setUsername] = useState("")

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        GitHub Username
      </label>
      <input
        type="text"
        placeholder="e.g. hsk-2004"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  )
}
