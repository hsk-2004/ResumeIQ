"use client"

export function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
      <h3 className="mb-4 text-sm font-medium text-white">
        {title}
      </h3>
      {children}
    </div>
  )
}
