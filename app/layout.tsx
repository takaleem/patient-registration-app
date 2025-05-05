import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { Navbar } from "@/components/navbar"
import { DatabaseProvider } from "@/lib/database-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Patient Registration App",
  description: "A patient management app using Pglite",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <DatabaseProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="py-6 border-t">
                <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                  <p className="text-sm text-muted-foreground text-center md:text-left">
                    &copy; {new Date().getFullYear()} Patient Registration App.
                  </p>
                </div>
              </footer>
            </div>
            <Toaster richColors />
          </DatabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
