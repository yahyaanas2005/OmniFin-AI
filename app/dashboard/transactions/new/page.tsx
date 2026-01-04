'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, DollarSign, Calendar, FileText, Tag } from 'lucide-react';
import Link from 'next/link';
import { createTransaction } from '@/lib/actions';
import FinAvatar from '@/components/FinAvatar';

export default function NewTransactionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'income' as 'income' | 'expense',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });
  
  const categories = {
    income: ['Sales', 'Services', 'Investment', 'Other Income'],
    expense: ['Payroll', 'Rent', 'Utilities', 'Supplies', 'Marketing', 'Other Expense'],
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const formDataObj = new FormData(e.currentTarget);
      
      // Add company_id - in a real app, this would come from user session
      // For now, we'll need to fetch it or pass it as a prop
      formDataObj.append('company_id', 'demo-company-id');
      
      const result = await createTransaction(formDataObj);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Failed to create transaction');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
            <FinAvatar size={64} mood="thinking" />
            <div>
              <h1 className="text-2xl font-bold text-slate-100">
                New Transaction
              </h1>
              <p className="text-slate-400">
                Record income or expense
              </p>
            </div>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step >= num
                    ? 'bg-emerald-400 text-slate-950'
                    : 'bg-white/10 text-slate-500'
                }`}
              >
                {num}
              </div>
              {num < 3 && (
                <div
                  className={`w-12 h-1 rounded transition-colors ${
                    step > num ? 'bg-emerald-400' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Type Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Transaction Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'income' })}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      formData.type === 'income'
                        ? 'border-emerald-400 bg-emerald-400/10'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-3xl mb-2">💰</div>
                    <div className="font-bold text-slate-100">Income</div>
                    <div className="text-sm text-slate-400">Money received</div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      formData.type === 'expense'
                        ? 'border-red-400 bg-red-400/10'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-3xl mb-2">💸</div>
                    <div className="font-bold text-slate-100">Expense</div>
                    <div className="text-sm text-slate-400">Money spent</div>
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full mt-6 px-6 py-3 bg-emerald-400 text-slate-950 rounded-lg font-semibold hover:bg-emerald-300 transition-colors"
                >
                  Continue
                </button>
              </motion.div>
            )}
            
            {/* Step 2: Category and Amount */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Category */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                    <Tag size={16} />
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="">Select a category</option>
                    {categories[formData.type].map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Amount */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                    <DollarSign size={16} />
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                      $
                    </span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 bg-white/5 text-slate-100 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!formData.category || !formData.amount}
                    className="flex-1 px-6 py-3 bg-emerald-400 text-slate-950 rounded-lg font-semibold hover:bg-emerald-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Date and Description */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Hidden fields to carry over data */}
                <input type="hidden" name="type" value={formData.type} />
                <input type="hidden" name="category" value={formData.category} />
                <input type="hidden" name="amount" value={formData.amount} />
                
                {/* Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                    <Calendar size={16} />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                    <FileText size={16} />
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Add notes about this transaction..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                  />
                </div>
                
                {error && (
                  <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-lg text-red-400">
                    {error}
                  </div>
                )}
                
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 px-6 py-3 bg-white/5 text-slate-100 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-emerald-400 text-slate-950 rounded-lg font-semibold hover:bg-emerald-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Transaction'}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
