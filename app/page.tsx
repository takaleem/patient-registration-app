import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Patient Registration App</h1>
        <p className="text-xl text-muted-foreground">A patient management app using Pglite</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Register Patient</CardTitle>
            <CardDescription>Add a new patient to the database</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/register">
              <Button className="w-full">Register New Patient</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>View and query existing patient data</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/records">
              <Button className="w-full">View Records</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SQL Query Interface</CardTitle>
            <CardDescription>Run custom SQL queries on patient data</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/query">
              <Button className="w-full">Open SQL Interface</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Learn how to use the application</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/docs">
              <Button className="w-full">View Documentation</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
