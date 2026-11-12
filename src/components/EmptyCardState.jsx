import React from 'react';
import { Sparkles, Layers, ArrowLeft } from 'lucide-react';

export default function EmptyCardState() {
  return (
    <div className="peach-card rounded-2xl p-10 sm:p-14 text-center flex flex-col items-center justify-center min-h-[460px] bg-white border border-[#E39A7B]/30 shadow-xs relative overflow-hidden">
      {/* Subtle ambient blur */}
      <div className="absolute w-52 h-52 bg-[#FFD3AC]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-16 h-16 rounded-2xl bg-[#FFD3AC]/35 border border-[#FFB5AB] flex items-center justify-center text-[#E39A7B] mb-5 shadow-xs">
        <Sparkles className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-[#28160E] font-display mb-2">
        Ready to Craft Your Product Card
      </h3>

      <p className="text-sm text-[#825F4C] max-w-md leading-relaxed mb-6 font-normal">
        Enter a product name and category in the form, then click <strong className="text-[#E39A7B]">Generate Details</strong> to create your AI-powered title, description, SEO tags, and matched product photo.
      </p>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD3AC]/25 border border-[#FFB5AB]/60 text-[#853E23] text-xs font-semibold">
        <Layers className="w-3.5 h-3.5 text-[#E39A7B]" />
        <span>Card preview will appear here</span>
      </div>
    </div>
  );
}
