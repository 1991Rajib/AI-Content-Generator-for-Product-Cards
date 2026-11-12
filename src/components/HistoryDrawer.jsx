import React from 'react';
import { History, Trash2, ArrowRight } from 'lucide-react';

export default function HistoryDrawer({ history = [], onSelectCard, onClearHistory, activeCardId }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-zinc-800 shadow-xl mt-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-white font-display">Generation History ({history.length})</h3>
        </div>
        <button
          onClick={onClearHistory}
          className="text-xs text-zinc-500 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
          title="Clear all saved history"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectCard(item)}
            className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
              activeCardId === item.id
                ? 'bg-amber-950/20 border-amber-500/70 shadow-md shadow-amber-500/5'
                : 'bg-zinc-900/60 border-zinc-850 hover:border-zinc-750 hover:bg-zinc-850/40'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {item.category}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div className="text-xs font-bold text-white line-clamp-1 mb-1 font-display">
              {item.title}
            </div>

            <div className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-2">
              {item.shortDescription}
            </div>

            <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-800/60">
              <span>{item.tags?.length || 0} keywords</span>
              <span className="text-amber-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                <span>View</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
