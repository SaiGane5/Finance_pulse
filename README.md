# Financial Pulse

Financial Pulse is a comprehensive financial monitoring and analysis tool that provides real-time insights into liquidity, market trends, and news impact on financial decisions.

## Features

- Dashboard with cash flow overview
- AI-driven liquidity forecasting
- News analysis with sentiment and entity recognition
- Market insights with real-time data and investment recommendations
- Real-time alerts system
- Dark mode toggle for user interface

## Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)

## Running the Application

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Deployment

To deploy the application, follow these steps:

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the build folder to a static hosting service (e.g., Netlify, Vercel).

## Frontend Component Documentation

### Overview

The frontend of Financial Pulse is built using React and TypeScript, with routing handled by React Router.

### Components

#### src/main.tsx

**Description:** Entry point of the application. It renders the App component into the root DOM node.

**Key Functions:**
- `createRoot`: Initializes the React application
- `StrictMode`: Helps identify potential problems in an application

#### src/App.tsx

**Description:** Main application component that sets up routing and theme management.

**Key Functions:**
- `useState`: Manages the theme state (light/dark)
- `useEffect`: Applies the theme to the document and saves it to localStorage
- `toggleTheme`: Toggles between light and dark themes
- `Router`, `Route`, `Routes`: Manages navigation between different pages

**Routes:**
- `/`: Renders the Dashboard component
- `/forecast`: Renders the LiquidityForecast component
- `/news`: Renders the NewsAnalysis component
- `/market`: Renders the MarketInsights component
- `/alerts`: Renders the Alerts component

**Navigation:**
Uses `Link` components for navigation with icons from lucide-react.

### Additional Notes

- Ensure that all environment variables are correctly set before running the application
- The application supports a dark mode toggle, which is saved in the browser's localStorage