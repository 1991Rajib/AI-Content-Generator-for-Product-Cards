import React, { useState } from 'react';
import { X, Key, Check, Shield, ExternalLink, Trash2 } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, currentKey, onSaveKey, onClearKey }) {
  const [apiKeyInput, setApiKeyInput] = useState(currentKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveKey(apiKeyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setApiKeyInput('');
    onClearKey();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-[#F5DFCE] shadow-2xl overflow-hidden p-6 relative bg-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#785642] hover:text-[#2D1A0E] hover:bg-[#FFEAD9] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFEAD9] border border-[#FFD3AC] flex items-center justify-center text-[#ED6F00]">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2D1A0E] font-display">AI API & Environment Settings</h3>
            <p className="text-xs text-[#785642]">Configure Google Gemini REST API credentials</p>
          </div>
        </div>

        {/* Info Banner for Vercel Deployment */}
        <div className="p-3.5 rounded-xl bg-[#FFF8F3] border border-[#F5DFCE] space-y-2 mb-5 text-xs text-[#4A2E1B]">
          <div className="flex items-center gap-2 text-[#BE5900] font-bold">
            <Shield className="w-4 h-4 text-[#ED6F00] shrink-0" />
            <span>Deployment Architecture Note</span>
          </div>
          <p className="text-[#5C3E28] leading-relaxed text-[11px]">
            When deployed on <strong>Vercel</strong>, the backend serverless route automatically reads <code className="text-[#BE5900] bg-[#FFEAD9] px-1 py-0.5 rounded font-mono">GEMINI_API_KEY</code> from your Vercel Project Settings. You do not need to enter a key here unless testing client-side overrides.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2E1B] mb-1.5">
              Custom Gemini API Key
            </label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F3DAC8] text-[#2D1A0E] text-xs placeholder-[#A68875] focus:outline-none focus:ring-2 focus:ring-[#FF881E]/30 focus:border-[#ED6F00] font-mono shadow-2xs"
            />
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#785642]">
              <span>Key is stored only in your browser session/localStorage.</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[#ED6F00] hover:text-[#BE5900] font-bold inline-flex items-center gap-0.5"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>API key configuration saved successfully!</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            {currentKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Key</span>
              </button>
            ) : <div></div>}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#785642] hover:text-[#2D1A0E] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#ED6F00] hover:bg-[#BE5900] text-white text-xs font-bold shadow-md shadow-orange-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Configuration</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
