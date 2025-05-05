import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">PatientDB</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Register
          </Link>
          <Link
            href="/records"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Records
          </Link>
          <Link
            href="/query"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            SQL Query
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
