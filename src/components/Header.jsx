import React from 'react';
import { Sparkles, Key, Zap, ShieldCheck } from 'lucide-react';

export default function Header({ onOpenKeyModal, hasCustomKey, generationSource }) {
  return (
    <header className="border-b border-zinc-800/80 bg-[#101217]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Assignment Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Sparkles className="w-5 h-5 text-zinc-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-white tracking-tight">CardCraft AI</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                Studio
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Intelligent Product Card Generator & SEO Studio
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-300">
              {generationSource === 'gemini-api' || generationSource === 'gemini-direct-rest' 
                ? 'Gemini 1.5 Flash Active' 
                : 'AI REST Engine Ready'}
            </span>
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenKeyModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              hasCustomKey 
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20' 
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
            }`}
            title="Configure or test custom API key"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">API Config</span>
            {hasCustomKey && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </button>

          {/* Vercel Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black text-white border border-zinc-800 text-xs font-semibold shadow-sm">
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
