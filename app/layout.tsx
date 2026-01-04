import './globals.css';
import type { ReactNode } from 'react';
import FinAvatar from '../components/FinAvatar';

export const metadata = {
  title: 'OmniFin AI',
  description: 'Personal AI for finance — Fin'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12">
                <FinAvatar size={48} />
              </div>
              <h1 className="text-lg font-semibold">OmniFin AI</h1>
            </div>
            <nav className="text-sm text-slate-300">
              {/* placeholder nav */}
              <span className="mr-4">Dashboard</span>
              <span className="mr-4">Accounts</span>
              <span>Settings</span>
            </nav>
          </header>

          <main className="py-8">{children}</main>

          <footer className="py-8 text-sm text-slate-500">
            © {new Date().getFullYear()} OmniFin AI — powered by Fin
          </footer>
        </div>
      </body>
    </html>
  );
}
