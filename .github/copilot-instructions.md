# OmniFin AI: Master Enterprise Blueprint (v2.0)

## 1. Project Vision & UX Philosophy
- **Identity:** Lightweight "Rebot-type" HTML interface for Laptop, Mobile, and Google Play Web-wrappers.
- **Dynamic Interaction:** The UI background must "Auto-Move" (scroll/navigate) based on the Avatar’s results.
- **Multilingual:** Full international support for all UI text and Avatar speech.

## 2. Global ERP & Accounting Standards
- **Compliance:** 100% adherence to GAAP and IFRS. 
- **Business Scope:** Personal, Freelance, Retail, Wholesale, Corporate, LLC, Pvt Ltd.
- **Manufacturing:** Job Costing (Materials, Labor, Overhead), Batch/Lot tracking, FIFO/LIFO valuation.

## 3. Intelligent Authentication & Onboarding
- **Unified Auth:** Google, Facebook, Email/Password. 
- **Auto-Logic:** If email is new, perform auto-signup, create a Default Company, set User as Owner/Admin, and trigger Avatar "Welcome Sequence." 
- **Session Focus:** Users only record actions in the company they are currently logged into.

## 4. Hierarchy & Multi-Company Logic
- **Owner Privileges:** Every signup owns a Default Company. They can add additional separate company environments.
- **User Roles:** Owner can invite Users (Admin, Accountant, Sales, etc.) with customized roles.
- **Pro-Advisor Mode:** Users can be members of multiple external companies for support/audit.

## 5. Granular Permissions & Audit Security
- **Deep Access Control:** Permissions must be enforced at the Form Level AND inside the Form at the Field Level.
- **Custom Overrides:** Admins can toggle any specific permission on/off for any user regardless of their role.
- **Full Audit Trail:** Immutable logs of every entry, field change, and user action. Owners can view full history of all sub-users.

## 6. Global Search & CRM Tasks
- **Omni-Search:** Deep search across Menus, History, Audit Logs, and specific DB field entries.
- **Agentic CRM:** AI monitors transactions for late payments and proactively suggests reminders (Agent-Action Loop).

## 7. Technical Stack & AI Reasoning
- **Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, Supabase (RLS).
- **Hybrid-LLM:** Use Local Llama 3 (via Ollama) for routine accounting. GPT-4o for high-level strategy.
- **Avatar Feedback:** Pulse Green (Listening), Pulse Blue (Thinking), Success Glow (Logged).
