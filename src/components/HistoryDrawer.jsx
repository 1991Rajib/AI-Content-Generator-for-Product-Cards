import React from 'react';
import { History, Trash2, ArrowRight, Sparkles } from 'lucide-react';

export default function HistoryDrawer({ history = [], onSelectCard, onClearHistory, activeCardId }) {
  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClearHistory();
  };

  return (
    <div className="peach-panel rounded-2xl p-5 mt-6 bg-white/95">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E39A7B]/20">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#E39A7B]" />
          <h3 className="text-sm font-bold text-[#28160E] font-display">
            Generation History ({history.length})
          </h3>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-[#825F4C] hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer font-bold px-2 py-1 rounded hover:bg-rose-50"
            title="Clear all saved history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="py-6 text-center text-xs text-[#825F4C] flex flex-col items-center justify-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD3AC]/30 border border-[#E39A7B]/30 flex items-center justify-center text-[#E39A7B]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-[#4A2C1D]">History is empty</span>
          <span>Newly generated product cards will appear here automatically.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCard(item)}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                activeCardId === item.id
                  ? 'bg-[#FFD3AC]/30 border-[#E39A7B] shadow-xs'
                  : 'bg-white border-[#E39A7B]/20 hover:border-[#FFB5AB] hover:bg-[#FFD3AC]/15'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFD3AC]/40 text-[#853E23] border border-[#FFB5AB]">
                  {item.category}
                </span>
                <span className="text-[10px] text-[#A3735B] font-mono font-medium">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="text-xs font-bold text-[#28160E] line-clamp-1 mb-1 font-display">
                {item.title}
              </div>

              <div className="text-[11px] text-[#5C3A29] line-clamp-2 leading-relaxed mb-2">
                {item.shortDescription}
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#825F4C] pt-1 border-t border-[#E39A7B]/15">
                <span>{item.tags?.length || 0} keywords</span>
                <span className="text-[#E39A7B] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  <span>View</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
