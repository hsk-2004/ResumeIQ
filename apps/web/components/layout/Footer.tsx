"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="mx-auto max-w-7xl px-6 py-12 backdrop-blur-sm">

        {/* Top section */}
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Resume<span className="text-indigo-500">IQ</span>
            </h2>
            <p className="mt-2 max-w-sm text-sm text-gray-400">
              Recruiter-grade resume, LinkedIn, and GitHub intelligence to help
              you stand out professionally.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <SocialLink
              href="https://www.linkedin.com/in/harman-singh-681758347/"
              label="LinkedIn"
            />
            <SocialLink
              href="https://github.com/hsk-2004"
              label="GitHub"
            />
            <SocialLink
              href="https://twitter.com/"
              label="X / Twitter"
            />
            <SocialLink
              href="mailto:harman.singh@email.com"
              label="Email"
            />
          </div>
        </div>

        {/* Divider (soft, glow-friendly) */}
        <div className="my-10 h-px w-full bg-white/5" />

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ResumeIQ. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Designed & developed by{" "}
            <span className="font-medium text-gray-300">
              Harman Singh
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="text-sm text-gray-400 transition hover:text-white"
    >
      {label}
    </Link>
  )
}
