# FinTrack

FinTrack is a simple personal finance tracker built with Next.js and MongoDB. It supports user authentication, transaction management (income/expense), and an optional local AI insights feature powered by Ollama.

## Features

- Authentication (NextAuth credentials)
- Register and login pages
- Add, view, and manage transactions
- Dashboard view for quick usage
- AI Insights page (optional) using local Ollama
- Environment-based configuration for secure setup

## Tech Stack

- Next.js (App Router)
- TypeScript
- MongoDB + Mongoose
- NextAuth (Credentials Provider)
- Tailwind CSS (UI styling)
- Ollama (local LLM) for AI insights (optional)

## Project Structure (High Level)

- `app/` – Next.js routes (pages + API routes)
- `app/api/` – API endpoints (auth, register, transactions, insights)
- `app/components/` – UI components (Navbar, forms, lists, cards)
- `lib/` – DB connection and auth helpers
- `models/` – Mongoose models (User, Transaction)

## Getting Started

### 1) Install dependencies

```bash
npm install
2) Configure environment variables
Create a .env.local file in the project root:

env
Copy code
MONGODB_URI=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
Notes:

MONGODB_URI should be your MongoDB Atlas connection string.

NEXTAUTH_SECRET should be a long random string.

OLLAMA_* values are only required if you want AI insights.

3) Run the development server
bash
Copy code
npm run dev
Open:

http://localhost:3000

If the port is already in use, Next.js may start on another port (e.g. 3001/3002). Check the terminal output for the active URL.

AI Insights (Optional)
FinTrack can generate short financial insights from your recent transactions using a local Ollama model.

Install and run Ollama
Install Ollama from the official website.

Start the Ollama service (it runs locally at http://localhost:11434).

Pull a model (example):

bash
Copy code
ollama pull llama3.1:8b
Verify Ollama is running
bash
Copy code
curl http://localhost:11434/api/tags
Use AI Insights in the app
Go to: /insights

Click “Generate Insights”

The first request may take longer because the model loads into memory. If you hit a timeout, try again.

Security
Do not commit .env.local.

This repository includes .gitignore rules to prevent environment files from being tracked.

Use .env.example as a template for contributors.

Available Scripts
npm run dev – start development server

npm run build – build for production

npm start – run production build

npm run lint – lint the codebase

Roadmap
Better transaction categories and filtering

Monthly analytics summaries

Improved UI for insights and dashboard metrics

Deploy-ready AI option (separate from local Ollama)
