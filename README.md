# OSM Expanse Card Reporting App

A Next.js 14 + TypeScript + TailwindCSS starter for the OSM Expanse Card reporting experience. It includes a mock transactions API and a styled dashboard landing page.

## Getting started

1. Install dependencies (Node.js 18+ recommended):
   ```bash
   npm install
   ```
2. Create an environment file based on the provided example:
   ```bash
   cp .env.example .env.local
   ```
   Then fill in your OSM OAuth credentials.
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 to view the dashboard. The mock API is available at http://localhost:3000/api/transactions.

## Tech

- Next.js App Router
- TypeScript
- TailwindCSS
- ESLint (Next.js defaults)
