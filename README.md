# AI Financial Newsletter

This project provides a fullstack example for an AI-powered financial newsletter. It includes a React/Vite + TypeScript frontend and an Express backend connected to PostgreSQL. Users can authenticate with Firebase, select stocks to follow, and purchase a subscription via Stripe.

## Prerequisites
- Node.js 18+
- npm
- PostgreSQL

## Setup

### Backend
1. Navigate to the `backend` directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Copy `.env.example` to `.env` and adjust the values for your local setup.
3. Start the server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`.

### Frontend
1. Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

### Docker
You can also run the stack using Docker:
```bash
docker-compose up
```

### Deployment

The frontend is optimized for Vercel. After pushing to GitHub, create a new Vercel project and select the `frontend` directory as the root. Set the required environment variables from `.env.example` and Vercel will build using `npm ci`.

For the backend, you can deploy to a provider like Render or Railway. Ensure the environment variables match your production database and Stripe configuration.

All dependencies have been updated with `npm audit fix` to resolve known vulnerabilities.

## Project Structure
- `frontend/` – React/Vite frontend with pages and components
- `backend/` – Express API with authentication, stock selection and Stripe integration
- `docker-compose.yml` – optional container setup

This repository implements the features described in the project documentation including user registration, stock search, Stripe subscription and a PostgreSQL database schema.
