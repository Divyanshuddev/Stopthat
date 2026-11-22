import React, { useState, useEffect, useRef } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import confetti from 'canvas-confetti';
import { 
  Share2, Download, Copy, Check, MessageCircle, 
  Send, Sparkles, RefreshCw, Flame, ExternalLink, Heart
} from 'lucide-react';

import Navbar from './components/Navbar';
import SignBoardPreview from './components/SignBoardPreview';
import SignEditor from './components/SignEditor';
import SocialShareModal from './components/SocialShareModal';
import CommunityGallery from './components/CommunityGallery';
import Toast from './components/Toast';
import { RANDOM_NAMES, getRandomName } from './constants/names';
import { apiUrl } from './config/api';

const HEADLINE_OPTIONS = ["STOP", "I QUIT", "NO MORE", "CAN WE PLEASE", "NEVER AGAIN", "YIELD"];

const DEFAULT_SIGN = {
  headline: 'STOP',
  message: 'SCHEDULING MEETINGS THAT COULD BE A 2-LINE EMAIL',
  subnote: 'If there is no agenda, I am declining with zero guilt.',
  author: getRandomName(),
  category: 'Work & Career',
  shape: 'octagon',
  theme: 'classicRed',
  font: 'display',
  aspectRatio: '1:1',
  tilt: 0,
  holder: 'none',
  stickers: ['APPROVED', '100% TRUTH'],
  showWatermark: true,
  likes: 42,
};

const RANDOM_IDEAS = [
  { headline: "STOP", text: "SCHEDULING 8:30 AM STANDUP MEETINGS", sub: "My brain does not boot up until 10 AM." },
  { headline: "I QUIT", text: "REPLYING TO SLACK MESSAGES AFTER 6 PM", sub: "Your emergency is not my overtime." },
  { headline: "PLEASE STOP", text: "SENDING 4-MINUTE VOICE NOTES WITH 10 SECONDS OF INFO", sub: "I am not listening to a podcast about your lunch." },
  { headline: "NO MORE", text: "SPLITTING BILLS EVENLY WHEN I ONLY HAD WATER", sub: "Your 3 cocktails are on you, bestie." },
  { headline: "STOP ASKING", text: "'WHEN ARE YOU GETTING MARRIED?' AT EVERY WEDDING", sub: "Do you want me to ask when your funeral is?" },
  { headline: "I REFUSE", text: "TO FEEL GUILTY FOR CANCELING PLANS TO ROT IN BED", sub: "My social battery is at 0%. Couch mode activated." },
  { headline: "STOP", text: "SAYING YES WHEN MY SOUL IS SCREAMING NO", sub: "Protecting my peace is non-negotiable." },
  { headline: "CAN WE PLEASE", text: "STOP WALKING 4-PEOPLE ABREAST ON THE SIDEWALK", sub: "Some of us have places to be." },
];

// Custom Skull Face Confetti Trigger
const shootSkullConfetti = (origin = { y: 0.5 }) => {
  try {
    if (typeof confetti.shapeFromText === 'function' && typeof OffscreenCanvas !== 'undefined') {
      const skull = confetti.shapeFromText({ text: '💀', scalar: 2.5 });
      confetti({
        shapes: [skull],
        particleCount: 24,
        spread: 60,
        origin,
        scalar: 2.4,
        ticks: 180,
        gravity: 0.85,
      });
      return;
    }
  } catch (err) {}
  confetti({ particleCount: 20, spread: 45, origin });
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light theme as requested!
  const [formData, setFormData] = useState(DEFAULT_SIGN);
  const [signs, setSigns] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeView, setActiveView] = useState('studio'); // 'studio' | 'feed'
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState('All');
  const [gallerySort, setGallerySort] = useState('trending');
  const [isLoadingSigns, setIsLoadingSigns] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchSigns();

    const urlParams = new URLSearchParams(window.location.search);
    const signId = urlParams.get('sign');
    if (signId) {
      loadSignFromUrl(signId);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(apiUrl('/api/stats'));
      if (res.ok) setStats(await res.json());
    } catch (err) {}
  };

  const fetchSigns = async (cat = galleryCategory, sort = gallerySort) => {
    setIsLoadingSigns(true);
    try {
      const query = new URLSearchParams();
      if (cat && cat !== 'All') query.append('category', cat);
      if (sort) query.append('sort', sort);
      const res = await fetch(apiUrl(`/api/signs?${query.toString()}`));
      if (res.ok) {
        const data = await res.json();
        setSigns(data.signs || []);
      }
    } catch (err) {} finally {
      setIsLoadingSigns(false);
    }
  };

  const loadSignFromUrl = async (id) => {
    try {
      const res = await fetch(apiUrl(`/api/signs/${id}`));
      if (res.ok) {
        const sign = await res.json();
        setFormData(sign);
        setActiveView('studio');
        showToast(`Loaded: "${sign.message}"`);
      }
    } catch (err) {}
  };

  // Cycle headline directly from the card
  const handleHeadlineCycle = () => {
    const idx = HEADLINE_OPTIONS.indexOf(formData.headline);
    const next = HEADLINE_OPTIONS[(idx + 1) % HEADLINE_OPTIONS.length];
    setFormData(prev => ({ ...prev, headline: next }));
  };

  // Like / agree directly on card
  const handleLikeToggle = async () => {
    if (isLiked) return;
    setIsLiked(true);
    setFormData(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    if (formData.id) {
      try {
        await fetch(apiUrl(`/api/signs/${formData.id}/like`), { method: 'POST' });
        fetchStats();
      } catch (e) {}
    }
  };

  // Quick Random Idea Shuffle (Shoots Skull Face Confetti)
  const handleShuffleIdea = () => {
    const random = RANDOM_IDEAS[Math.floor(Math.random() * RANDOM_IDEAS.length)];
    const nextName = getRandomName(formData.author);
    setFormData(prev => ({
      ...prev,
      headline: random.headline,
      message: random.text,
      subnote: random.sub,
      author: nextName,
    }));
    shootSkullConfetti({ y: 0.45 });
  };

  // 1-Click Randomize Name
  const handleRandomizeName = () => {
    const nextName = getRandomName(formData.author);
    setFormData(prev => ({ ...prev, author: nextName }));
    showToast(`🎲 Random name: "${nextName}"`);
    confetti({ particleCount: 18, spread: 45, origin: { y: 0.6 } });
  };

  // Save & Publish
  const handleSaveAndPublish = async () => {
    try {
      const res = await fetch(apiUrl('/api/signs'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const saved = await res.json();
        setFormData(saved);
        const newUrl = `${window.location.pathname}?sign=${saved.id}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        fetchSigns();
        fetchStats();
        return saved;
      }
    } catch (err) {}
    return formData;
  };

  // Direct 1-Click WhatsApp Share
  const handleWhatsAppShare = async () => {
    const sign = await handleSaveAndPublish();
    const url = `${window.location.origin}?sign=${sign.id || 'draft'}`;
    const text = encodeURIComponent(`🛑 "${sign.headline}: ${sign.message}"\n\n${sign.subnote ? `"${sign.subnote}"\n\n` : ''}Check my protest sign: ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    showToast('Opening WhatsApp...');
  };

  // Direct 1-Click X (Twitter) Share
  const handleTwitterShare = async () => {
    const sign = await handleSaveAndPublish();
    const url = `${window.location.origin}?sign=${sign.id || 'draft'}`;
    const text = encodeURIComponent(`🛑 "${sign.headline}: ${sign.message}"\n\nCheck my sign:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}&hashtags=StopDoingThis,Boundaries,Signboard`, '_blank');
    showToast('Opening X (Twitter)...');
  };

  // Direct 1-Click Instagram Story Export (Copies caption & downloads image)
  const handleInstagramShare = async () => {
    await handleSaveAndPublish();
    const url = `${window.location.origin}?sign=${formData.id || 'draft'}`;
    const caption = `🛑 "${formData.headline}: ${formData.message}"\n\n${formData.subnote ? `"${formData.subnote}"\n\n` : ''}Design yours: ${url}\n\n#StopDoingThis #Boundaries #SayNo #StopThat`;
    navigator.clipboard.writeText(caption);
    showToast('Instagram caption copied! Downloading image...');
    await handleDownloadImage('png');
  };

  // Direct Copy Link
  const handleCopyLink = async () => {
    const sign = await handleSaveAndPublish();
    const url = `${window.location.origin}?sign=${sign.id || 'draft'}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    showToast('Direct link copied to clipboard!');
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.65 } });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Image Export handler
  const handleDownloadImage = async (format = 'png') => {
    const node = document.getElementById('signboard-export-container');
    if (!node) return;
    setIsExporting(true);
    try {
      const options = { quality: 0.95, pixelRatio: 2.5, cacheBust: true };
      const dataUrl = format === 'jpeg' ? await toJpeg(node, options) : await toPng(node, options);
      const link = document.createElement('a');
      link.download = `stop-that-${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();
      showToast(`Downloaded as ${format.toUpperCase()}! 🎉`);
      confetti({ particleCount: 35, spread: 55, origin: { y: 0.7 } });
    } catch (e) {
      showToast('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRemix = (sign) => {
    setFormData({ ...sign, id: null, likes: 1 });
    setActiveView('studio');
    showToast('Loaded sign into editor!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden ${
      isDarkMode 
        ? 'dark bg-[#05060a] text-slate-100' 
        : 'bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-slate-800'
    }`}>
      {/* ATMOSPHERIC GLOWING AURA BACKGROUND (Matches uploaded reference image) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Right Fiery Sunset Orange Glow */}
        <div className={`absolute -top-36 right-0 w-[580px] h-[580px] rounded-full blur-[130px] ${
          isDarkMode 
            ? 'bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent' 
            : 'bg-gradient-to-br from-orange-500/18 via-amber-400/12 to-transparent'
        }`} />
        
        {/* Bottom-Left Deep Violet/Purple Glow */}
        <div className={`absolute top-[30%] -left-36 w-[620px] h-[620px] rounded-full blur-[130px] ${
          isDarkMode 
            ? 'bg-gradient-to-tr from-purple-600/22 via-indigo-600/15 to-transparent' 
            : 'bg-gradient-to-tr from-purple-500/16 via-indigo-400/10 to-transparent'
        }`} />

        {/* Subtle Cyan Bottom Glow */}
        <div className={`absolute -bottom-36 right-1/4 w-[500px] h-[500px] rounded-full blur-[110px] ${
          isDarkMode ? 'bg-cyan-500/15' : 'bg-sky-400/12'
        }`} />
      </div>

      {/* Minimal Header */}
      <Navbar
        stats={stats}
        activeView={activeView}
        setActiveView={setActiveView}
        onRandomTemplate={handleShuffleIdea}
        onOpenNewSign={() => {
          setFormData(DEFAULT_SIGN);
          setActiveView('studio');
          showToast('Fresh signboard draft ready!');
        }}
        onShareClick={() => setIsShareModalOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main App Body */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        {/* VIEW 1: CREATOR HERO (MINIMAL, AWESOME & FOCUSED) */}
        {activeView === 'studio' && (
          <div className="w-full flex flex-col items-center space-y-6 animate-in fade-in duration-300">
            {/* Minimal Title */}
            <div className="text-center space-y-1">
              <h1 className={`text-2xl sm:text-3xl font-black font-display tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Stop Doing Things You Dislike.
              </h1>
              <p className={`text-xs sm:text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500 font-medium'
              }`}>
                Raise your personal protest signboard & share it with your friends.
              </p>
            </div>

            {/* THE CENTERPIECE: THE GLOWING GLASS SIGNBOARD */}
            <div className="w-full flex justify-center py-2">
              <SignBoardPreview
                headline={formData.headline}
                message={formData.message}
                subnote={formData.subnote}
                author={formData.author}
                shape={formData.shape || 'octagon'}
                theme={formData.theme}
                font={formData.font}
                aspectRatio={formData.aspectRatio}
                onHeadlineClick={handleHeadlineCycle}
                onLikeToggle={handleLikeToggle}
                isLiked={isLiked}
                likeCount={formData.likes || 1}
              />
            </div>

            {/* 1-CLICK SOCIAL SHARING DOCK (Fast, direct, essential) */}
            <div className={`flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full shadow-lg transition-colors ${
              isDarkMode 
                ? 'glass-panel shadow-2xl' 
                : 'bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)]'
            }`}>
              {/* WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </button>

              {/* X (Twitter) */}
              <button
                type="button"
                onClick={handleTwitterShare}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 ${
                  isDarkMode 
                    ? 'bg-white/5 hover:bg-white/10 text-white border border-white/15' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 shadow-sm'
                }`}
              >
                <span className="font-mono text-xs">𝕏</span>
                <span>Post</span>
              </button>

              {/* Instagram */}
              <button
                type="button"
                onClick={handleInstagramShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 hover:from-orange-500/20 hover:to-purple-500/20 text-pink-600 dark:text-pink-300 border border-pink-500/30 text-xs font-bold transition-all hover:scale-105 active:scale-95"
              >
                <span>📸</span>
                <span>Instagram</span>
              </button>

              {/* Download PNG */}
              <button
                type="button"
                disabled={isExporting}
                onClick={() => handleDownloadImage('png')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full btn-aura text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting ? 'Saving...' : 'Download'}</span>
              </button>

              {/* Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105 border ${
                  isDarkMode 
                    ? 'glass-panel hover:bg-white/10 text-slate-300' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
                }`}
                title="Copy shareable link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* MINIMAL CONTROL CENTER (Statement inputs, themes, quick chips) */}
            <div className="w-full pt-2">
              <SignEditor
                formData={formData}
                setFormData={setFormData}
                onReset={() => setFormData(DEFAULT_SIGN)}
                onRandomizeName={handleRandomizeName}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: COMMUNITY FEED (MINIMAL GRID) */}
        {activeView === 'feed' && (
          <div className="w-full animate-in fade-in duration-300">
            <CommunityGallery
              signs={signs}
              isLoading={isLoadingSigns}
              onLikeSign={(id) => {
                fetch(apiUrl(`/api/signs/${id}/like`), { method: 'POST' });
                setSigns(prev => prev.map(s => s.id === id ? { ...s, likes: (s.likes || 0) + 1 } : s));
              }}
              onRemixSign={handleRemix}
              onOpenShareModal={(s) => {
                setFormData(s);
                setIsShareModalOpen(true);
              }}
              selectedCategory={galleryCategory}
              setSelectedCategory={(cat) => {
                setGalleryCategory(cat);
                fetchSigns(cat, gallerySort);
              }}
              sortOption={gallerySort}
              setSortOption={(sort) => {
                setGallerySort(sort);
                fetchSigns(galleryCategory, sort);
              }}
              onRefresh={() => fetchSigns(galleryCategory, gallerySort)}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </main>

      {/* Full Social Modal if opened */}
      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        signData={formData}
        onDownloadImage={handleDownloadImage}
        isDownloading={isExporting}
        showToast={showToast}
        isDarkMode={isDarkMode}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
