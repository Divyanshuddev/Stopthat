import React from 'react';
import { ShieldCheck, HeartHandshake, Smile, BatteryCharging, ArrowRight } from 'lucide-react';

export default function ManifestoSection({ onStartCreating }) {
  const principles = [
    {
      icon: BatteryCharging,
      title: "The Energy Conservation Law",
      subtitle: "Saying YES when you mean NO is an energy loan you pay with interest.",
      description: "When you attend that awkward party, agree to unpaid weekend revisions, or nod along to bad advice, you're not being nice — you're exhausting yourself. Protecting your time is basic self-care."
    },
    {
      icon: Smile,
      title: "Humor Is The Best Boundary",
      subtitle: "Protest with a grin instead of resentment.",
      description: "Holding up a custom glassy sign or texting a funny custom billboard breaks the awkward tension instantly. Friends laugh, get the point immediately, and respect your boundary without drama."
    },
    {
      icon: ShieldCheck,
      title: "Stop Normalizing The Nonsense",
      subtitle: "4-minute voice notes, meetings for emails, toxic comparisons.",
      description: "Everyone hates these things, but everyone stays quiet because 'that's how things are.' Your sign gives voice to what the entire room was secretly wishing someone would say out loud."
    },
    {
      icon: HeartHandshake,
      title: "Clarity Is Kindness",
      subtitle: "Ghosting hurts. A clean, honest boundary heals.",
      description: "When you are transparent about what you don't want to do, you build authentic friendships. Real friends never want you doing things that make you miserable."
    }
  ];

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-10 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3 mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-orange-500/15 text-orange-300 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
          The Manifesto
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-display">
          Why You Must Stop Doing Things You Don't Like
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Life is too short to eat food you hate, stay on calls that drain you, or pretend to care about things you don't. Here is why raising your signboard changes everything.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {principles.map((pr, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl glass-surface border border-white/[0.08] hover:border-orange-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500/20 to-purple-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center mb-3">
                <pr.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 font-display mb-1">
                {pr.title}
              </h3>
              <p className="text-xs font-semibold text-orange-300/90 mb-2">
                "{pr.subtitle}"
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {pr.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center pt-2">
        <button
          type="button"
          onClick={onStartCreating}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl btn-aura text-white font-black text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <span>Create Your Personal Stop Sign Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
