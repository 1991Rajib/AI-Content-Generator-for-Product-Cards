import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-indigo-500/30 p-6 shadow-2xl relative animate-pulse">
      {/* Top Banner Indicator */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
          <span className="text-xs font-medium text-indigo-300">AI Crafting Card Details...</span>
        </div>
        <div className="h-4 w-20 bg-slate-800 rounded-full"></div>
      </div>

      {/* Image Skeleton */}
      <div className="w-full h-52 bg-slate-800/80 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent animate-shimmer"></div>
        <div className="text-slate-600 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-slate-700/50"></div>
          <div className="h-3 w-28 bg-slate-700/50 rounded"></div>
        </div>
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-6 bg-slate-800 rounded-lg w-3/4"></div>
        <div className="h-4 bg-slate-800/60 rounded-lg w-1/3"></div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-5">
        <div className="h-3.5 bg-slate-800/70 rounded w-full"></div>
        <div className="h-3.5 bg-slate-800/70 rounded w-5/6"></div>
        <div className="h-3.5 bg-slate-800/70 rounded w-2/3"></div>
      </div>

      {/* Tag Pills Skeleton */}
      <div className="mb-6">
        <div className="h-3 w-16 bg-slate-800 rounded mb-2"></div>
        <div className="flex flex-wrap gap-1.5">
          <div className="h-6 w-20 bg-slate-800 rounded-lg"></div>
          <div className="h-6 w-24 bg-slate-800 rounded-lg"></div>
          <div className="h-6 w-16 bg-slate-800 rounded-lg"></div>
          <div className="h-6 w-28 bg-slate-800 rounded-lg"></div>
        </div>
      </div>

      {/* Footer / Price Skeleton */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="h-7 w-20 bg-slate-800 rounded-lg"></div>
        <div className="h-9 w-32 bg-slate-800 rounded-xl"></div>
      </div>
    </div>
  );
}

