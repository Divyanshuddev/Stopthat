import React from 'react';
import { Skull, Share2, Sun, Moon } from 'lucide-react';

export default function Navbar({
  stats,
  activeView,
  setActiveView,
  onRandomTemplate,
  onShareClick,
  isDarkMode,
  setIsDarkMode
}) {
  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#06070e]/70 border-b border-white/[0.08] text-white' 
        : 'bg-white/75 border-b border-slate-200/80 text-slate-900'
    } backdrop-blur-2xl shadow-sm`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => setActiveView('studio')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-lg shadow-[0_0_20px_rgba(255,107,0,0.35)] group-hover:scale-105 transition-transform">
            🛑
          </div>
          <span className={`font-display font-black text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            STOP<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">THAT</span>
          </span>
        </div>

        {/* Center Minimal View Switcher */}
        <div className={`flex items-center p-1 rounded-full border ${
          isDarkMode ? 'bg-white/[0.04] border-white/[0.08]' : 'bg-slate-100/90 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveView('studio')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeView === 'studio'
                ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create
          </button>
          <button
            onClick={() => setActiveView('feed')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeView === 'feed'
                ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Feed {stats?.totalSigns ? `(${stats.totalSigns})` : ''}
          </button>
        </div>

        {/* Right Minimal Actions */}
        <div className="flex items-center gap-2">
          {/* Shuffle Idea Button with Skull Face */}
          <button
            onClick={onRandomTemplate}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              isDarkMode 
                ? 'glass-panel hover:bg-white/10 text-orange-300 hover:text-white' 
                : 'bg-white hover:bg-slate-50 border border-slate-200 text-orange-600 shadow-sm'
            }`}
            title="Random Idea"
          >
            <Skull className="w-3.5 h-3.5 text-orange-500 stroke-[2.2]" />
            <span className="hidden sm:inline">Shuffle</span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all ${
              isDarkMode 
                ? 'glass-panel hover:bg-white/10 text-amber-300' 
                : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-sm'
            }`}
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
          </button>

          {/* Share Action Button */}
          <button
            onClick={onShareClick}
            className="px-4 py-1.5 rounded-full btn-aura text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-transform"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </header>
  );
}
