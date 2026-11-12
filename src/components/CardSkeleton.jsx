import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-amber-500/30 p-6 shadow-2xl relative animate-pulse">
      {/* Top Banner Indicator */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
          <span className="text-xs font-medium text-amber-400">AI Crafting Card Details & Finding Images...</span>
        </div>
        <div className="h-4 w-20 bg-zinc-800 rounded-full"></div>
      </div>

      {/* Image Skeleton */}
      <div className="w-full h-56 bg-zinc-850 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent animate-shimmer"></div>
        <div className="text-zinc-600 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-zinc-800/80"></div>
          <div className="h-3 w-32 bg-zinc-800/80 rounded"></div>
        </div>
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-6 bg-zinc-800 rounded-lg w-3/4"></div>
        <div className="h-4 bg-zinc-800/60 rounded-lg w-1/3"></div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-5">
        <div className="h-3.5 bg-zinc-800/70 rounded w-full"></div>
        <div className="h-3.5 bg-zinc-800/70 rounded w-5/6"></div>
        <div className="h-3.5 bg-zinc-800/70 rounded w-2/3"></div>
      </div>

      {/* Tag Pills Skeleton */}
      <div className="mb-6">
        <div className="h-3 w-16 bg-zinc-800 rounded mb-2"></div>
        <div className="flex flex-wrap gap-1.5">
          <div className="h-6 w-20 bg-zinc-800 rounded-lg"></div>
          <div className="h-6 w-24 bg-zinc-800 rounded-lg"></div>
          <div className="h-6 w-16 bg-zinc-800 rounded-lg"></div>
          <div className="h-6 w-28 bg-zinc-800 rounded-lg"></div>
        </div>
      </div>

      {/* Footer / Price Skeleton */}
      <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
        <div className="h-6 w-20 bg-zinc-800 rounded-lg"></div>
        <div className="h-6 w-28 bg-zinc-800 rounded-lg"></div>
      </div>
    </div>
  );
}
