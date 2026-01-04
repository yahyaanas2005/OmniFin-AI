'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import React from 'react';

type Props = {
  size?: number;
  mood?: 'neutral' | 'happy' | 'thinking';
  message?: string;
  showMessage?: boolean;
};

export default function FinAvatar({ 
  size = 64, 
  mood = 'neutral',
  message,
  showMessage = false
}: Props) {
  const moodColor =
    mood === 'happy' ? '#34D399' : mood === 'thinking' ? '#FBBF24' : '#60A5FA';

  return (
    <div className="relative inline-flex items-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        className="inline-flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0,0,0,0.08))',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
        }}
        aria-hidden={true}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: size - 12,
            height: size - 12,
            backgroundColor: moodColor,
            borderRadius: '9999px'
          }}
        >
          <Bot size={Math.max(16, Math.floor((size - 12) * 0.6))} color="#022" />
        </div>
      </motion.div>
      
      <AnimatePresence>
        {showMessage && message && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute left-full ml-4 px-4 py-2 rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl min-w-[200px] max-w-[300px]"
          >
            <div className="text-sm text-slate-100">{message}</div>
            <div 
              className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white/10"
              style={{ filter: 'drop-shadow(-2px 0 4px rgba(0,0,0,0.2))' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
