'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, DollarSign, AlertCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import FinAvatar from '@/components/FinAvatar';
import type { Company, Entity, Transaction, DashboardMetrics } from '@/lib/database/types';
import { formatCurrency } from '@/lib/accounting';
import { useState, useEffect } from 'react';

type Props = {
  initialData: {
    company: Company | null;
    transactions: Transaction[];
    entities: Entity[];
    metrics: DashboardMetrics;
  };
};

export default function DashboardClient({ initialData }: Props) {
  const { company, transactions, entities, metrics } = initialData;
  const [finMessage, setFinMessage] = useState('');
  const [showFinMessage, setShowFinMessage] = useState(false);
  
  useEffect(() => {
    // Generate Fin's personalized message based on data
    if (company && metrics.pendingTransactions > 0) {
      setFinMessage(`You have ${metrics.pendingTransactions} pending transaction${metrics.pendingTransactions > 1 ? 's' : ''} to review.`);
      setShowFinMessage(true);
      
      const timer = setTimeout(() => setShowFinMessage(false), 8000);
      return () => clearTimeout(timer);
    } else if (company && metrics.cashFlow < 0) {
      setFinMessage(`Alert: Your cash flow is negative by ${formatCurrency(Math.abs(metrics.cashFlow))}`);
      setShowFinMessage(true);
      
      const timer = setTimeout(() => setShowFinMessage(false), 8000);
      return () => clearTimeout(timer);
    } else if (company) {
      setFinMessage(`Looking good! Your cash flow is ${formatCurrency(metrics.cashFlow)}`);
      setShowFinMessage(true);
      
      const timer = setTimeout(() => setShowFinMessage(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [company, metrics]);
  
  // Empty State - No company exists yet
  if (!company) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="flex justify-center mb-6">
            <FinAvatar size={96} mood="thinking" />
          </div>
          
          <h1 className="text-3xl font-bold text-slate-100 mb-4">
            Welcome to OmniFin AI
          </h1>
          
          <p className="text-slate-400 mb-8">
            Let&apos;s get started by creating your first company. I&apos;ll guide you through setting up your accounting workspace.
          </p>
          
          <Link
            href="/dashboard/company/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-400 text-slate-950 rounded-lg font-semibold hover:bg-emerald-300 transition-colors"
          >
            <Plus size={20} />
            Create Your First Company
          </Link>
        </motion.div>
      </div>
    );
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Fin Avatar */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <FinAvatar 
              size={80} 
              mood={metrics.cashFlow >= 0 ? 'happy' : 'thinking'}
              message={finMessage}
              showMessage={showFinMessage}
            />
            <div>
              <h1 className="text-3xl font-bold text-slate-100">
                {company.name}
              </h1>
              <p className="text-slate-400 mt-1">
                Command Center
              </p>
            </div>
          </div>
          
          <Link
            href="/dashboard/transactions/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400 text-slate-950 rounded-lg font-semibold hover:bg-emerald-300 transition-colors"
          >
            <Plus size={20} />
            New Transaction
          </Link>
        </div>
        
        {/* Metrics Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Total Revenue */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-400/20 rounded-lg">
                <TrendingUp className="text-emerald-400" size={24} />
              </div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Revenue</span>
            </div>
            <div className="text-3xl font-bold text-slate-100 mb-1">
              {formatCurrency(metrics.totalRevenue, company.currency)}
            </div>
            <p className="text-sm text-slate-400">Total income received</p>
          </motion.div>
          
          {/* Cash Flow */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metrics.cashFlow >= 0 ? 'bg-blue-400/20' : 'bg-red-400/20'}`}>
                <DollarSign className={metrics.cashFlow >= 0 ? 'text-blue-400' : 'text-red-400'} size={24} />
              </div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Cash Flow</span>
            </div>
            <div className={`text-3xl font-bold mb-1 ${metrics.cashFlow >= 0 ? 'text-slate-100' : 'text-red-400'}`}>
              {formatCurrency(metrics.cashFlow, company.currency)}
            </div>
            <p className="text-sm text-slate-400">
              Revenue minus expenses
            </p>
          </motion.div>
          
          {/* Customer Count */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-400/20 rounded-lg">
                <Users className="text-purple-400" size={24} />
              </div>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Customers</span>
            </div>
            <div className="text-3xl font-bold text-slate-100 mb-1">
              {metrics.customerCount}
            </div>
            <p className="text-sm text-slate-400">
              Active customer accounts
            </p>
          </motion.div>
        </motion.div>
        
        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-100">Recent Transactions</h2>
            {metrics.pendingTransactions > 0 && (
              <div className="flex items-center gap-2 text-amber-400">
                <AlertCircle size={16} />
                <span className="text-sm">{metrics.pendingTransactions} pending</span>
              </div>
            )}
          </div>
          
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">No transactions yet</p>
              <Link
                href="/dashboard/transactions/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400 text-slate-950 rounded-lg font-semibold hover:bg-emerald-300 transition-colors"
              >
                <Plus size={20} />
                Create First Transaction
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 10).map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income' 
                        ? 'bg-emerald-400/20 text-emerald-400' 
                        : 'bg-red-400/20 text-red-400'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp size={20} />
                      ) : (
                        <TrendingDown size={20} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-100">
                        {transaction.category}
                      </div>
                      <div className="text-sm text-slate-400">
                        {transaction.description || 'No description'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-bold ${
                      transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount, company.currency)}
                    </div>
                    <div className="text-sm text-slate-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
