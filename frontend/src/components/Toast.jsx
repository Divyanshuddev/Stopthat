import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-amber-400 text-slate-100 px-4 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-bottom duration-300">
      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
      <span className="text-xs sm:text-sm font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
