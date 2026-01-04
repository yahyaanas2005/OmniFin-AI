/**
 * Lightweight accounting helpers for OmniFin AI
 */

export type Transaction = {
  id: string;
  amount: number; // positive for credit, negative for debit
  date: string; // ISO
  description?: string;
};

export function sumTransactions(transactions: Transaction[]): number {
  return transactions.reduce((acc, t) => acc + t.amount, 0);
}

export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(value);
}

export function computeRunningBalance(transactions: Transaction[]): { id: string; balance: number }[] {
  const sorted = [...transactions].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const out: { id: string; balance: number }[] = [];
  let bal = 0;
  for (const t of sorted) {
    bal += t.amount;
    out.push({ id: t.id, balance: bal });
  }
  return out;
}
