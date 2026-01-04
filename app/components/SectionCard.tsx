"use client"
import { ReactNode } from "react"
import { motion } from "framer-motion"

export default function SectionCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white border rounded-xl p-6 space-y-4 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {children}
    </motion.div>
  )
}
