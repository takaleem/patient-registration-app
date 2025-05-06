import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DocsPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Documentation
        </h1>

        <Card className="mb-8 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
              About Patient Registration App
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              A patient management app using Pglite
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
            <p className="leading-relaxed">
              This application is a frontend-only patient registration system
              that uses Pglite for data storage. All data is stored locally in
              your browser and persists across page refreshes. The application
              also supports usage in multiple browser tabs simultaneously.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-2">
              Key Features
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Register new patients</li>
              <li>View and search patient records</li>
              <li>Run custom SQL queries on patient data</li>
              <li>Data persistence across page refreshes</li>
              <li>Multi-tab support with real-time updates</li>
            </ul>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
              How to Register a Patient
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-300 pt-2">
              <p className="mb-4">To register a new patient:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Navigate to the "Register" page from the navigation menu
                </li>
                <li>
                  Fill out the required fields (First Name, Last Name, Date of
                  Birth, Gender)
                </li>
                <li>Optionally add contact information and medical history</li>
                <li>
                  Click the "Register Patient" button to save the patient record
                </li>
              </ol>
              <p className="mt-4">
                After successful registration, you will be redirected to the
                Records page where you can see the newly added patient.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
              Viewing Patient Records
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-300 pt-2">
              <p className="mb-4">
                The Records page displays all registered patients in a table
                format. You can:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Search for patients by name, email, or phone number</li>
                <li>View basic information including registration date</li>
              </ul>
              <p className="mt-4">
                The records are automatically updated if changes are made in
                another tab.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
              Using the SQL Query Interface
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-300 pt-2">
              <p className="mb-4">
                The SQL Query interface allows you to run custom SQL queries on
                the patient database:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Enter your SQL query in the text area</li>
                <li>Click "Run Query" to execute</li>
                <li>Results will be displayed in a table below</li>
              </ul>
              <p className="font-medium mb-2">Example queries:</p>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto text-sm">
                <code className="text-gray-800 dark:text-gray-200">
                  {`-- Get all patients
SELECT * FROM patients;

-- Get patients registered in the last 7 days
SELECT * FROM patients WHERE created_at > (CURRENT_TIMESTAMP - INTERVAL '7 days');

-- Count patients by gender
SELECT gender, COUNT(*) as count FROM patients GROUP BY gender;`}
                </code>
              </pre>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
              Database Schema
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-300 pt-2">
              <p className="mb-4">
                The patient database has the following schema:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto text-sm">
                <code className="text-gray-800 dark:text-gray-200">
                  {`CREATE TABLE patients (
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
)`}
                </code>
              </pre>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
              Technical Information
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-gray-300 pt-2">
              <p className="mb-4">This application is built with:</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Next.js - React framework</li>
                <li>Tailwind CSS - Styling</li>
                <li>shadcn/ui - UI components</li>
                <li>Pglite - Client-side SQL database</li>
                <li>BroadcastChannel API - Multi-tab synchronization</li>
              </ul>
              <p>
                All data is stored locally in your browser using Pglite, which
                provides a PostgreSQL-compatible database that runs entirely in
                the browser.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
