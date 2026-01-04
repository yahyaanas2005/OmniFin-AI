'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

/**
 * Server Actions for OmniFin AI
 * Type-safe database mutations with automatic revalidation
 */

function getSupabaseClient() {
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

export async function createTransaction(formData: FormData) {
  const supabase = getSupabaseClient();
  
  const transaction = {
    company_id: formData.get('company_id') as string,
    entity_id: formData.get('entity_id') as string || null,
    amount: parseFloat(formData.get('amount') as string),
    type: formData.get('type') as 'income' | 'expense',
    category: formData.get('category') as string,
    description: formData.get('description') as string || null,
    date: formData.get('date') as string,
    status: 'completed' as const,
  };

  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true, data };
}

export async function createEntity(formData: FormData) {
  const supabase = getSupabaseClient();
  
  const entity = {
    company_id: formData.get('company_id') as string,
    name: formData.get('name') as string,
    type: formData.get('type') as 'customer' | 'supplier' | 'employee' | 'other',
    email: formData.get('email') as string || null,
    phone: formData.get('phone') as string || null,
  };

  const { data, error } = await supabase
    .from('entities')
    .insert(entity)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true, data };
}

export async function createCompany(formData: FormData) {
  const supabase = getSupabaseClient();
  
  const company = {
    name: formData.get('name') as string,
    currency: formData.get('currency') as string || 'USD',
    business_type: formData.get('business_type') as string || null,
  };

  const { data, error} = await supabase
    .from('companies')
    .insert(company)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true, data };
}

export async function updateTransaction(id: string, formData: FormData) {
  const supabase = getSupabaseClient();
  
  const updates = {
    amount: parseFloat(formData.get('amount') as string),
    type: formData.get('type') as 'income' | 'expense',
    category: formData.get('category') as string,
    description: formData.get('description') as string || null,
    date: formData.get('date') as string,
    status: formData.get('status') as 'pending' | 'completed' | 'cancelled',
  };

  const { data, error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true, data };
}

export async function deleteTransaction(id: string) {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}
