import React, { forwardRef } from 'react';
import {
  Heart, MessageCircle, Send, Bookmark, AlertTriangle, ShieldAlert
} from 'lucide-react';
import {
  SIGN_SHAPES, THEMES, FONTS,
  getMessageTypography, getHeadlineTypography, getSubnoteTypography
} from '../constants/signConfigs';

const SignBoardPreview = forwardRef(({
  headline = 'STOP',
  message = 'HAVING MEETINGS THAT COULD BE A 2-LINE EMAIL',
  subnote = 'If there is no agenda, I am declining with zero guilt.',
  author = 'Alex (Exhausted Bestie)',
  shape = 'octagon', // 'octagon' | 'diamond' | 'glassCard' | 'triangle'
  theme = 'glassAura',
  font = 'display',
  aspectRatio = '1:1',
  onHeadlineClick,
  onLikeToggle,
  isLiked = false,
  likeCount = 1,
  showPole = true,
}, ref) => {
  const currentFont = FONTS[font] || FONTS.display;

  // OCTAGON CLIP PATH (Authentic 8-sided roadside Stop Sign)
  const octagonClip = 'polygon(29.3% 0%, 70.7% 0%, 100% 29.3%, 100% 70.7%, 70.7% 100%, 29.3% 100%, 0% 70.7%, 0% 29.3%)';
  // DIAMOND CLIP PATH (Authentic 4-sided roadside Warning Sign)
  const diamondClip = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
  // REALISTIC ROADSIDE YIELD SIGN: Inverted downward pointing equilateral triangle (▽)
  const yieldTriangleClip = 'polygon(0% 0%, 100% 0%, 50% 100%)';

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* ATMOSPHERIC GRADIENT HALO BLOOM */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
          <div className="w-full max-w-[460px] aspect-square relative">
            <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-gradient-to-br from-orange-500/70 via-amber-500/50 to-transparent blur-[65px]"></div>
            <div className="absolute -bottom-12 -left-12 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-600/70 via-indigo-600/50 to-transparent blur-[65px]"></div>
          </div>
        </div>

        {/* CONTAINER THAT GETS EXPORTED */}
        <div
          ref={ref}
          id="signboard-export-container"
          className="relative z-10 w-full max-w-[460px] aspect-square flex flex-col items-center justify-center p-2.5 transition-all duration-300"
        >
          {/* ========================================================
              SHAPE 1: ROADSIDE STOP SIGN (OCTAGON 8-SIDED)
             ======================================================== */}
          {shape === 'octagon' && (
            <div className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_20px_35px_rgba(220,38,38,0.35)]">
              {/* Outer White Border Layer */}
              <div
                style={{ clipPath: octagonClip }}
                className="w-full h-full bg-white p-2.5 sm:p-3 flex items-center justify-center"
              >
                {/* Inner Crimson Red Face */}
                <div
                  style={{ clipPath: octagonClip }}
                  className="w-full h-full bg-gradient-to-br from-red-600 via-rose-700 to-red-800 p-6 sm:p-8 flex flex-col justify-between items-center text-white text-center relative overflow-hidden"
                >
                  {/* Sheen reflection */}
                  <div className="absolute -top-1/2 left-0 right-0 h-full bg-gradient-to-b from-white/15 to-transparent pointer-events-none"></div>

                  {/* Inner Crisp White Octagonal Line */}
                  <div
                    style={{ clipPath: octagonClip }}
                    className="absolute inset-2 sm:inset-3 border-2 border-white/80 pointer-events-none"
                  />

                  {/* Metal Mounting Rivets */}
                  <div className="absolute top-4 w-2 h-2 rounded-full bg-stone-300 border border-stone-500 shadow-inner"></div>
                  <div className="absolute bottom-4 w-2 h-2 rounded-full bg-stone-300 border border-stone-500 shadow-inner"></div>

                  {/* Top Headline Badge */}
                  <div className="relative z-10 pt-2 max-w-[85%] flex justify-center">
                    <button
                      type="button"
                      onClick={onHeadlineClick}
                      className={`rounded-full bg-white text-red-700 font-black tracking-widest font-display shadow-md uppercase hover:scale-105 active:scale-95 transition-transform truncate max-w-full ${getHeadlineTypography(headline, 'octagon')}`}
                      title="Click to cycle headline"
                    >
                      {headline || 'STOP'} ▾
                    </button>
                  </div>

                  {/* Central Statement */}
                  <div className="relative z-10 my-auto py-2 max-w-[85%] w-full flex flex-col items-center">
                    <p
                      style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                      className={`${currentFont.fontClass} ${getMessageTypography(message, 'octagon')} uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] text-center w-full break-words`}
                    >
                      {message || "WRITE WHAT YOU WANT TO STOP DOING"}
                    </p>

                    {subnote && (
                      <div
                        style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                        className={`mt-2.5 font-semibold text-red-100 border-t border-white/30 pt-1.5 text-center w-full max-w-[90%] break-words ${getSubnoteTypography(subnote, 'octagon')}`}
                      >
                        "{subnote}"
                      </div>
                    )}
                  </div>

                  {/* Bottom Signature */}
                  <div className="relative z-10 pb-2 w-full flex items-center justify-between text-[10px] text-white/80 font-mono font-bold uppercase px-4 border-t border-white/20 pt-1.5">
                    <span className="truncate max-w-[60%]">— {author}</span>
                    <span>🛑 ROAD SIGN</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              SHAPE 2: ROADSIDE WARNING SIGN (DIAMOND 4-SIDED)
             ======================================================== */}
          {shape === 'diamond' && (
            <div className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_20px_35px_rgba(245,158,11,0.35)]">
              {/* Outer Black Border Layer */}
              <div
                style={{ clipPath: diamondClip }}
                className="w-full h-full bg-black p-2.5 sm:p-3 flex items-center justify-center"
              >
                {/* Inner Caution Yellow / Amber Diamond */}
                <div
                  style={{ clipPath: diamondClip }}
                  className="w-full h-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 p-6 sm:p-10 flex flex-col justify-between items-center text-black text-center relative overflow-hidden"
                >
                  {/* Inner Black Stroke */}
                  <div
                    style={{ clipPath: diamondClip }}
                    className="absolute inset-2 sm:inset-3 border-2 border-black/80 pointer-events-none"
                  />

                  {/* Mounting Rivets */}
                  <div className="absolute top-6 w-2 h-2 rounded-full bg-stone-700 shadow-inner"></div>
                  <div className="absolute bottom-6 w-2 h-2 rounded-full bg-stone-700 shadow-inner"></div>

                  {/* Top Warning Badge */}
                  <div className="relative z-10 pt-4 flex flex-col items-center max-w-[85%]">
                    <div className={`flex items-center gap-1.5 text-black font-black uppercase tracking-widest bg-black/10 rounded-full border border-black/20 truncate max-w-full ${getHeadlineTypography(headline, 'diamond')}`}>
                      <AlertTriangle className="w-3.5 h-3.5 fill-black shrink-0" />
                      <span className="truncate">{headline || 'WARNING'}</span>
                    </div>
                  </div>

                  {/* Central Statement */}
                  <div className="relative z-10 my-auto py-2 max-w-[80%] w-full flex flex-col items-center">
                    <p
                      style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                      className={`${currentFont.fontClass} ${getMessageTypography(message, 'diamond')} uppercase text-black text-center w-full break-words`}
                    >
                      {message || "WRITE WHAT YOU WANT TO STOP DOING"}
                    </p>

                    {subnote && (
                      <div
                        style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                        className={`mt-2 font-bold text-stone-800 border-t border-black/30 pt-1.5 text-center w-full max-w-[90%] break-words ${getSubnoteTypography(subnote, 'diamond')}`}
                      >
                        "{subnote}"
                      </div>
                    )}
                  </div>

                  {/* Bottom Signature */}
                  <div className="relative z-10 pb-4 w-full flex items-center justify-between text-[10px] text-stone-900 font-mono font-bold uppercase px-6 border-t border-black/20 pt-1.5">
                    <span className="truncate max-w-[60%]">— {author}</span>
                    <span>⚠️ CAUTION</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              SHAPE 3: VINTAGE INDUSTRIAL WARNING SIGN (MATCHING PHOTO)
             ======================================================== */}
          {shape === 'triangle' && (
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[1/1.42] flex flex-col items-center justify-center filter drop-shadow-[0_22px_45px_rgba(0,0,0,0.5)]">
              {/* Outer Tin Plate Container with Rounded Corners & Heavy Black Border */}
              <div className="relative w-full h-full bg-[#fbfbfb] rounded-[24px] sm:rounded-[28px] border-[5px] sm:border-[6px] border-black flex flex-col overflow-hidden shadow-2xl">

                {/* Thin Inner Black Border Pinstripe (Classic Enamel Sign Detail) */}
                <div className="absolute inset-1.5 rounded-[18px] sm:rounded-[20px] border border-black/80 pointer-events-none z-20"></div>

                {/* 4 Corner Screws / Mounting Rivets */}
                <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-stone-300 border border-stone-600 shadow-inner z-30 flex items-center justify-center">
                  <div className="w-1.5 h-[1px] bg-stone-700"></div>
                </div>
                <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-stone-300 border border-stone-600 shadow-inner z-30 flex items-center justify-center">
                  <div className="w-1.5 h-[1px] bg-stone-700"></div>
                </div>
                <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-stone-300 border border-stone-600 shadow-inner z-30 flex items-center justify-center">
                  <div className="w-1.5 h-[1px] bg-stone-700"></div>
                </div>
                <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-stone-300 border border-stone-600 shadow-inner z-30 flex items-center justify-center">
                  <div className="w-1.5 h-[1px] bg-stone-700"></div>
                </div>

                {/* Vintage Distressed Patina Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/[0.04] via-transparent to-black/[0.05] pointer-events-none z-10"></div>
                {/* Subtle Sheen Reflection */}
                <div className="absolute -top-1/2 left-0 right-0 h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-10"></div>

                {/* SECTION 1: TOP BLACK HEADER BLOCK WITH RED OVAL */}
                <div className="w-full bg-[#0d0f12] pt-5 pb-4 px-4 flex flex-col items-center justify-center border-b-[5px] sm:border-b-[6px] border-black relative z-10">
                  {/* RED OVAL / ELLIPSE (With crisp double white outline stroke) */}
                  <button
                    type="button"
                    onClick={onHeadlineClick}
                    className="w-full max-w-[280px] h-14 sm:h-16 rounded-[50%] bg-gradient-to-b from-[#e11d48] via-[#dc2626] to-[#b91c1c] border-2 sm:border-[3px] border-white flex items-center justify-center shadow-lg hover:scale-[1.03] active:scale-95 transition-transform group cursor-pointer"
                    title="Click to cycle headline"
                  >
                    <span
                      style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                      className={`text-white font-bebas font-black uppercase text-center px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-none ${getHeadlineTypography(headline, 'triangle')}`}
                    >
                      {headline || 'WARNING'}
                    </span>
                  </button>
                </div>

                {/* SECTION 2: WHITE / ENAMEL LOWER FIELD (HUGE BLACK CONDENSED TEXT) */}
                <div className="flex-1 w-full bg-[#fcfcfc] p-4 sm:p-5 flex flex-col justify-between items-center text-center relative z-10 select-text">
                  {/* Main Protest Demand Statement (e.g. MUSIC ZONE style) */}
                  <div className="my-auto py-2 w-full flex flex-col items-center justify-center">
                    <p
                      style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                      className={`${currentFont.fontClass} ${getMessageTypography(message, 'triangle')} uppercase text-black font-black text-center w-full max-w-[95%] tracking-tight break-words`}
                    >
                      {message || "WRITE WHAT YOU WANT TO STOP DOING"}
                    </p>

                    {subnote && (
                      <div
                        style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                        className={`mt-3 font-bold text-stone-800 border-t-2 border-black/80 pt-1.5 text-center w-full max-w-[90%] break-words ${getSubnoteTypography(subnote, 'triangle')}`}
                      >
                        "{subnote}"
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Info: Author & Vintage Plate Stamp */}
                  <div className="w-full pt-2 border-t border-black/20 flex items-center justify-between text-[10px] font-mono font-black uppercase text-stone-800">
                    <span className="truncate max-w-[65%]">— {author}</span>
                    <span className="text-red-700 tracking-wider">⚠️ NOTICE PLATE</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================
              SHAPE 4: GLASS SOCIAL POST (CARD)
             ======================================================== */}
          {shape === 'glassCard' && (
            <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 glass-surface text-slate-100 border border-white/20 rounded-[32px] overflow-hidden shadow-2xl">
              {/* Header: Avatar Circle & Three Dots */}
              <div className="flex items-center justify-between pb-3 px-1 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-white/40 bg-white/[0.06] flex items-center justify-center text-xs font-black text-white/90">
                    🛑
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold tracking-tight text-white/95 font-display">
                      {author || 'StopThat'}
                    </span>
                    <span className="text-[10px] text-white/45 tracking-wider uppercase font-mono">
                      Protest Sign
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-1 text-white/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
                </div>
              </div>

              {/* Inner Framed Window */}
              <div className="my-3 flex-1 flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-white/[0.12] bg-[#070810]/75 backdrop-blur-md relative overflow-hidden shadow-inner">
                <div className="relative z-10 flex items-start justify-between">
                  <button
                    type="button"
                    onClick={onHeadlineClick}
                    className={`bg-gradient-to-r from-orange-500/25 via-pink-500/20 to-purple-500/25 text-orange-300 border border-orange-500/40 font-black uppercase rounded-full text-glow-aura shadow-sm max-w-[80%] truncate ${getHeadlineTypography(headline, 'glassCard')}`}
                  >
                    {headline || 'STOP'} ▾
                  </button>
                  <span className="text-[10px] font-mono text-white/40">#SAYNO</span>
                </div>

                <div className="relative z-10 my-auto py-3 text-center flex flex-col items-center justify-center w-full">
                  <p
                    style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                    className={`${currentFont.fontClass} ${getMessageTypography(message, 'glassCard')} uppercase text-white text-glow-white text-center w-full break-words`}
                  >
                    {message}
                  </p>
                  {subnote && (
                    <div
                      style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                      className={`mt-3 font-medium text-slate-300/85 border-t border-white/10 pt-2 text-center w-full max-w-[90%] break-words ${getSubnoteTypography(subnote, 'glassCard')}`}
                    >
                      "{subnote}"
                    </div>
                  )}
                </div>

                <div className="relative z-10 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-white/50">
                  <span className="italic font-display truncate max-w-[65%]">— {author}</span>
                  <span className="font-mono text-orange-400 font-bold">🛑 StopThat.app</span>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="flex items-center justify-between pt-2 px-1 text-white/70">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={onLikeToggle}
                    className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-rose-500' : 'hover:text-rose-400'}`}
                  >
                    <Heart className={`w-5 h-5 stroke-[1.75] ${isLiked ? 'fill-rose-500' : ''}`} />
                    <span className="text-xs font-mono">{likeCount}</span>
                  </button>
                  <div className="cursor-pointer hover:text-white"><MessageCircle className="w-5 h-5 stroke-[1.75]" /></div>
                  <div className="cursor-pointer hover:text-white"><Send className="w-5 h-5 stroke-[1.75]" /></div>
                </div>
                <div className="cursor-pointer hover:text-amber-400"><Bookmark className="w-5 h-5 stroke-[1.75]" /></div>
              </div>
            </div>
          )}
        </div>

        {/* ROADSIDE GALVANIZED STEEL MOUNTING POLE (For Road Signs) */}
        {showPole && shape !== 'glassCard' && (
          <div className="relative -mt-2 z-0 flex flex-col items-center pointer-events-none">
            {/* Mounting Bracket with Rivets */}
            <div className="w-8 h-3.5 bg-slate-300 rounded border border-slate-500 flex justify-around items-center px-1 shadow-md">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-100 border border-slate-500 shadow-inner"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-100 border border-slate-500 shadow-inner"></div>
            </div>
            {/* Highway Grade Steel Pole */}
            <div className="w-6 h-28 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 border-x border-slate-500 shadow-xl flex flex-col items-center justify-around py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600/80"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600/80"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600/80"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

SignBoardPreview.displayName = 'SignBoardPreview';

export default SignBoardPreview;
