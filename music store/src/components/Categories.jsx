

export default function Categories({ activeCategory, onSelectCategory }) {
  return (
    <div className="relative left-1/2 -translate-x-1/2 z-50 w-3/4 h-[60px] rounded-[32px] shadow-xl flex items-center justify-between px-8 overflow-hidden bg-white border border-transparent">
      {[
        "All",
        "Audio Interfaces",
        "Cables",
        "Amplifiers",
        "Mixers",
        "Microphones",
        "Studio Monitors",
        "Headphones",
        "Accessories",
      ].map((category) => {
        const isActive = activeCategory === category;
        
        return (
          <button
            key={category}
            onClick={() => {
              onSelectCategory(isActive ? null : category);
            }}
            className="relative flex items-center justify-center px-2 transition-all duration-300 transform hover:scale-[1.2]"
          >
            {/* Invisible text when active preserves exact width so nothing shifts */}
            <span 
              className={`text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
                isActive ? "opacity-0" : "text-slate-700 hover:text-indigo-600"
              }`}
            >
              {category}
            </span>

            {/* The SVG renders absolutely centered on top of the invisible text */}
            {isActive && (
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ animation: 'slight-bounce 2s ease-in-out infinite' }}
              >
                <style>{`
                  @keyframes slight-bounce {
                    0%, 100% { transform: translateY(-4px); }
                    50% { transform: translateY(4px); }
                  }
                  @keyframes fader-move {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                  }
                  @keyframes sound-wave {
                    0%, 100% { opacity: 0.2; transform: scale(0.9); }
                    50% { opacity: 1; transform: scale(1.1); }
                  }
                  @keyframes vibrate-fast {
                    0%, 100% { transform: translateX(0) rotate(0deg); }
                    25% { transform: translateX(-1px) rotate(-2deg); }
                    75% { transform: translateX(1px) rotate(2deg); }
                  }
                `}</style>

                {category === "All" && (
                  <svg viewBox="0 0 64 64" className="w-10 h-10 text-slate-800" stroke="currentColor" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="14" y="14" width="14" height="14" rx="3" className="animate-[pulse_1.5s_ease-in-out_infinite]" />
                    <rect x="36" y="14" width="14" height="14" rx="3" className="animate-[pulse_1.5s_ease-in-out_infinite_0.2s]" />
                    <rect x="14" y="36" width="14" height="14" rx="3" className="animate-[pulse_1.5s_ease-in-out_infinite_0.4s]" />
                    <rect x="36" y="36" width="14" height="14" rx="3" className="animate-[pulse_1.5s_ease-in-out_infinite_0.6s]" />
                  </svg>
                )}

                {category === "Audio Interfaces" && (
                  <svg viewBox="0 0 64 64" className="w-10 h-10 text-slate-800" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="16" width="56" height="32" rx="4" />
                    <circle cx="16" cy="32" r="6" />
                    <line x1="16" y1="32" x2="16" y2="26" />
                    <circle cx="32" cy="32" r="6" />
                    <line x1="32" y1="32" x2="36" y2="28" />
                    <line x1="48" y1="24" x2="48" y2="40" className="animate-[pulse_0.8s_ease-in-out_infinite]" />
                    <line x1="54" y1="28" x2="54" y2="36" className="animate-[pulse_0.8s_ease-in-out_infinite_0.3s]" />
                  </svg>
                )}

                {category === "Cables" && (
                  <svg viewBox="0 0 64 64" className="w-10 h-10 text-slate-800" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 40 C 12 50, 24 50, 24 40 C 24 30, 36 30, 36 40 C 36 50, 48 50, 48 40" className="animate-[pulse_1.5s_ease-in-out_infinite]" />
                    <rect x="44" y="24" width="8" height="16" rx="1" />
                    <line x1="48" y1="24" x2="48" y2="12" />
                    <line x1="46" y1="16" x2="50" y2="16" />
                    <circle cx="12" cy="38" r="2" fill="currentColor" />
                  </svg>
                )}

                {category === "Amplifiers" && (
                  <svg viewBox="0 0 64 64" className="w-10 h-10 text-slate-800" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="8" y="12" width="48" height="40" rx="2" />
                    <rect x="12" y="16" width="40" height="10" rx="1" />
                    <circle cx="20" cy="21" r="2" />
                    <circle cx="32" cy="21" r="2" />
                    <circle cx="44" cy="21" r="2" />
                    <circle cx="32" cy="40" r="10" className="animate-[pulse_0.5s_ease-in-out_infinite]" />
                    <circle cx="32" cy="40" r="4" />
                  </svg>
                )}

                {category === "Mixers" && (
                  <svg viewBox="0 0 64 64" className="w-10 h-10 text-slate-800" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 22 L 58 14 L 54 54 L 10 62 Z" />
                    <line x1="18" y1="32" x2="18" y2="52" />
                    <line x1="32" y1="30" x2="32" y2="50" />
                    <line x1="46" y1="28" x2="46" y2="48" />
                    <rect x="14" y="42" width="8" height="4" style={{animation: 'fader-move 1s ease-in-out infinite'}} />
                    <rect x="28" y="34" width="8" height="4" style={{animation: 'fader-move 1.5s ease-in-out infinite'}} />
                    <rect x="42" y="40" width="8" height="4" style={{animation: 'fader-move 1.2s ease-in-out infinite'}} />
                  </svg>
                )}

                {category === "Microphones" && (
                  <svg viewBox="0 0 64 64" className="w-10 h-10 text-slate-800" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="26" y="12" width="12" height="20" rx="6" />
                    <path d="M 20 22 C 20 34, 44 34, 44 22" />
                    <line x1="32" y1="35" x2="32" y2="52" />
                    <line x1="24" y1="52" x2="40" y2="52" />
                    <path d="M 14 16 C 10 20, 10 26, 14 30" style={{animation: 'sound-wave 1s ease-in-out infinite'}} />
                    <path d="M 50 16 C 54 20, 54 26, 50 30" style={{animation: 'sound-wave 1s ease-in-out infinite 0.5s'}} />
                  </svg>
                )}

                {category === "Studio Monitors" && (
                  <svg viewBox="0 0 64 64" className="w-10 h-10 text-slate-800" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="16" y="8" width="32" height="48" rx="2" />
                    <circle cx="32" cy="22" r="6" />
                    <circle cx="32" cy="40" r="12" style={{animation: 'sound-wave 0.8s ease-in-out infinite'}} />
                    <circle cx="32" cy="40" r="4" />
                  </svg>
                )}

                {category === "Headphones" && (
                  <svg viewBox="0 0 64 64" className="w-10 h-10 text-slate-800" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 16 32 C 16 12, 48 12, 48 32" />
                    <rect x="12" y="32" width="8" height="16" rx="4" style={{animation: 'fader-move 1.5s ease-in-out infinite'}} />
                    <rect x="44" y="32" width="8" height="16" rx="4" style={{animation: 'fader-move 1.5s ease-in-out infinite 0.75s'}} />
                  </svg>
                )}

                {category === "Accessories" && (
                  <svg viewBox="0 0 64 64" className="w-10 h-10 text-slate-800" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <g style={{animation: 'vibrate-fast 0.1s linear infinite'}}>
                      <path d="M 26 12 L 26 36 C 26 44, 38 44, 38 36 L 38 12" />
                      <line x1="32" y1="42" x2="32" y2="56" />
                      <circle cx="32" cy="56" r="2" fill="currentColor" />
                    </g>
                  </svg>
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
