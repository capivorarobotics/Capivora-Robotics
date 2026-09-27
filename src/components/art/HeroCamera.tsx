// Placeholder product render (inline SVG). Swap the body of this component for
// <Image src="/images/hero-camera.avif" … /> once real photography exists.

const ringTicks = Array.from({ length: 19 }, (_, i) => 698 + i * 6);
const scaleTicks = Array.from({ length: 9 }, (_, i) => 830 + i * 4.5);
const vents = Array.from({ length: 9 }, (_, i) => 250 + i * 26);

function Ring({ x, w, hh, fill, cy = 495 }: { x: number; w: number; hh: number; fill: string; cy?: number }) {
  return (
    <g>
      <rect x={x} y={cy - hh} width={w} height={hh * 2} rx="2" fill={`url(#${fill})`} />
      <rect x={x + 1} y={cy - hh + hh * 0.2} width={w - 2} height="2" fill="#fff" opacity={fill === "metalV" ? 0.7 : 0.16} />
      <rect x={x} y={cy - hh} width="1.5" height={hh * 2} fill="#000" opacity="0.35" />
    </g>
  );
}

export default function HeroCamera() {
  return (
    <svg viewBox="90 -60 910 855" className="h-full w-full" role="img" aria-label="Industrial machine-vision camera with lens, mounted to the wrist of a robotic arm" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="metalV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7f6f2" />
          <stop offset=".2" stopColor="#dedcd6" />
          <stop offset=".55" stopColor="#b3b1aa" />
          <stop offset=".85" stopColor="#8a8882" />
          <stop offset="1" stopColor="#c2c0b9" />
        </linearGradient>
        <linearGradient id="darkV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d4d4b" />
          <stop offset=".14" stopColor="#30302f" />
          <stop offset=".6" stopColor="#1a1a19" />
          <stop offset="1" stopColor="#0d0d0c" />
        </linearGradient>
        <linearGradient id="bodyV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#403f3d" />
          <stop offset=".07" stopColor="#2b2b2a" />
          <stop offset=".6" stopColor="#191918" />
          <stop offset="1" stopColor="#0f0f0e" />
        </linearGradient>
        <linearGradient id="armH" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8e8c86" />
          <stop offset=".28" stopColor="#dddbd5" />
          <stop offset=".46" stopColor="#f7f6f2" />
          <stop offset=".78" stopColor="#c0beb7" />
          <stop offset="1" stopColor="#86847e" />
        </linearGradient>
        <linearGradient id="darkH" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#10100f" />
          <stop offset=".3" stopColor="#3b3b39" />
          <stop offset=".5" stopColor="#2a2a29" />
          <stop offset="1" stopColor="#0b0b0a" />
        </linearGradient>
        <radialGradient id="glass" cx=".35" cy=".4" r=".8">
          <stop offset="0" stopColor="#2a3540" />
          <stop offset=".5" stopColor="#0d1116" />
          <stop offset="1" stopColor="#050607" />
        </radialGradient>
        <filter id="soft" x="-50%" y="-150%" width="200%" height="400%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      {/* cast shadow on the backdrop */}
      <rect x="230" y="450" width="720" height="200" rx="60" fill="#000" opacity=".13" filter="url(#soft)" transform="translate(30 60)" />

      {/* cable + rear connector */}
      <path d="M132 495 C 84 495 60 530 44 610 S 10 730 -30 770" fill="none" stroke="#141413" strokeWidth="28" strokeLinecap="round" />
      <path d="M126 486 C 82 488 58 522 42 602 S 6 722 -34 762" fill="none" stroke="#fff" strokeOpacity=".09" strokeWidth="4" strokeLinecap="round" />
      <rect x="128" y="452" width="46" height="86" rx="4" fill="url(#darkV)" />
      <rect x="128" y="452" width="46" height="86" rx="4" fill="none" stroke="#fff" strokeOpacity=".08" />
      {[...Array(8)].map((_, i) => (
        <rect key={i} x={142 + i * 3.6} y="456" width="1" height="78" fill="#000" opacity=".5" />
      ))}

      {/* robot arm: link, joint housing, flange, bracket */}
      <rect x="548" y="-40" width="118" height="240" fill="url(#armH)" />
      <rect x="548" y="150" width="118" height="1.5" fill="#000" opacity=".18" />
      <rect x="536" y="200" width="142" height="70" rx="6" fill="url(#darkH)" />
      <rect x="536" y="226" width="142" height="1.5" fill="#fff" opacity=".1" />
      <rect x="536" y="246" width="142" height="1.5" fill="#000" opacity=".5" />
      <rect x="520" y="270" width="174" height="20" rx="3" fill="url(#armH)" />
      <rect x="520" y="288" width="174" height="2" fill="#000" opacity=".25" />
      <path d="M566 290 H 650 L 690 382 H 526 Z" fill="url(#darkH)" />
      <path d="M566 290 H 650" stroke="#fff" strokeOpacity=".12" />
      {[590, 626].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="346" r="6.5" fill="url(#metalV)" />
          <path d={`M${cx - 4} 346 H${cx + 4}`} stroke="#000" strokeOpacity=".5" strokeWidth="1.5" />
        </g>
      ))}

      {/* camera body */}
      <rect x="170" y="380" width="480" height="230" rx="26" fill="url(#bodyV)" />
      <path d="M196 381 H 624" stroke="#fff" strokeOpacity=".22" strokeWidth="1.5" />
      <rect x="190" y="402" width="440" height="186" rx="16" fill="none" stroke="#fff" strokeOpacity=".055" />
      {/* printed brand on the housing (white logo) */}
      <image href="/brand/capivora-logo-white.png" x="204" y="422" width="152" height="45" opacity=".72" preserveAspectRatio="xMinYMid meet" />
      <circle cx="604" cy="428" r="9" fill="#f4c20d" opacity=".2" />
      <circle cx="604" cy="428" r="3.6" fill="#f4c20d" />
      {vents.map((x) => (
        <g key={x}>
          <rect x={x} y="538" width="8" height="40" rx="4" fill="#070707" />
          <rect x={x} y="574" width="8" height="2" rx="1" fill="#fff" opacity=".1" />
        </g>
      ))}

      {/* lens */}
      <Ring x={650} w={40} hh={100} fill="metalV" />
      <Ring x={690} w={120} hh={94} fill="darkV" />
      {ringTicks.map((x) => (
        <rect key={x} x={x} y={495 - 86} width="1.4" height="172" fill="#fff" opacity=".09" />
      ))}
      <Ring x={810} w={12} hh={86} fill="darkV" />
      <Ring x={822} w={52} hh={88} fill="metalV" />
      {scaleTicks.map((x, i) => (
        <rect key={x} x={x} y={495 - 88 + 10} width="1" height={i % 2 ? 9 : 14} fill="#111" opacity=".55" />
      ))}
      <Ring x={874} w={58} hh={72} fill="darkV" />
      <Ring x={932} w={16} hh={66} fill="metalV" />
      <ellipse cx="948" cy="495" rx="12" ry="60" fill="url(#glass)" />
      <ellipse cx="948" cy="495" rx="12" ry="60" fill="none" stroke="#000" strokeOpacity=".5" />
      <path d="M944 462 Q 952 480 946 508" stroke="#9fb4c4" strokeOpacity=".35" strokeWidth="2" fill="none" />
    </svg>
  );
}
