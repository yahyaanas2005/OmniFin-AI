# OmniFin AI Project Guidelines

## Project Overview
You are building OmniFin AI, a high-scale AI Accountant and ERP SaaS. The app serves freelancers, retailers, and multinational factories. 

## Tech Stack
- Frontend: Next.js 14, React, Tailwind CSS, Framer Motion.
- Backend: Node.js (Express) with a Hybrid-LLM approach (Local Llama 3 via Ollama + GPT-4o fallback).
- Database: Supabase (PostgreSQL) with Row Level Security (RLS).
- Icons: Lucide React.

## Coding Standards
- Use TypeScript for all new components.
- Follow GAAP and IFRS accounting standards for all financial logic.
- Use 'const' over 'let' and prefer arrow functions.
- Ensure all database queries respect multi-tenancy (always filter by user_id or entity_id).

## Specific Feature Logic
- **Manufacturing:** Handle 'Raw Materials', 'WIP', and 'Finished Goods' inventory types. Use FIFO for valuation unless specified.
- **Factory UI:** The 'Floating Avatar' must support a camera-based barcode scanning state.
- **Agentic Logic:** Responses must be structured JSON to allow the UI to trigger visual cues (nod, smile, thinking).

## Boundaries
- Never commit hardcoded API keys or secrets.
- Do not modify existing database schema without explicit confirmation.
