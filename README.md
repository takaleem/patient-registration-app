# Patient Registration App

A **frontend-only patient management app** built with Next.js and Pglite. This application allows healthcare providers to register patients, view and search patient records, and run custom SQL queries on patient data — all without a backend server.

## 🔗 Live Demo

👉 [Try it live](https://patient-registration-app-omega.vercel.app/)

## 📚 Usage Instructions

Check out the full usage guide here:  
📖 [Documentation](https://patient-registration-app-omega.vercel.app/docs)

---

## ✨ Features

- **Patient Registration**: Comprehensive form for adding new patients with validation
- **Patient Records**: View and search patient information
- **SQL Query Interface**: Run custom SQL queries directly on patient data
- **Client-side Database**: All data stored locally in the browser using Pglite
- **Data Persistence**: Patient records persist across page refreshes
- **Multi-tab Support**: Real-time sync across browser tabs using Broadcast Channel API
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

---

## 🛠 Technologies Used

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Pglite**
- **Zod**
- **React Hook Form**
- **date-fns**
- **Sonner**
- **Broadcast Channel API**

---

## ⚙️ Setup Guide

### Prerequisites

Make sure you have the following installed:

- **Node.js**: Version 16.x or higher
  - [Download from Node.js website](https://nodejs.org/)
  - Verify with `node -v`
- **npm** (comes with Node.js) or **yarn**
  - If using yarn, install with `npm install -g yarn`
  - Verify with `npm -v` or `yarn -v`
- **Git**: For version control
  - [Download from Git website](https://git-scm.com/downloads)
  - Verify with `git --version`

###  Clone the Repository, Install Dependencies and Run the Development Server

```bash
git clone https://github.com/takaleem/patient-registration-app.git

cd patient-registration-app


# Install dependencies
npm install
# or
yarn install


#run the development server:
npm run dev
# or
yarn dev


