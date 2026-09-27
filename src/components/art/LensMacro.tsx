// Placeholder macro render of a lens, front-on. Replace with real macro photography later.

const knurl = Array.from({ length: 144 }, (_, i) => (i * 360) / 144);
const coatings: [number, string, number][] = [
  [318, "#3b2a1c", 0.55],
  [262, "#1c2c36", 0.6],
  [204, "#2f1f33", 0.35],
  [146, "#1a2f2b", 0.4],
];

export default function LensMacro() {
  return (
    <svg viewBox="0 0 1200 1200" className="h-full w-full" role="img" aria-label="Close-up of a precision camera lens" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="barrel" cx=".5" cy=".5" r=".5">
          <stop offset=".86" stopColor="#141413" />
          <stop offset=".96" stopColor="#242422" />
          <stop offset="1" stopColor="#0a0a09" />
        </radialGradient>
        <linearGradient id="silver" x1=".1" y1="0" x2=".9" y2="1">
          <stop offset="0" stopColor="#f0efea" />
          <stop offset=".3" stopColor="#8d8b85" />
          <stop offset=".55" stopColor="#d6d4ce" />
          <stop offset=".8" stopColor="#77756f" />
          <stop offset="1" stopColor="#b9b7b0" />
        </linearGradient>
        <radialGradient id="glassBase" cx=".4" cy=".38" r=".75">
          <stop offset="0" stopColor="#1c2732" />
          <stop offset=".55" stopColor="#090c10" />
          <stop offset="1" stopColor="#030405" />
        </radialGradient>
        <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".16" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="glassClip"><circle cx="600" cy="600" r="352" /></clipPath>
        <path id="engrave" d="M 600 600 m -438 0 a 438 438 0 1 1 876 0 a 438 438 0 1 1 -876 0" />
      </defs>

      <circle cx="600" cy="600" r="596" fill="url(#barrel)" />
      {knurl.map((a) => (
        <line key={a} x1="600" y1="12" x2="600" y2="70" stroke="#fff" strokeOpacity={a % 10 === 0 ? 0.14 : 0.06} strokeWidth="2" transform={`rotate(${a} 600 600)`} />
      ))}
      <circle cx="600" cy="600" r="522" fill="none" stroke="#000" strokeOpacity=".7" strokeWidth="3" />
      <circle cx="600" cy="600" r="506" fill="#0c0c0b" />
      <circle cx="600" cy="600" r="506" fill="none" stroke="url(#silver)" strokeWidth="10" opacity=".85" />
      <circle cx="600" cy="600" r="466" fill="#111110" />
      <text fill="#fff" fillOpacity=".38" fontSize="21" letterSpacing="9" fontFamily="var(--font-archivo), sans-serif" fontWeight="500">
        <textPath href="#engrave" startOffset="3%">CAPIVORA ROBOTICS · VISION SYSTEM V2.3 · CAPIVORA ROBOTICS ·</textPath>
      </text>
      <circle cx="600" cy="600" r="404" fill="none" stroke="url(#silver)" strokeWidth="18" />
      <circle cx="600" cy="600" r="388" fill="#050505" />
      <circle cx="600" cy="600" r="372" fill="none" stroke="#000" strokeWidth="4" />

      <circle cx="600" cy="600" r="352" fill="url(#glassBase)" />
      <g clipPath="url(#glassClip)">
        {coatings.map(([r, c, o]) => (
          <circle key={r} cx="600" cy="600" r={r} fill="none" stroke={c} strokeWidth="22" opacity={o} />
        ))}
        <circle cx="600" cy="600" r="352" fill="none" stroke="#000" strokeWidth="24" opacity=".6" />
        <circle cx="600" cy="600" r="70" fill="#020203" stroke="#1a2027" strokeWidth="3" />
        {/* reflections */}
        <path d="M330 470 A 300 300 0 0 1 500 330 A 250 250 0 0 0 330 470 Z" fill="#fff" opacity=".2" />
        <circle cx="742" cy="742" r="14" fill="#fff" opacity=".22" />
        <circle cx="742" cy="742" r="34" fill="none" stroke="#b7d0e0" strokeOpacity=".14" strokeWidth="2" />
        <g className="sweep">
          <rect x="420" y="200" width="140" height="800" fill="url(#streak)" transform="rotate(24 600 600)" />
        </g>
      </g>
    </svg>
  );
}
