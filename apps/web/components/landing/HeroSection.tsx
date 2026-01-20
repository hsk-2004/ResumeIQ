export default function HeroSection() {
  return (
    <section id="hero" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* Left: Product messaging */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            ResumeIQ
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mb-8 mx-auto md:mx-0">
            Analyze your resume, LinkedIn, and GitHub profile with
            recruiter-style intelligence to uncover strengths, gaps,
            and clear improvement actions.
          </p>

          <div className="flex justify-center md:justify-start">
            <button
              onClick={() =>
                document
                  .getElementById("analyze")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:bg-gray-200 transition"
            >
              Analyze My Profile
            </button>
          </div>
        </div>

        {/* Right: Video */}
        <div className="relative hidden md:block">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
            <video
              className="w-full h-full object-cover"
              src="/demo.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>

      </div>
    </section>
  )
}
