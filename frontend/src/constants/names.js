export const RANDOM_NAMES = [
  "Alex (Exhausted Bestie)",
  "Jordan (Zero Guilt)",
  "Sam (Overthinking Daily)",
  "Taylor (Boundary Pro)",
  "Casey (Battery at 2%)",
  "Morgan (No More Yes-Man)",
  "Riley (Couch Potato)",
  "Priya (Do Not Disturb)",
  "Chris (Email Only Please)",
  "Jamie (Done With Meetings)",
  "Samir (Peace Over Drama)",
  "Quiet Quitter",
  "Your Sarcastic Friend",
  "A Tired Rebel",
  "Dev (Decline All)",
  "A Professional Decliner",
  "Maya (Protecting My Peace)",
  "Marcus (Off The Clock)",
  "Elena (Unbothered)",
  "Zen Decliner",
  "Burnt-Out Overachiever",
  "Robin (Anti-Chaos)",
  "Dakota (Reclaiming Weekends)",
  "Polite Decliner"
];

export const getRandomName = (current = '') => {
  const pool = RANDOM_NAMES.filter(n => n !== current);
  return pool[Math.floor(Math.random() * pool.length)] || RANDOM_NAMES[0];
};
