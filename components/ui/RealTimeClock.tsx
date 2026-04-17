'use client';

import React, { useState, useEffect } from 'react';

export function RealTimeClock({ className }: { className?: string }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).toUpperCase();
  };

  return (
    <div className={className}>
      <div className="flex flex-col">
        <span className="font-mono">{formatTime(time)}</span>
        <span className="text-[0.6em] opacity-40 leading-none mt-1">{formatDate(time)}</span>
      </div>
    </div>
  );
}
