export default function HeroSection() {
  return (
    <section id="hero" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
        
        {/* Left: Product messaging */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6">
            ResumeIQ
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mb-6 sm:mb-8 mx-auto md:mx-0 leading-relaxed">
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
              className="w-full sm:w-auto rounded-lg bg-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-black hover:bg-gray-200 transition active:scale-95 min-h-12"
            >
              Analyze My Profile
            </button>
          </div>
        </div>

        {/* Right: Video/Image */}
        <div className="relative">
          {/* Mobile: Fallback image */}
          <img
            className="md:hidden w-full rounded-xl border border-white/10 bg-black object-cover aspect-video"
            src="/api/placeholder?width=400&height=300"
            alt="ResumeIQ Demo"
          />
          
          {/* Desktop: Video */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-white/10 bg-black">
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
