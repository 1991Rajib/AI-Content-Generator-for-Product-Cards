import React from 'react';
import Logo from './Logo';
import { Key } from 'lucide-react';

export default function Header({ onOpenKeyModal, hasCustomKey, generationSource }) {
  return (
    <header className="border-b border-[#E39A7B]/25 bg-[#FFFDFB]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Studio Info */}
        <div className="flex items-center gap-3">
          <Logo size={42} className="shrink-0 hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-[#28160E] tracking-tight">CardCraft AI</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFD3AC]/40 text-[#853E23] border border-[#FFB5AB] font-bold">
                Fresh Peach
              </span>
            </div>
            <p className="text-xs text-[#825F4C] hidden sm:block">
              Intelligent Product Card Generator & SEO Studio
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E39A7B]/25 text-xs shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DBB06B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E39A7B]"></span>
            </span>
            <span className="text-[#5C3A29] font-semibold">
              {generationSource === 'gemini-api' || generationSource === 'gemini-direct-rest' 
                ? 'Gemini 1.5 Flash Active' 
                : 'AI REST Engine Ready'}
            </span>
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenKeyModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              hasCustomKey 
                ? 'bg-[#FFD3AC]/40 text-[#853E23] border-[#E39A7B] hover:bg-[#FFD3AC]/60' 
                : 'bg-white text-[#5C3A29] border-[#E39A7B]/30 hover:bg-[#FFD3AC]/20 hover:border-[#E39A7B]'
            }`}
            title="Configure custom API credentials"
          >
            <Key className="w-3.5 h-3.5 text-[#E39A7B]" />
            <span className="hidden sm:inline">API Config</span>
            {hasCustomKey && <span className="w-1.5 h-1.5 rounded-full bg-[#E39A7B]"></span>}
          </button>

          {/* Vercel Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#28160E] text-white text-xs font-semibold shadow-xs">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 1155 1000">
              <path d="m577.3 0 577.4 1000H0z"/>
            </svg>
            <span className="hidden sm:inline">Vercel Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
}
