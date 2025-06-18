# Test

This repository contains a simple full stack example with a React/Vite frontend and an Express backend.

## Prerequisites
- Node.js 18+
- npm

## Setup

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` by default.

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the MongoDB connection by setting the `MONGODB_URI` environment variable if needed.
4. Start the server:
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:3000/api`.

## Project Structure
- `frontend/` – React/Vite application
  - `src/` – React components
  - `public/` – static assets
- `backend/` – Express server
  - `routes/` – API route definitions
  - `controllers/` – route controllers
  - `config/` – database configuration

This setup matches the instructions provided in the project documentation.
