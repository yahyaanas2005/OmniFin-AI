'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { createCompany } from '@/lib/actions';
import FinAvatar from '@/components/FinAvatar';

export default function NewCompanyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const formData = new FormData(e.currentTarget);
      const result = await createCompany(formData);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Failed to create company');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY'];
  const businessTypes = [
    'Sole Proprietorship',
    'Partnership',
    'LLC',
    'Corporation',
    'Freelance',
    'Retail',
    'Wholesale',
    'Manufacturing',
    'Services',
  ];
  
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="text-slate-400" size={24} />
          </Link>
          <div className="flex items-center gap-4">
            <FinAvatar size={64} mood="happy" />
            <div>
              <h1 className="text-2xl font-bold text-slate-100">
                Create Your Company
              </h1>
              <p className="text-slate-400">
                Set up your accounting workspace
              </p>
            </div>
          </div>
        </div>
        
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <Building2 size={16} />
                Company Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Acme Corporation"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            
            {/* Currency */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                <DollarSign size={16} />
                Primary Currency
              </label>
              <select
                name="currency"
                defaultValue="USD"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr} className="bg-slate-900">
                    {curr}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Business Type */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Business Type (Optional)
              </label>
              <select
                name="business_type"
                defaultValue=""
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="" className="bg-slate-900">
                  Select type...
                </option>
                {businessTypes.map((type) => (
                  <option key={type} value={type} className="bg-slate-900">
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            {error && (
              <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-lg text-red-400">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-emerald-400 text-slate-950 rounded-lg font-semibold hover:bg-emerald-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Company'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
