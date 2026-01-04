import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import DashboardClient from './DashboardClient';
import type { Company, DashboardMetrics } from '@/lib/database/types';

async function getSupabaseClient() {
  const cookieStore = cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

async function getDashboardData() {
  const supabase = await getSupabaseClient();
  
  // Fetch companies - for now, we'll use the first one or create a default
  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .limit(1);
  
  let currentCompany: Company;
  
  if (!companies || companies.length === 0) {
    // No companies exist - return null to show empty state
    return {
      company: null,
      transactions: [],
      entities: [],
      metrics: {
        totalRevenue: 0,
        totalExpenses: 0,
        cashFlow: 0,
        customerCount: 0,
        supplierCount: 0,
        pendingTransactions: 0,
      },
    };
  }
  
  currentCompany = companies[0];
  
  // Fetch transactions
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('company_id', currentCompany.id)
    .order('date', { ascending: false })
    .limit(50);
  
  // Fetch entities
  const { data: entities } = await supabase
    .from('entities')
    .select('*')
    .eq('company_id', currentCompany.id);
  
  // Calculate metrics
  const allTransactions = transactions || [];
  const allEntities = entities || [];
  
  const totalRevenue = allTransactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = allTransactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const cashFlow = totalRevenue - totalExpenses;
  
  const customerCount = allEntities.filter(e => e.type === 'customer').length;
  const supplierCount = allEntities.filter(e => e.type === 'supplier').length;
  const pendingTransactions = allTransactions.filter(t => t.status === 'pending').length;
  
  const metrics: DashboardMetrics = {
    totalRevenue,
    totalExpenses,
    cashFlow,
    customerCount,
    supplierCount,
    pendingTransactions,
  };
  
  return {
    company: currentCompany,
    transactions: allTransactions,
    entities: allEntities,
    metrics,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  
  return <DashboardClient initialData={data} />;
}
