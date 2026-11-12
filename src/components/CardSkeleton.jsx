import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CardSkeleton() {
  return (
    <div className="peach-card rounded-2xl overflow-hidden p-6 relative animate-pulse bg-white">
      {/* Top Banner Indicator */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E39A7B]/20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E39A7B] animate-spin" />
          <span className="text-xs font-bold text-[#E39A7B]">AI Crafting Card Details & Finding Images...</span>
        </div>
        <div className="h-4 w-20 bg-[#FFD3AC]/50 rounded-full"></div>
      </div>

      {/* Image Skeleton */}
      <div className="w-full h-56 bg-[#FFD3AC]/25 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden border border-[#E39A7B]/20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFB5AB]/30 to-transparent animate-shimmer"></div>
        <div className="text-[#A3735B] flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#FFD3AC]/60"></div>
          <div className="h-3 w-32 bg-[#FFD3AC]/60 rounded"></div>
        </div>
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-6 bg-[#FFD3AC]/50 rounded-lg w-3/4"></div>
        <div className="h-4 bg-[#FFD3AC]/30 rounded-lg w-1/3"></div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-5">
        <div className="h-3.5 bg-[#FFD3AC]/35 rounded w-full"></div>
        <div className="h-3.5 bg-[#FFD3AC]/35 rounded w-5/6"></div>
        <div className="h-3.5 bg-[#FFD3AC]/35 rounded w-2/3"></div>
      </div>

      {/* Tag Pills Skeleton */}
      <div className="mb-6">
        <div className="h-3 w-16 bg-[#FFD3AC]/50 rounded mb-2"></div>
        <div className="flex flex-wrap gap-1.5">
          <div className="h-6 w-20 bg-[#FFD3AC]/40 rounded-lg"></div>
          <div className="h-6 w-24 bg-[#FFD3AC]/40 rounded-lg"></div>
          <div className="h-6 w-16 bg-[#FFD3AC]/40 rounded-lg"></div>
          <div className="h-6 w-28 bg-[#FFD3AC]/40 rounded-lg"></div>
        </div>
      </div>

      {/* Footer / Price Skeleton */}
      <div className="pt-4 border-t border-[#E39A7B]/20 flex items-center justify-between">
        <div className="h-6 w-20 bg-[#FFD3AC]/50 rounded-lg"></div>
        <div className="h-6 w-28 bg-[#DBB06B]/30 rounded-lg"></div>
      </div>
    </div>
  );
}
