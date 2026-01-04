'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

export default function NewCompanyPage() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  const [companyName, setCompanyName] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY']

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!companyName.trim()) {
      setError('Company name is required')
      return
    }

    if (!user) {
      setError('You must be signed in to create a company')
      return
    }

    setLoading(true)

    const payload = {
      company_name: companyName.trim(),
      currency,
      user_id: user.id,
      created_at: new Date().toISOString(),
    }

    const { data, error: supaError } = await supabase.from('companies').insert([payload])

    setLoading(false)

    if (supaError) {
      console.error('Supabase insert error', supaError)
      setError(supaError.message)
      return
    }

    // Redirect to dashboard on success
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-900/60 to-slate-950/80 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <header className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-lg">Fin</div>
            <div>
              <p className="text-sm text-slate-400">Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}.</p>
              <h1 className="text-2xl font-bold">Add a new company</h1>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Company name</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Acme Capital"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {currencies.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-slate-100">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Create company'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="text-sm text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>
        </form>

        <footer className="mt-8 text-xs text-slate-500">
          <p>Company will be created with the currently authenticated account attached (user_id).</p>
        </footer>
      </div>
    </div>
  )
}
