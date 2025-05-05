"use client"

import { useState } from "react"
import { Loader2, Play } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDatabase } from "@/lib/database-provider"

export default function QueryPage() {
  const { executeQuery, isLoading: dbLoading, initialized } = useDatabase()
  const [query, setQuery] = useState("SELECT * FROM patients LIMIT 10")
  const [results, setResults] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)

  async function runQuery() {
    if (!initialized) {
      toast.error("Database Error", {
        description: "Database is not initialized. Please refresh the page.",
      })
      return
    }

    setIsExecuting(true)
    setError(null)

    try {
      const queryResults = await executeQuery(query)
      setResults(queryResults)

      if (queryResults.length === 0) {
        toast("Query Executed", {
          description: "Query executed successfully, but returned no results.",
        })
      }
    } catch (error) {
      console.error("Query execution error:", error)
      setError(error instanceof Error ? error.message : "Unknown error occurred")
      setResults(null)

      toast.error("Query Error", {
        description: "There was an error executing your SQL query.",
      })
    } finally {
      setIsExecuting(false)
    }
  }

  if (dbLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Initializing database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>SQL Query Interface</CardTitle>
          <CardDescription>Run custom SQL queries on the patient database</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your SQL query here..."
            className="font-mono min-h-[150px]"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>{error && <p className="text-sm text-destructive">{error}</p>}</div>
          <Button onClick={runQuery} disabled={isExecuting}>
            {isExecuting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Run Query
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Query Results</CardTitle>
            <CardDescription>
              {results.length} {results.length === 1 ? "row" : "rows"} returned
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(results[0]).map((key) => (
                        <TableHead key={key}>{key}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((row, i) => (
                      <TableRow key={i}>
                        {Object.values(row).map((value: any, j) => (
                          <TableCell key={j}>{value === null ? "NULL" : String(value)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">
                Query executed successfully, but returned no results.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
