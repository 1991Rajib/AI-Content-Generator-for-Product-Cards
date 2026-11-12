import React from 'react';
import { Sparkles, Key, ExternalLink, Zap, ShieldCheck } from 'lucide-react';

export default function Header({ onOpenKeyModal, hasCustomKey, generationSource }) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Assignment Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-white tracking-tight">CardCraft AI</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                Assignment 2
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              AI Content Generator for Product Cards · Indus Net Technologies
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300">
              {generationSource === 'gemini-api' || generationSource === 'gemini-direct-rest' 
                ? 'Gemini 1.5 Flash Active' 
                : 'AI REST Engine Ready'}
            </span>
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenKeyModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              hasCustomKey 
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750 hover:border-slate-600'
            }`}
            title="Configure or test custom API key"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">API Config</span>
            {hasCustomKey && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </button>

          {/* Vercel Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black text-white border border-slate-700 text-xs font-semibold shadow-sm">
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

