/**
 * Database types for OmniFin AI
 * Represents the Supabase schema for companies, entities, and transactions
 */

export type Company = {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  currency: string;
  business_type?: string;
};

export type Entity = {
  id: string;
  company_id: string;
  name: string;
  type: 'customer' | 'supplier' | 'employee' | 'other';
  email?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  company_id: string;
  entity_id?: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string;
  date: string;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'completed' | 'cancelled';
};

export type DashboardMetrics = {
  totalRevenue: number;
  totalExpenses: number;
  cashFlow: number;
  customerCount: number;
  supplierCount: number;
  pendingTransactions: number;
};
