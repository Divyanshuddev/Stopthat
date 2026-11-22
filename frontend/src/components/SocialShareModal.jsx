import React, { useState } from 'react';
import { 
  X, Check, Copy, Download, Share2, MessageCircle, 
  Send, ExternalLink, Sparkles, Instagram, Linkedin, Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SocialShareModal({
  isOpen,
  onClose,
  signData,
  onDownloadImage,
  isDownloading,
  showToast,
  isDarkMode = false
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  if (!isOpen || !signData) return null;

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}?sign=${signData.id || 'draft'}`
    : `https://stopthat.app?sign=${signData.id || 'draft'}`;

  const shareTitle = `${signData.headline || 'STOP'}: ${signData.message || 'Saying No'}`;
  const shareCaption = `🛑 I just raised my official Stop Signboard: "${signData.headline}: ${signData.message}"!\n\n${signData.subnote ? `"${signData.subnote}"\n\n` : ''}Design your own protest sign and stop doing things you hate: ${shareUrl}\n\n#StopDoingThis #Boundaries #SayNo #Signboard #StopThat`;

  const encodedText = encodeURIComponent(`🛑 "${signData.headline}: ${signData.message}"\n\nCheck my sign or make your own: ${shareUrl}`);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`🛑 ${signData.headline}: ${signData.message}`);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`🛑 "${signData.headline}: ${signData.message}"\n\nCheck my sign:`)}&url=${encodedUrl}&hashtags=StopDoingThis,Boundaries,Signboard`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    showToast('Link copied to clipboard! Share it with anyone.');
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(shareCaption);
    setCopiedCaption(true);
    showToast('Instagram caption copied! Ready to paste into your post.');
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `🛑 ${signData.headline}: ${signData.message} — ${signData.subnote || ''}`,
          url: shareUrl,
        });
        showToast('Shared successfully!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl transition-all ${
        isDarkMode 
          ? 'glass-panel text-white shadow-[0_0_70px_rgba(255,107,0,0.25)]' 
          : 'bg-white/95 border border-slate-200 text-slate-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]'
      }`}>
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-5 border-b ${
          isDarkMode ? 'border-white/[0.08] bg-[#070810]/70' : 'border-slate-100 bg-slate-50/80'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
              🛑
            </div>
            <div>
              <h3 className={`text-base sm:text-lg font-bold font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Share Your Signboard
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Let your friends & followers know why you're stopping!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDarkMode 
                ? 'bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          {/* Quick Sign Summary Badge */}
          <div className={`p-3.5 rounded-2xl flex items-center gap-3 border ${
            isDarkMode ? 'glass-panel' : 'bg-slate-50/80 border-slate-200/80'
          }`}>
            <span className="text-2xl">📢</span>
            <div className="flex-1 min-w-0">
              <span className="text-orange-500 font-bold uppercase text-xs tracking-wider block">
                {signData.headline}
              </span>
              <p className={`text-sm font-extrabold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {signData.message}
              </p>
            </div>
          </div>

          {/* Social Media Sharing Grid */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              1-Click Share to Social Media
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* WhatsApp */}
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => showToast('Opening WhatsApp...')}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 transition-all hover:scale-[1.02] group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className={`text-xs font-bold group-hover:text-emerald-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>WhatsApp</div>
                  <div className="text-[10px] text-emerald-500/80">Chat & Status</div>
                </div>
              </a>

              {/* X (Twitter) */}
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => showToast('Opening X (Twitter)...')}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all hover:scale-[1.02] group ${
                  isDarkMode 
                    ? 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200' 
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-900 text-white shadow-sm'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-md font-bold text-sm">
                  𝕏
                </div>
                <div>
                  <div className="text-xs font-bold text-white">X (Twitter)</div>
                  <div className="text-[10px] text-slate-400">Post Tweet</div>
                </div>
              </a>

              {/* Instagram Card */}
              <button
                type="button"
                onClick={async () => {
                  handleCopyCaption();
                  await onDownloadImage('png');
                }}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-gradient-to-br from-pink-600/10 to-purple-600/10 hover:from-pink-600/20 hover:to-purple-600/20 border border-pink-500/30 text-pink-600 dark:text-pink-300 transition-all hover:scale-[1.02] text-left group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-bold group-hover:text-pink-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Instagram</div>
                  <div className="text-[10px] text-pink-500/80">Save & Caption</div>
                </div>
              </button>

              {/* LinkedIn */}
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-sky-600/10 hover:bg-sky-600/20 border border-sky-500/30 text-sky-600 dark:text-sky-300 transition-all hover:scale-[1.02] group"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-bold group-hover:text-sky-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>LinkedIn</div>
                  <div className="text-[10px] text-sky-500/80">Work Boundary</div>
                </div>
              </a>

              {/* Telegram */}
              <a
                href={shareLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-cyan-600/10 hover:bg-cyan-600/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 transition-all hover:scale-[1.02] group"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500 text-white flex items-center justify-center shadow-md">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-bold group-hover:text-cyan-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Telegram</div>
                  <div className="text-[10px] text-cyan-500/80">Send to Friends</div>
                </div>
              </a>

              {/* Native Mobile Share Sheet */}
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-600 dark:text-orange-300 transition-all hover:scale-[1.02] text-left group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white flex items-center justify-center shadow-md">
                  <Share2 className="w-4 h-4 font-bold" />
                </div>
                <div>
                  <div className={`text-xs font-bold group-hover:text-orange-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>More Apps</div>
                  <div className="text-[10px] text-orange-500/80">System Share</div>
                </div>
              </button>
            </div>
          </div>

          {/* Download High Resolution Image Section */}
          <div className={`p-4 rounded-2xl space-y-3 border ${
            isDarkMode ? 'glass-panel' : 'bg-slate-50/90 border-slate-200'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <Download className="w-4 h-4 text-orange-500" /> Download High-Resolution Image
            </h4>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                disabled={isDownloading}
                onClick={() => onDownloadImage('png')}
                className="flex-1 min-w-[140px] py-2.5 px-4 btn-aura text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Exporting...' : 'Download PNG'}</span>
              </button>

              <button
                type="button"
                disabled={isDownloading}
                onClick={() => onDownloadImage('jpeg')}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 border ${
                  isDarkMode ? 'glass-panel text-slate-200 hover:bg-white/10' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
                }`}
              >
                <span>Download JPG</span>
              </button>

              <button
                type="button"
                onClick={handleCopyCaption}
                className={`py-2.5 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border ${
                  isDarkMode ? 'glass-panel text-slate-200 hover:bg-white/10' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
                }`}
                title="Copy caption for Instagram"
              >
                {copiedCaption ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCaption ? 'Caption Copied!' : 'Copy Caption'}</span>
              </button>
            </div>
          </div>

          {/* Copy Direct Shareable Link */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Direct Signboard Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className={`flex-1 rounded-xl px-3.5 py-2.5 text-xs font-mono truncate focus:outline-none border ${
                  isDarkMode ? 'glass-input' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border ${
                  isDarkMode ? 'glass-panel text-white hover:bg-white/15' : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                }`}
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t text-center text-xs flex items-center justify-center gap-1 ${
          isDarkMode ? 'bg-[#070810]/80 border-white/[0.08] text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-600'
        }`}>
          <span>Remember:</span>
          <span className="text-orange-500 font-bold">Every "NO" to what you dislike is a "YES" to your peace of mind.</span>
        </div>
      </div>
    </div>
  );
}
