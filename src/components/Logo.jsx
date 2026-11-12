import React from 'react';

export default function Logo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Brand Fresh Peach Gradients */}
        <linearGradient id="logoPeachPrimary" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E39A7B" />
          <stop offset="55%" stopColor="#E08D6A" />
          <stop offset="100%" stopColor="#DBB06B" />
        </linearGradient>

        <linearGradient id="logoPeachBlush" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF8F2" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#FFD3AC" stopOpacity="0.88" />
        </linearGradient>

        <linearGradient id="logoTerracottaAccent" x1="20" y1="16" x2="48" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E39A7B" />
          <stop offset="100%" stopColor="#B85834" />
        </linearGradient>

        <filter id="logoCardShadow" x="0" y="3" width="64" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#80381E" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Background Base Card Canvas */}
      <rect x="8" y="8" width="48" height="48" rx="14" fill="url(#logoPeachPrimary)" filter="url(#logoCardShadow)" />

      {/* Subtle Inner Border Highlight */}
      <rect x="9" y="9" width="46" height="46" rx="13" stroke="#FFF" strokeOpacity="0.3" strokeWidth="1.2" />

      {/* Layer 1: Floating Offset Secondary Product Card */}
      <rect x="15" y="15" width="34" height="34" rx="9" fill="url(#logoPeachBlush)" />

      {/* Layer 2: The Craft Monogram ("C" + Generative Sparkle Core) */}
      <path 
        d="M38 23.5 C35 21.5, 29 21.5, 25 25.5 C20.5 30, 20.5 35, 25 39 C29 42.5, 35 42.5, 38 40.5" 
        stroke="url(#logoTerracottaAccent)" 
        strokeWidth="4.2" 
        strokeLinecap="round" 
      />

      {/* Generative Beacon / Craft Core Spark */}
      <path 
        d="M36 27 C36 30 38.5 32 41 32 C38.5 32 36 34 36 37 C36 34 33.5 32 31 32 C33.5 32 36 30 36 27 Z" 
        fill="#DBB06B" 
      />

      {/* Mini accent beacon */}
      <circle cx="26" cy="23" r="1.8" fill="#E39A7B" />
    </svg>
  );
}

