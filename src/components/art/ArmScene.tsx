// Placeholder environment render: cobot arm with a wrist-mounted camera over a work bench.
// Replace with a real photograph of the lab / cell later.

const bolts = [652, 688, 812, 848];

const Link = ({ x, y, angle, len, w }: { x: number; y: number; angle: number; len: number; w: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <rect x="0" y={-w / 2} width={len} height={w} rx={w / 2} fill="url(#armMetal)" />
    <rect x="34" y={-w / 2 + w * 0.17} width={len - 68} height="2.5" rx="1" fill="#fff" opacity=".55" />
    <rect x="46" y={-w / 2} width="1.5" height={w} fill="#000" opacity=".14" />
    <rect x={len - 47} y={-w / 2} width="1.5" height={w} fill="#000" opacity=".14" />
    <rect x="0" y={w / 2 - 6} width={len} height="5" fill="#000" opacity=".06" />
  </g>
);

const Joint = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="url(#armDark)" />
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fff" strokeOpacity=".1" />
    <circle cx={cx} cy={cy} r={r * 0.7} fill="url(#armCap)" />
    <circle cx={cx} cy={cy} r={r * 0.7} fill="none" stroke="#000" strokeOpacity=".3" />
    <path d={`M${cx - r * 0.5} ${cy - r * 0.32} A ${r * 0.6} ${r * 0.6} 0 0 1 ${cx + r * 0.05} ${cy - r * 0.6}`} fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx={cx} cy={cy} r={r * 0.16} fill="#2a2a29" />
    <circle cx={cx} cy={cy} r={r * 0.16} fill="none" stroke="#fff" strokeOpacity=".2" />
  </g>
);

export default function ArmScene() {
  return (
    <svg viewBox="0 0 1600 800" className="h-full w-full" role="img" aria-label="Robotic arm with a camera mounted at the wrist, inspecting an object on a work bench" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="armBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--art-bg-a)" />
          <stop offset="1" stopColor="var(--art-bg-b)" />
        </linearGradient>
        <radialGradient id="armLight" cx=".62" cy=".05" r=".85">
          <stop offset="0" stopColor="#fff" stopOpacity="var(--art-light)" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="armMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8f7f3" />
          <stop offset=".24" stopColor="#dedcd6" />
          <stop offset=".62" stopColor="#aeaca5" />
          <stop offset="1" stopColor="#d2d0ca" />
        </linearGradient>
        <linearGradient id="armCap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b8984" />
          <stop offset=".5" stopColor="#4a4a48" />
          <stop offset="1" stopColor="#242423" />
        </linearGradient>
        <linearGradient id="armDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d4d4b" />
          <stop offset=".2" stopColor="#2e2e2d" />
          <stop offset=".7" stopColor="#181817" />
          <stop offset="1" stopColor="#0e0e0d" />
        </linearGradient>
        <linearGradient id="armPed" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#95938d" />
          <stop offset=".3" stopColor="#dedcd6" />
          <stop offset=".48" stopColor="#f8f7f3" />
          <stop offset=".8" stopColor="#b4b2ab" />
          <stop offset="1" stopColor="#8b8983" />
        </linearGradient>
        <linearGradient id="benchTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--art-floor-a)" />
          <stop offset="1" stopColor="var(--art-floor-b)" />
        </linearGradient>
        <linearGradient id="armCone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".34" />
          <stop offset="1" stopColor="#fff" stopOpacity=".03" />
        </linearGradient>
        <filter id="armBlur" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>

      <rect width="1600" height="800" fill="url(#armBg)" />
      <rect width="1600" height="800" fill="url(#armLight)" />

      {/* background: shelving + column */}
      <rect x="110" y="170" width="430" height="464" fill="var(--art-obj)" />
      <rect x="110" y="170" width="430" height="3" fill="#fff" opacity=".4" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="110" y={286 + i * 116} width="430" height="3" fill="var(--art-ink)" opacity=".07" />
          <rect x="140" y={236 + i * 116} width="110" height="50" fill="var(--art-ink)" opacity=".05" />
          <rect x="300" y={246 + i * 116} width="70" height="40" fill="var(--art-ink)" opacity=".05" />
        </g>
      ))}
      <rect x="1330" y="110" width="200" height="524" fill="var(--art-obj-2)" />
      <line x1="1430" x2="1430" y1="110" y2="634" stroke="var(--art-ink)" strokeOpacity=".07" />

      {/* bench */}
      <rect y="632" width="1600" height="26" fill="url(#benchTop)" />
      <rect y="632" width="1600" height="2" fill="#fff" opacity=".55" />
      <rect y="658" width="1600" height="142" fill="var(--art-floor)" />
      <rect y="658" width="1600" height="2" fill="#000" opacity=".18" />

      {/* contact shadows */}
      <ellipse cx="750" cy="640" rx="250" ry="14" fill="#000" opacity=".32" filter="url(#armBlur)" />
      <ellipse cx="1275" cy="640" rx="150" ry="10" fill="#000" opacity=".3" filter="url(#armBlur)" />

      {/* inspected objects */}
      <rect x="1190" y="574" width="170" height="58" fill="#efede7" />
      <rect x="1190" y="574" width="170" height="4" fill="#fff" opacity=".8" />
      <rect x="1190" y="626" width="170" height="6" fill="#000" opacity=".1" />
      <rect x="1400" y="602" width="56" height="30" fill="#e2e0d9" />
      <rect x="1400" y="602" width="56" height="3" fill="#fff" opacity=".7" />

      {/* field of view */}
      <polygon points="1262,552 1288,552 1420,632 1130,632" fill="url(#armCone)" />

      {/* arm: base */}
      <rect x="630" y="616" width="240" height="16" rx="3" fill="url(#armDark)" />
      {bolts.map((x) => <circle key={x} cx={x} cy="624" r="3.5" fill="url(#armMetal)" />)}
      <rect x="690" y="530" width="120" height="86" rx="8" fill="url(#armPed)" />
      <rect x="690" y="574" width="120" height="2" fill="#000" opacity=".18" />

      {/* arm: links + joints */}
      <Link x={750} y={496} angle={-43.9} len={361} w={84} />
      <Joint cx={750} cy={496} r={62} />
      <Link x={1010} y={246} angle={27} len={297} w={70} />
      <Joint cx={1010} cy={246} r={54} />
      <Joint cx={1275} cy={381} r={40} />

      {/* wrist camera */}
      <rect x="1246" y="418" width="58" height="16" rx="3" fill="url(#armMetal)" />
      <rect x="1214" y="434" width="122" height="78" rx="13" fill="url(#armDark)" />
      <rect x="1226" y="435" width="98" height="1.5" fill="#fff" opacity=".22" />
      <rect x="1226" y="446" width="98" height="52" rx="8" fill="none" stroke="#fff" strokeOpacity=".06" />
      <circle cx="1318" cy="448" r="3.5" fill="#f4c20d" />
      <rect x="1250" y="512" width="50" height="18" fill="url(#armMetal)" />
      <rect x="1246" y="530" width="58" height="22" rx="2" fill="url(#armDark)" />
      <ellipse cx="1275" cy="552" rx="29" ry="7" fill="#06080a" />
      <ellipse cx="1275" cy="552" rx="29" ry="7" fill="none" stroke="#fff" strokeOpacity=".18" />
      <path d="M1258 551 Q 1268 546 1280 549" fill="none" stroke="#9fb4c4" strokeOpacity=".5" strokeWidth="1.5" />
    </svg>
  );
}
