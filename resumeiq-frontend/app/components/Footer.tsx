export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          
          <span>© {new Date().getFullYear()} ResumeIQ</span>

          <div className="flex gap-6">
            <span className="hover:text-white transition cursor-default">
              Privacy
            </span>
            <span className="hover:text-white transition cursor-default">
              Terms
            </span>
            <span className="hover:text-white transition cursor-default">
              Contact
            </span>
          </div>

        </div>
      </div>
    </footer>
  )
}
