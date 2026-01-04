'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FinAvatar from '../components/FinAvatar';

export default function Page() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // simulate initialization progress
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          return 100;
        }
        return Math.min(100, p + Math.floor(Math.random() * 12) + 4);
      });
    }, 400);

    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex items-center gap-6">
        <FinAvatar size={96} />
        <div>
          <h2 className="text-3xl font-bold">Welcome to OmniFin AI</h2>
          <p className="text-slate-300 mt-1">Initializing your personal finance assistant — Fin</p>
        </div>
      </div>

      <div className="w-full max-w-xl">
        <div className="bg-slate-900 rounded-md p-4">
          <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
            <span>Setup progress</span>
            <span>{progress}%</span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.4 }}
              className="h-3 bg-emerald-400"
            />
          </div>

          <div className="mt-4 text-slate-400 text-sm">
            Fin is connecting to your data sources and preparing your dashboard. This may take a few moments.
          </div>
        </div>
      </div>
    </div>
  );
}
