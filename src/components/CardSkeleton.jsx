import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-[#FFD3AC] p-6 shadow-md relative animate-pulse bg-white">
      {/* Top Banner Indicator */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F5DFCE]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#ED6F00] animate-spin" />
          <span className="text-xs font-bold text-[#BE5900]">AI Crafting Card Details & Finding Images...</span>
        </div>
        <div className="h-4 w-20 bg-[#FFEAD9] rounded-full"></div>
      </div>

      {/* Image Skeleton */}
      <div className="w-full h-56 bg-[#FFF5ED] rounded-xl mb-5 flex items-center justify-center relative overflow-hidden border border-[#F5DFCE]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD3AC]/30 to-transparent animate-shimmer"></div>
        <div className="text-[#A67C52] flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#FFEAD9]"></div>
          <div className="h-3 w-32 bg-[#FFEAD9] rounded"></div>
        </div>
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-6 bg-[#FFEAD9] rounded-lg w-3/4"></div>
        <div className="h-4 bg-[#FFF5ED] rounded-lg w-1/3"></div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-5">
        <div className="h-3.5 bg-[#FFF0E5] rounded w-full"></div>
        <div className="h-3.5 bg-[#FFF0E5] rounded w-5/6"></div>
        <div className="h-3.5 bg-[#FFF0E5] rounded w-2/3"></div>
      </div>

      {/* Tag Pills Skeleton */}
      <div className="mb-6">
        <div className="h-3 w-16 bg-[#FFEAD9] rounded mb-2"></div>
        <div className="flex flex-wrap gap-1.5">
          <div className="h-6 w-20 bg-[#FFEAD9] rounded-lg"></div>
          <div className="h-6 w-24 bg-[#FFEAD9] rounded-lg"></div>
          <div className="h-6 w-16 bg-[#FFEAD9] rounded-lg"></div>
          <div className="h-6 w-28 bg-[#FFEAD9] rounded-lg"></div>
        </div>
      </div>

      {/* Footer / Price Skeleton */}
      <div className="pt-4 border-t border-[#F5DFCE] flex items-center justify-between">
        <div className="h-6 w-20 bg-[#FFEAD9] rounded-lg"></div>
        <div className="h-6 w-28 bg-[#FFEAD9] rounded-lg"></div>
      </div>
    </div>
  );
}
