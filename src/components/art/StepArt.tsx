// Placeholder technical renders for the See / Understand / Act cards (800 × 1000).
// Replace each with photography when available.

const svgProps = {
  viewBox: "0 0 800 1000",
  className: "h-full w-full",
  preserveAspectRatio: "xMidYMid slice" as const,
  role: "img" as const,
};

const Bg = ({ id }: { id: string }) => (
  <>
    <defs>
      <linearGradient id={`${id}Bg`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--art-bg-a)" />
        <stop offset="1" stopColor="var(--art-bg-b)" />
      </linearGradient>
      <linearGradient id={`${id}Metal`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f3f2ee" />
        <stop offset=".45" stopColor="#b4b2ab" />
        <stop offset="1" stopColor="#dedcd6" />
      </linearGradient>
      <linearGradient id={`${id}Dark`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#0f0f0e" />
        <stop offset=".35" stopColor="#3a3a38" />
        <stop offset="1" stopColor="#111110" />
      </linearGradient>
      <filter id={`${id}Blur`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14" /></filter>
    </defs>
    <rect width="800" height="1000" fill={`url(#${id}Bg)`} />
  </>
);

const pins = Array.from({ length: 14 }, (_, i) => 212 + i * 28);

export function SeeArt() {
  return (
    <svg {...svgProps} aria-label="Close-up of an image sensor package">
      <Bg id="see" />
      <defs>
        <pattern id="px" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#12181e" />
          <rect x=".6" y=".6" width="6.8" height="6.8" fill="#1b232b" />
          <rect x="4.6" y="4.6" width="3" height="3" fill="#24303a" />
        </pattern>
        <linearGradient id="glassSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset=".8" stopColor="#8fb0c8" stopOpacity=".1" />
        </linearGradient>
      </defs>
      <g transform="translate(405 525) scale(1.32) translate(-405 -525)">
<rect x="170" y="290" width="470" height="470" rx="14" fill="#000" opacity=".3" filter="url(#seeBlur)" transform="translate(16 30)" />
      {pins.map((p) => (
        <g key={p} fill="#b98a4a">
          <rect x={p} y="272" width="12" height="24" />
          <rect x={p} y="754" width="12" height="24" />
          <rect x="152" y={p + 70} width="24" height="12" />
          <rect x="634" y={p + 70} width="24" height="12" />
        </g>
      ))}
      <rect x="170" y="290" width="470" height="470" rx="12" fill="#262625" />
      <rect x="170" y="290" width="470" height="470" rx="12" fill="none" stroke="#fff" strokeOpacity=".12" />
      <rect x="210" y="330" width="390" height="390" rx="4" fill="#0c0c0b" />
      <rect x="240" y="360" width="330" height="330" fill="url(#px)" />
      <rect x="240" y="360" width="330" height="330" fill="url(#glassSheen)" />
      <rect x="240" y="360" width="330" height="330" fill="none" stroke="#000" strokeOpacity=".6" strokeWidth="2" />
      <path d="M186 306 l22 0 l-22 22 z" fill="#f5f4f0" opacity=".7" />
      </g>
    </svg>
  );
}

const iso = (cx: number, cy: number, w: number, h: number) => {
  const a = w * 0.5, b = w * 0.29;
  return {
    top: `${cx},${cy - b * 2} ${cx + a},${cy - b} ${cx},${cy} ${cx - a},${cy - b}`,
    left: `${cx - a},${cy - b} ${cx},${cy} ${cx},${cy + h} ${cx - a},${cy - b + h}`,
    right: `${cx},${cy} ${cx + a},${cy - b} ${cx + a},${cy - b + h} ${cx},${cy + h}`,
  };
};
const shapes = [iso(420, 500, 330, 190), iso(230, 780, 190, 110), iso(600, 300, 170, 100)];

export function UnderstandArt() {
  return (
    <svg {...svgProps} aria-label="Point field with three objects segmented from the background">
      <Bg id="und" />
      <defs>
        <pattern id="dotsBg" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="1.9" fill="var(--art-ink)" fillOpacity=".2" />
        </pattern>
        <pattern id="dotsFg" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="5.5" cy="5.5" r="1.9" fill="var(--art-ink)" />
        </pattern>
        <pattern id="dotsMid" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="5.5" cy="5.5" r="1.7" fill="var(--art-ink)" fillOpacity=".55" />
        </pattern>
        {shapes.map((s, i) => (
          <clipPath key={i} id={`clip${i}`}>
            <polygon points={s.top} /><polygon points={s.left} /><polygon points={s.right} />
          </clipPath>
        ))}
      </defs>
      <rect width="800" height="1000" fill="url(#dotsBg)" />
      <rect width="800" height="1000" fill="url(#dotsFg)" clipPath="url(#clip0)" />
      <rect width="800" height="1000" fill="url(#dotsMid)" clipPath="url(#clip1)" />
      <rect width="800" height="1000" fill="url(#dotsMid)" clipPath="url(#clip2)" />
      {shapes.map((s, i) => (
        <g key={i} fill="none" stroke="var(--art-ink)" strokeWidth={i ? 1 : 1.6} strokeOpacity={i ? 0.5 : 1}>
          <polygon points={s.top} /><polygon points={s.left} /><polygon points={s.right} />
        </g>
      ))}
    </svg>
  );
}

export function ActArt() {
  return (
    <svg {...svgProps} aria-label="Two-finger gripper approaching an object on a work surface">
      <Bg id="act" />
      <rect y="800" width="800" height="200" fill="var(--art-floor)" />
      <line x1="0" x2="800" y1="800" y2="800" stroke="#fff" strokeOpacity=".5" />
      <rect x="290" y="800" width="240" height="40" fill="#000" opacity=".22" filter="url(#actBlur)" />
      <rect x="300" y="690" width="210" height="110" fill="#efede7" />
      <rect x="300" y="690" width="210" height="6" fill="#fff" opacity=".6" />
      <path d="M650 110 C 650 420 405 380 405 610" fill="none" stroke="var(--art-ink)" strokeWidth="1.6" strokeDasharray="2 9" strokeLinecap="round" />
      <circle cx="405" cy="690" r="11" fill="none" stroke="var(--art-ink)" strokeWidth="2" />
      <path d="M383 690h44M405 668v44" stroke="var(--art-ink)" strokeWidth="1.5" />
      <rect x="345" y="120" width="120" height="30" rx="4" fill="#8e8c86" />
      <rect x="345" y="120" width="120" height="3" rx="1.5" fill="#fff" opacity=".5" />
      <rect x="330" y="150" width="150" height="190" rx="10" fill="url(#actDark)" />
      <rect x="330" y="200" width="150" height="2" fill="#fff" opacity=".1" />
      <circle cx="455" cy="180" r="4" fill="#f4c20d" />
      <rect x="250" y="322" width="310" height="34" rx="6" fill="url(#actDark)" />
      <rect x="262" y="340" width="40" height="250" rx="6" fill="url(#actMetal)" />
      <rect x="508" y="340" width="40" height="250" rx="6" fill="url(#actMetal)" />
      <rect x="302" y="530" width="12" height="60" fill="#1c1c1b" />
      <rect x="496" y="530" width="12" height="60" fill="#1c1c1b" />
    </svg>
  );
}
