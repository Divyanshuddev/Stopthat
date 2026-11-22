import React from 'react';
import {
  Sparkles, RefreshCw, Smartphone, Square, Palette,
  Type, MessageCircle, Send, Check, AlertTriangle, Edit3
} from 'lucide-react';
import { SIGN_SHAPES, FONTS } from '../constants/signConfigs';

const HEADLINE_PRESETS = [
  "STOP",
  "I QUIT",
  "WARNING",
  "NO MORE",
  "CAN WE PLEASE",
  "NEVER AGAIN"
];

const QUICK_CHIPS = [
  { headline: "STOP", text: "HAVING 1-HOUR MEETINGS THAT COULD BE A 2-LINE EMAIL", sub: "Send the email. Respect our calendars." },
  { headline: "PLEASE STOP", text: "SENDING 4-MINUTE VOICE NOTES WITH 10 SECONDS OF INFO", sub: "I am not listening to a podcast about your lunch." },
  { headline: "I QUIT", text: "REPLYING TO SLACK MESSAGES AFTER 6 PM", sub: "Your emergency is not my overtime." },
  { headline: "NO MORE", text: "SPLITTING THE BILL EVENLY WHEN I ONLY HAD WATER", sub: "Your 3 cocktails are on you, bestie." },
  { headline: "CAN WE PLEASE", text: "STOP ASKING 'WHEN ARE YOU GETTING MARRIED?'", sub: "Mind your own timeline." },
  { headline: "STOP", text: "SAYING YES WHEN MY SOUL IS SCREAMING NO", sub: "Protecting my peace is non-negotiable." },
];

export default function SignEditor({
  formData,
  setFormData,
  onReset,
  onRandomizeName,
  isDarkMode = false
}) {
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleShapeSelect = (shapeId) => {
    if (shapeId === 'octagon') {
      setFormData(prev => ({ ...prev, shape: 'octagon', headline: prev.headline || 'STOP', font: 'display' }));
    } else if (shapeId === 'diamond') {
      setFormData(prev => ({ ...prev, shape: 'diamond', headline: prev.headline || 'WARNING', font: 'bebas' }));
    } else if (shapeId === 'triangle') {
      setFormData(prev => ({ ...prev, shape: 'triangle', headline: prev.headline || 'YIELD', font: 'display' }));
      setFormData(prev => ({ ...prev, shape: 'triangle', headline: prev.headline === 'YIELD' ? 'WARNING' : (prev.headline || 'WARNING'), font: 'bebas' }));
    } else {
      setFormData(prev => ({ ...prev, shape: 'glassCard', font: 'display' }));
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-3.5">
      {/* 1. ROADSIDE SIGN SHAPE SELECTOR */}
      <div className="flex items-center justify-center gap-1.5 p-1 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200/90 shadow-sm dark:bg-white/[0.04] dark:border-white/[0.08]">
        {Object.values(SIGN_SHAPES).map((shp) => {
          const isSelected = (formData.shape || 'octagon') === shp.id;
          return (
            <button
              key={shp.id}
              type="button"
              onClick={() => handleShapeSelect(shp.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all ${isSelected
                ? 'bg-slate-900 text-white shadow-md scale-[1.02] dark:bg-white dark:text-slate-950'
                : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/60 dark:text-slate-400 dark:hover:text-white'
                }`}
            >
              <span className="text-sm">{shp.icon}</span>
              <span className="hidden sm:inline">{shp.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2. MAIN INPUT CARD (WITH DEDICATED CUSTOM & DEFAULT HEADLINE SECTION) */}
      <div className={`p-4 rounded-3xl space-y-3.5 shadow-xl transition-colors ${isDarkMode
        ? 'glass-panel'
        : 'bg-white/85 backdrop-blur-2xl border border-slate-200/90 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)]'
        }`}>
        {/* A. HEADLINE SECTION: DEFAULTS ("STOP", "I QUIT", ETC.) + CUSTOM INPUT */}
        <div className="space-y-2 pb-2 border-b border-slate-100 dark:border-white/[0.08]">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
              <Edit3 className="w-3.5 h-3.5 text-orange-500" /> Header Section:
            </span>
            <span className="text-[10px] text-orange-500 font-mono">
              Pick default or type custom below
            </span>
          </div>

          {/* Quick Default Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {HEADLINE_PRESETS.map((preset) => {
              const isMatch = formData.headline === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => updateField('headline', preset)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${isMatch
                    ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-sm font-black scale-105'
                    : isDarkMode
                      ? 'glass-panel text-slate-300 hover:text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                >
                  {preset}
                </button>
              );
            })}
          </div>

          {/* Custom Header Input Field */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Or Custom:
            </span>
            <input
              type="text"
              value={formData.headline}
              maxLength={30}
              onChange={(e) => updateField('headline', e.target.value.toUpperCase())}
              placeholder="e.g. OFFICIALLY BOYCOTTING, PLEASE DON'T..."
              className={`flex-1 rounded-xl px-3.5 py-1.5 text-xs font-black uppercase tracking-wider focus:outline-none transition-all ${isDarkMode
                ? 'glass-input'
                : 'bg-slate-50/90 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-orange-500'
                }`}
            />
          </div>
        </div>

        {/* B. MAIN PROTEST DEMAND INPUT */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              What do you want to stop doing? *
            </label>
            <span className="text-[10px] text-slate-400 font-mono">
              {formData.message?.length || 0}/140
            </span>
          </div>
          <input
            type="text"
            value={formData.message}
            maxLength={140}
            onChange={(e) => updateField('message', e.target.value.toUpperCase())}
            placeholder="E.G. SCHEDULING 8:30 AM STANDUP MEETINGS"
            className={`w-full rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold focus:outline-none transition-all ${isDarkMode
              ? 'glass-input'
              : 'bg-slate-50/80 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15'
              }`}
          />
        </div>

        {/* C. SUBNOTE & AUTHOR ROW (WITH 🎲 RANDOM NAME GENERATOR) */}
        <div className="space-y-1.5 pt-0.5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            {/* Why / Context Input */}
            <div className="sm:col-span-7">
              <input
                type="text"
                value={formData.subnote}
                maxLength={90}
                onChange={(e) => updateField('subnote', e.target.value)}
                placeholder="Why / Context (optional)..."
                className={`w-full rounded-xl px-3.5 py-1.5 text-xs focus:outline-none transition-all ${isDarkMode
                  ? 'glass-input'
                  : 'bg-slate-50/80 border border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-orange-500'
                  }`}
              />
            </div>

            {/* Author / Alias with 🎲 Random Button */}
            <div className="sm:col-span-5 flex items-center gap-1.5">
              <input
                type="text"
                value={formData.author}
                maxLength={32}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="Your Name / Alias"
                className={`flex-1 min-w-0 rounded-xl px-3.5 py-1.5 text-xs focus:outline-none transition-all ${isDarkMode
                  ? 'glass-input'
                  : 'bg-slate-50/80 border border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-orange-500'
                  }`}
              />
              <button
                type="button"
                onClick={onRandomizeName}
                title="Roll a random name / alias"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 whitespace-nowrap shadow-sm ${isDarkMode
                  ? 'bg-white/10 hover:bg-white/20 text-orange-400 border border-white/10'
                  : 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 border border-orange-500/25'
                  }`}
              >
                <span>🎲</span>
                <span className="text-[11px] font-bold">Random</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 1-TAP QUICK SUGGESTION CHIPS */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mr-1">
          Quick Ideas:
        </span>
        {QUICK_CHIPS.map((chip, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                headline: chip.headline,
                message: chip.text,
                subnote: chip.sub
              }));
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] transition-colors truncate max-w-[200px] ${isDarkMode
              ? 'glass-panel hover:bg-white/10 text-slate-300 hover:text-orange-300'
              : 'bg-white/90 hover:bg-white border border-slate-200/90 text-slate-700 hover:border-orange-500/40 hover:text-orange-600 shadow-sm'
              }`}
          >
            {chip.text.slice(0, 24)}...
          </button>
        ))}
      </div>
    </div>
  );
}
