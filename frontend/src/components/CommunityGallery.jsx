import React from 'react';
import { 
  Heart, Share2, Sparkles, Flame, Clock, 
  RotateCcw, ThumbsUp, Filter, MessageSquare, ArrowUpRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { THEMES, FONTS } from '../constants/signConfigs';

export default function CommunityGallery({
  signs = [],
  isLoading,
  onLikeSign,
  onRemixSign,
  onOpenShareModal,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  onRefresh,
  isDarkMode = false
}) {
  const categories = [
    'All',
    'Work & Career',
    'Social & Friends',
    'Family & Relatives',
    'Self-Care & Boundaries',
    'Everyday Annoyances'
  ];

  const handleAgreeClick = (signId, e) => {
    e.stopPropagation();
    onLikeSign(signId);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl border transition-colors ${
        isDarkMode ? 'glass-panel' : 'bg-white/80 border-slate-200/80 shadow-sm'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌍</span>
            <h2 className={`text-xl sm:text-2xl font-black font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              The Wall of Things We Refuse To Do
            </h2>
          </div>
          <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Browse real protest signs submitted by humans worldwide. Upvote the ones you agree with!
          </p>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className={`flex p-1 rounded-2xl border ${
            isDarkMode ? 'glass-input' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setSortOption('trending')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                sortOption === 'trending'
                  ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setSortOption('latest')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                sortOption === 'latest'
                  ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md'
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Latest</span>
            </button>
          </div>

          <button
            onClick={onRefresh}
            title="Refresh community wall"
            className={`p-2 rounded-2xl border transition-colors ${
              isDarkMode ? 'glass-panel hover:bg-white/10 text-slate-300' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3.5 py-1.5 rounded-xl whitespace-nowrap font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-md font-bold'
                : isDarkMode
                  ? 'glass-panel text-slate-400 hover:text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sign Grid */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-slate-500">Loading signboards from community...</p>
        </div>
      ) : signs.length === 0 ? (
        <div className={`py-16 text-center rounded-3xl p-8 border ${
          isDarkMode ? 'glass-panel' : 'bg-white/80 border-slate-200 shadow-sm'
        }`}>
          <span className="text-4xl block mb-2">🛑</span>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No signboards in this category yet!</h3>
          <p className={`text-xs mt-1 max-w-sm mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Be the brave first person to raise a sign and say NO to things you don't like.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {signs.map((sign) => {
            const currentTheme = THEMES[sign.theme] || THEMES.glassAura;
            const currentFont = FONTS[sign.font] || FONTS.display;

            return (
              <div
                key={sign.id}
                className={`rounded-3xl overflow-hidden transition-all flex flex-col justify-between group border ${
                  isDarkMode 
                    ? 'glass-panel hover:border-orange-500/40 hover:shadow-[0_10px_35px_rgba(255,107,0,0.15)]' 
                    : 'bg-white border-slate-200/90 hover:border-orange-500/40 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.08)]'
                }`}
              >
                {/* Visual Signboard Card Display */}
                <div className={`p-4 flex items-center justify-center min-h-[220px] relative overflow-hidden ${
                  isDarkMode ? 'bg-[#05060d]/60' : 'bg-slate-50/70'
                }`}>
                  <div
                    style={{ transform: `rotate(${sign.tilt || 0}deg)` }}
                    className={`relative w-full max-w-[280px] p-4 rounded-2xl ${currentTheme.bgClass} shadow-md flex flex-col justify-between`}
                  >
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`${currentTheme.headlineStyle} text-[10px] font-black uppercase font-display`}>
                        {sign.headline || 'STOP'}
                      </span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white/10 text-orange-400">
                        🛑
                      </span>
                    </div>

                    {/* Main Text */}
                    <p 
                      style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                      className={`${currentFont.fontClass} text-sm sm:text-base font-black uppercase text-center my-2.5 leading-tight break-words`}
                    >
                      {sign.message}
                    </p>

                    {/* Subnote */}
                    {sign.subnote && (
                      <p 
                        style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                        className={`text-[10px] text-center line-clamp-2 break-words ${currentTheme.subnoteStyle}`}
                      >
                        "{sign.subnote}"
                      </p>
                    )}

                    {/* Footer */}
                    <div className="mt-3 pt-1 border-t border-white/[0.08] flex justify-between text-[9px] opacity-80">
                      <span className="truncate italic max-w-[70%]">— {sign.author || 'Anonymous'}</span>
                      <span className="font-bold text-orange-400">🛑</span>
                    </div>
                  </div>
                </div>

                {/* Card Meta & Actions */}
                <div className={`p-4 space-y-3 ${isDarkMode ? 'bg-[#080914]/80' : 'bg-white'}`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2.5 py-1 rounded-full font-medium text-[11px] border ${
                      isDarkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      {sign.category || 'General'}
                    </span>
                    <span className={`text-[11px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      By <strong className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{sign.author || 'Rebel'}</strong>
                    </span>
                  </div>

                  <div className={`flex items-center justify-between pt-2 border-t ${
                    isDarkMode ? 'border-white/[0.08]' : 'border-slate-100'
                  }`}>
                    {/* I Agree Button */}
                    <button
                      type="button"
                      onClick={(e) => handleAgreeClick(sign.id, e)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 text-xs font-bold transition-all active:scale-95"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>I Agree!</span>
                      <span className="bg-rose-500/20 px-1.5 py-0.2 rounded-full text-[10px] ml-0.5 font-mono text-rose-600 dark:text-rose-200">
                        {sign.likes || 0}
                      </span>
                    </button>

                    {/* Action buttons: Remix & Share */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onRemixSign(sign)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border ${
                          isDarkMode ? 'glass-panel text-slate-200 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        }`}
                        title="Edit and make your version"
                      >
                        <RotateCcw className="w-3 h-3 text-orange-500" />
                        <span>Remix</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenShareModal(sign)}
                        className={`p-1.5 rounded-xl transition-colors border ${
                          isDarkMode ? 'glass-panel text-slate-300 hover:text-white hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200'
                        }`}
                        title="Share on WhatsApp, X, IG..."
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
