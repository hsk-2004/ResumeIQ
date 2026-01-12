import "./globals.css"
import { Providers } from "./providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0F1A] text-gray-100 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
