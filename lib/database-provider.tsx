"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
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
            console.log("Database updated");
          }
        };
      } catch (error) {
        console.error("Failed to initialize database:", error);
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
      if (
        sql.trim().toLowerCase().startsWith("insert") ||
        sql.trim().toLowerCase().startsWith("update") ||
        sql.trim().toLowerCase().startsWith("delete")
      ) {
        channel.postMessage({ type: "db-updated" });
      }

      return result;
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
