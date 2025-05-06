"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { BroadcastChannel } from "broadcast-channel";

type Database = any;
type DatabaseContextType = {
  db: Database | null;
  isLoading: boolean;
  executeQuery: (sql: string) => Promise<any[]>;
  initialized: boolean;
};

const DatabaseContext = createContext<DatabaseContextType>({
  db: null,
  isLoading: true,
  executeQuery: async () => [],
  initialized: false,
});

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [channel] = useState(() => new BroadcastChannel("patient-db-channel"));

  useEffect(() => {
    async function initDatabase() {
      try {
        const { PGlite } = await import("@electric-sql/pglite");
        const pglite = new PGlite("idb://patient-db");
        setDb(pglite);

        await pglite.query(`
          CREATE TABLE IF NOT EXISTS patients (
            id SERIAL PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            date_of_birth DATE NOT NULL,
            gender TEXT NOT NULL,
            email TEXT,
            phone TEXT,
            address TEXT,
            medical_history TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);

        setInitialized(true);
        setIsLoading(false);

        channel.onmessage = async (message) => {
          if (message.type === "db-updated") {
            console.log("Received broadcast message:", message);
            const event = new CustomEvent("database-updated", {
              detail: message.detail,
            });

            console.log("Dispatching database-updated event:", event);
            window.dispatchEvent(event);

            toast("Database Updated", {
              description: `Patient data has been ${message.detail.action}ed in another tab.`,
            });
          }
        };
      } catch (error) {
        console.error("Failed to initialize database:", error);
        toast.error("Database Error", {
          description:
            "Failed to initialize the database. Please refresh the page.",
        });
        setIsLoading(false);
      }
    }

    initDatabase();

    return () => {
      channel.close();
    };
  }, [channel]);

  const executeQuery = async (sql: string): Promise<any[]> => {
    if (!db) {
      throw new Error("Database not initialized");
    }

    try {
      const result = await db.query(sql);

      const sqlLower = sql.trim().toLowerCase();
      let actionType = null;

      if (sqlLower.startsWith("insert")) {
        actionType = "insert";
      } else if (sqlLower.startsWith("update")) {
        actionType = "update";
      } else if (sqlLower.startsWith("delete")) {
        actionType = "delete";
      }

      if (actionType) {
        const tableMatch = sqlLower.match(
          /into\s+(\w+)|update\s+(\w+)|from\s+(\w+)/
        );
        const tableName = tableMatch
          ? tableMatch[1] || tableMatch[2] || tableMatch[3]
          : "unknown";

        const message = {
          type: "db-updated",
          detail: {
            table: tableName,
            action: actionType,
            timestamp: new Date().getTime(),
          },
        };

        console.log("Broadcasting database change:", message);
        channel.postMessage(message);
      }

      return result.rows;
    } catch (error) {
      console.error("Query execution error:", error);
      throw error;
    }
  };

  return (
    <DatabaseContext.Provider
      value={{ db, isLoading, executeQuery, initialized }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export const useDatabase = () => useContext(DatabaseContext);
