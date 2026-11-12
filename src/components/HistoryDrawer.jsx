import React from 'react';
import { History, Trash2, ArrowRight, Sparkles } from 'lucide-react';

export default function HistoryDrawer({ history = [], onSelectCard, onClearHistory, activeCardId }) {
  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClearHistory();
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-[#F5DFCE] shadow-sm mt-6 bg-white/95">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F5DFCE]">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#ED6F00]" />
          <h3 className="text-sm font-bold text-[#2D1A0E] font-display">
            Generation History ({history.length})
          </h3>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-[#785642] hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer font-semibold px-2 py-1 rounded hover:bg-rose-50"
            title="Clear all saved history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="py-6 text-center text-xs text-[#A67C52] flex flex-col items-center justify-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-[#FFF5ED] border border-[#F5DFCE] flex items-center justify-center text-[#ED6F00]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-medium text-[#4A2E1B]">History is empty</span>
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
                  ? 'bg-[#FFF5ED] border-[#ED6F00] shadow-sm'
                  : 'bg-white border-[#F3DAC8] hover:border-[#FFA14D] hover:bg-[#FFF9F5]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFEAD9] text-[#BE5900] border border-[#FFD3AC]">
                  {item.category}
                </span>
                <span className="text-[10px] text-[#A67C52] font-mono font-medium">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="text-xs font-bold text-[#2D1A0E] line-clamp-1 mb-1 font-display">
                {item.title}
              </div>

              <div className="text-[11px] text-[#5C3E28] line-clamp-2 leading-relaxed mb-2">
                {item.shortDescription}
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#785642] pt-1 border-t border-[#F5DFCE]">
                <span>{item.tags?.length || 0} keywords</span>
                <span className="text-[#ED6F00] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
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
