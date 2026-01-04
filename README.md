# OmniFin-AI
OmniFin AI: Enterprise-grade AI Accountant &amp; ERP SaaS. Autonomous bookkeeping, factory inventory management, and CRM tasks via a conversational Avatar interface. Built for Freelancers, Factories, and Global Corporates using a Hybrid-LLM (Local Llama 3 + GPT-4o) approach.

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/yahyaanas2005/OmniFin-AI.git
cd OmniFin-AI
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file and add your credentials:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your Supabase credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://kzacbvqfsribzhqwfnfd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Supabase Configuration

The project is configured to use the following Supabase project:
- **Project ID**: `kzacbvqfsribzhqwfnfd`
- **Project URL**: `https://kzacbvqfsribzhqwfnfd.supabase.co`
- **Dashboard**: [View Project](https://supabase.com/dashboard/project/kzacbvqfsribzhqwfnfd)

For detailed deployment instructions, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Features

- 🤖 AI-powered conversational interface
- 📊 Enterprise-grade accounting (GAAP/IFRS compliant)
- 🏭 Manufacturing & inventory management
- 🌍 Multi-company & multi-user support
- 🔐 Granular permissions & audit trails
- 🌐 Multilingual support
- 📱 Responsive design for desktop and mobile

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **AI**: Hybrid LLM (Local Llama 3 + GPT-4o)

## License

Private - All rights reserved.
