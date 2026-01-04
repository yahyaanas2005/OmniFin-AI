'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import React from 'react';

type Props = {
  size?: number;
  mood?: 'neutral' | 'happy' | 'thinking';
};

export default function FinAvatar({ size = 64, mood = 'neutral' }: Props) {
  const moodColor =
    mood === 'happy' ? '#34D399' : mood === 'thinking' ? '#FBBF24' : '#60A5FA';

  return (
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
  );
}
