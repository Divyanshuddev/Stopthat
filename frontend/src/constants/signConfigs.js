export const SIGN_SHAPES = {
  octagon: {
    id: 'octagon',
    name: 'Stop Sign (Octagon)',
    icon: '🛑',
    type: 'roadside-stop',
  },
  diamond: {
    id: 'diamond',
    name: 'Warning Sign (Diamond)',
    icon: '⚠️',
    type: 'roadside-warning',
  },
  triangle: {
    id: 'triangle',
    name: 'Warning Plate (Vintage)',
    icon: '🪧',
    type: 'vintage-warning-plate',
  },
  glassCard: {
    id: 'glassCard',
    name: 'Glass Post (Card)',
    icon: '📱',
    type: 'social-glass',
  }
};

export const THEMES = {
  glassAura: {
    id: 'glassAura',
    name: 'Aura Glow',
    bgClass: 'glass-surface text-slate-100 border border-white/20 rounded-[32px]',
    accentColor: '#ff7700',
    headlineStyle: 'bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 text-orange-300 border border-orange-500/40 px-3 py-1 rounded-full text-glow-aura inline-block',
    subnoteStyle: 'text-slate-300/85 border-t border-white/10 pt-2.5',
    isGlassAura: true,
    fontDefault: 'display',
  },
  classicRed: {
    id: 'classicRed',
    name: 'Highway Red',
    bgClass: 'bg-gradient-to-br from-red-600 via-rose-700 to-red-800 text-white shadow-2xl',
    fontDefault: 'display',
  },
  warningAmber: {
    id: 'warningAmber',
    name: 'Caution Amber',
    bgClass: 'bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-black shadow-2xl',
    fontDefault: 'bebas',
  },
  neon: {
    id: 'neon',
    name: 'Cyber Neon',
    bgClass: 'bg-slate-950 text-cyan-300 border-4 border-cyan-400 neon-glow-cyan shadow-2xl',
    fontDefault: 'display',
  }
};

export const FONTS = {
  display: { id: 'display', name: 'Space Bold', fontClass: 'font-display font-extrabold tracking-tight' },
  bebas: { id: 'bebas', name: 'Highway Bebas', fontClass: 'font-bebas tracking-wide' },
  marker: { id: 'marker', name: 'Sharpie Marker', fontClass: 'font-marker' },
};

/**
 * Dynamic responsive font scaler based on character count and board shape.
 * Adjusts font size, line-height, and padding dynamically so short slogans are bold & huge,
 * and long explanations fit comfortably without overflowing sign borders.
 */
export const getMessageTypography = (text = '', shape = 'octagon') => {
  const len = (text || '').trim().length;

  if (shape === 'triangle') {
    if (len <= 18) {
      return 'text-3xl sm:text-4xl md:text-5xl leading-none font-black';
    } else if (len <= 40) {
      return 'text-2xl sm:text-3xl md:text-4xl leading-tight font-black';
    } else if (len <= 70) {
      return 'text-xl sm:text-2xl md:text-3xl leading-snug font-extrabold';
    } else if (len <= 100) {
      return 'text-base sm:text-lg md:text-xl leading-tight font-extrabold';
    } else {
      return 'text-sm sm:text-base md:text-lg leading-tight font-bold';
    }
  }

  if (shape === 'diamond') {
    if (len <= 20) {
      return 'text-2xl sm:text-3xl md:text-4xl leading-tight font-black';
    } else if (len <= 45) {
      return 'text-lg sm:text-xl md:text-2xl leading-tight font-black';
    } else if (len <= 75) {
      return 'text-base sm:text-lg md:text-xl leading-snug font-extrabold';
    } else if (len <= 110) {
      return 'text-xs sm:text-sm md:text-base leading-tight font-extrabold';
    } else {
      return 'text-[11px] sm:text-xs md:text-sm leading-tight font-bold';
    }
  }

  // Octagon and GlassCard
  if (len <= 20) {
    return 'text-2xl sm:text-3xl md:text-4xl leading-tight font-black';
  } else if (len <= 45) {
    return 'text-xl sm:text-2xl md:text-3xl leading-snug font-black';
  } else if (len <= 75) {
    return 'text-base sm:text-lg md:text-xl leading-snug font-extrabold';
  } else if (len <= 110) {
    return 'text-sm sm:text-base md:text-lg leading-tight font-extrabold';
  } else {
    return 'text-xs sm:text-sm md:text-base leading-tight font-bold';
  }
};

export const getHeadlineTypography = (text = '', shape = 'octagon') => {
  const len = (text || '').trim().length;

  if (shape === 'triangle') {
    if (len <= 8) {
      return 'text-xl sm:text-2xl md:text-[28px] tracking-wider';
    } else if (len <= 14) {
      return 'text-base sm:text-lg md:text-xl tracking-wide';
    } else {
      return 'text-xs sm:text-sm md:text-base tracking-normal';
    }
  }

  if (len <= 6) {
    return 'text-base sm:text-xl md:text-2xl tracking-widest px-4 py-1';
  } else if (len <= 12) {
    return 'text-sm sm:text-base md:text-lg tracking-wider px-3.5 py-0.5';
  } else if (len <= 18) {
    return 'text-xs sm:text-sm md:text-base tracking-normal px-3 py-0.5';
  } else {
    return 'text-[11px] sm:text-xs md:text-sm tracking-normal px-2.5 py-0.5';
  }
};

export const getSubnoteTypography = (text = '', shape = 'octagon') => {
  const len = (text || '').trim().length;

  if (len <= 40) {
    return 'text-xs sm:text-sm leading-snug';
  } else if (len <= 80) {
    return 'text-[11px] sm:text-xs leading-snug';
  } else {
    return 'text-[10px] sm:text-[11px] leading-tight';
  }
};
