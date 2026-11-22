import React, { useState } from 'react';
import { Search, Sparkles, Check, ArrowRight, X } from 'lucide-react';

export default function TemplatePicker({
  templates = [],
  onSelectTemplate,
  isOpen,
  onClose
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = ['All', 'Work & Career', 'Social & Friends', 'Family & Relatives', 'Self-Care & Boundaries', 'Everyday Annoyances'];

  const filteredTemplates = templates.filter(tpl => {
    const matchesCategory = selectedCategory === 'All' || tpl.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      tpl.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.subnote.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl shadow-[0_0_80px_rgba(255,107,0,0.25)] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.08] bg-[#070810]/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
              💡
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 font-display">
                Protest Signboard Inspiration Vault
              </h3>
              <p className="text-xs text-slate-400">
                Click any sign below to load it straight into the studio & customize it!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 border-b border-white/[0.08] bg-[#05060d]/50 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. meetings, voice notes, wedding, sleep)..."
              className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all font-semibold ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow font-bold'
                    : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate(tpl);
                  onClose();
                }}
                className="group p-4 rounded-2xl glass-surface hover:border-orange-500/60 cursor-pointer transition-all flex flex-col justify-between hover:shadow-[0_0_25px_rgba(255,107,0,0.2)] hover:scale-[1.01]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {tpl.category}
                    </span>
                    <span className="text-orange-400 font-black text-xs uppercase px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30">
                      {tpl.headline}
                    </span>
                  </div>

                  <p className="text-sm font-black text-slate-100 group-hover:text-orange-300 transition-colors uppercase leading-snug">
                    {tpl.message}
                  </p>

                  {tpl.subnote && (
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 italic">
                      "{tpl.subnote}"
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-orange-400 transition-colors">
                  <span>Theme: {tpl.theme}</span>
                  <span className="flex items-center gap-1">
                    Use This Sign <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              <p className="text-sm">No matching stop signs found for "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-2 text-xs text-orange-400 underline font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
