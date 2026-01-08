export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold italic text-white">
            About ResumeIQ
          </h2>

          <p className="text-sm text-gray-400">
            Built to help you stand out — not blend in.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="space-y-4">
            <img
              src="/about-resume.png"
              alt="Resume analysis"
              className="h-28 w-full object-contain rounded-md"
            />
            <h3 className="text-sm font-semibold text-white">
              Recruiter-Grade Resume Analysis
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Understand how your resume is read in the first 6–10 seconds and
              what actually matters for shortlisting.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="space-y-4">
            <img
              src="/about-linkedin.png"
              alt="LinkedIn profile analysis"
              className="h-28 w-full object-contain rounded-md"
            />
            <h3 className="text-sm font-semibold text-white">
              LinkedIn & Profile Strength
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Improve visibility, keyword relevance, and clarity where recruiters
              actually search.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="space-y-4">
            <img
              src="/about-github.png"
              alt="GitHub profile analysis"
              className="h-28 w-full object-contain rounded-md"
            />
            <h3 className="text-sm font-semibold text-white">
              Projects That Speak for You
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Analyze GitHub activity, repositories, and impact to make projects
              hiring-relevant — not just present.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
