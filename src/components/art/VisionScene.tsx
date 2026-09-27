import type { CSSProperties, ReactNode } from "react";

// Isometric "clay" render of a conveyor workcell seen by an overhead camera.
// Parts ride the belt (CSS transforms only, paused off-screen by VisionExplorer).
// Four overlay layers (detection, tracking, depth, context) cross-fade by `active`;
// each overlay is attached to its part so it travels with it.
// Placeholder art: swap for photography + real overlays later.

const S = 64;
const OX = 600;
const OY = 391;
const UX = 0.866 * S; // screen px per world unit along the belt (x)
const UY = 0.5 * S;
const P = (x: number, y: number, z: number): [number, number] => [OX + (x - y) * UX, OY + (x + y) * UY - z * S];
const pts = (...p: [number, number][]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

type Box = { x: number; y: number; w: number; d: number; h: number; z?: number };
const BELT_TOP = 0.5;
const belt: Box = { x: -6, y: -1.9, w: 12, d: 3.8, h: BELT_TOP, z: 0 };
const parts: Box[] = [
  { x: -3.5, y: -1.2, w: 1.3, d: 1.3, h: 1.0 },
  { x: -1.0, y: -0.6, w: 1.1, d: 1.1, h: 1.7 },
  { x: 1.3, y: -0.4, w: 1.7, d: 1.0, h: 0.75 },
  { x: 3.7, y: -1.5, w: 0.9, d: 0.9, h: 0.95 },
].map((b) => ({ ...b, z: BELT_TOP }));

// Belt motion. All parts share one cycle so their spacing never changes (no collisions).
const SPEED = 0.35; // world units per second
const X_MIN = -5.7;
const X_MAX = 4.2;
const mover = (b: Box) =>
  ({
    "--sx": `${(X_MIN - b.x) * UX}px`,
    "--sy": `${(X_MIN - b.x) * UY}px`,
    "--ex": `${(X_MAX - b.x) * UX}px`,
    "--ey": `${(X_MAX - b.x) * UY}px`,
    "--dur": `${(X_MAX - X_MIN) / SPEED}s`,
    "--delay": `${-(b.x - X_MIN) / SPEED}s`,
  }) as CSSProperties;

const Movers = ({ children }: { children: (b: Box, i: number) => ReactNode }) => (
  <>
    {parts.map((b, i) => (
      <g key={i} className="vs-mv" style={mover(b)}>
        {children(b, i)}
      </g>
    ))}
  </>
);

const faces = ({ x, y, w, d, h, z = 0 }: Box) => {
  const zt = z + h;
  return {
    top: pts(P(x, y, zt), P(x + w, y, zt), P(x + w, y + d, zt), P(x, y + d, zt)),
    left: pts(P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, zt), P(x, y + d, zt)),
    right: pts(P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, zt), P(x + w, y, zt)),
  };
};

const bounds = (b: Box) => {
  const xs: number[] = [], ys: number[] = [];
  for (const [dx, dy] of [[0, 0], [b.w, 0], [b.w, b.d], [0, b.d]])
    for (const z of [b.z ?? 0, (b.z ?? 0) + b.h]) {
      const [px, py] = P(b.x + dx, b.y + dy, z);
      xs.push(px);
      ys.push(py);
    }
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
};

// Overhead camera: higher surfaces are nearer, so depth brightness follows height.
const grey = (t: number) => {
  const v = Math.round(30 + Math.min(1, Math.max(0, t)) * 205);
  return `rgb(${v - 5},${v - 1},${v})`;
};

function Corners({ b, id }: { b: Box; id: string }) {
  const { x0, x1, y0, y1 } = bounds(b);
  const pad = 14, L = 22;
  const [a, c, d, e] = [x0 - pad, x1 + pad, y0 - pad, y1 + pad];
  return (
    <g fill="none" stroke="var(--art-ink)" strokeWidth="2" strokeLinecap="square">
      <path d={`M${a} ${d + L}V${d}H${a + L} M${c - L} ${d}H${c}V${d + L} M${c} ${e - L}V${e}H${c - L} M${a + L} ${e}H${a}V${e - L}`} />
      <rect x={a} y={d - 36} width="44" height="28" rx="4" fill="var(--art-mark)" stroke="none" /><text x={a + 22} y={d - 16} textAnchor="middle" fill="var(--art-mark-ink)" stroke="none" fontSize="16" letterSpacing="1" fontWeight="600">{id}</text>
    </g>
  );
}

function Tag({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "end" }) {
  const w = children.length * 12.5 + 22;
  return (
    <g>
      <rect x={anchor === "end" ? x - w : x} y={y - 17} width={w} height="30" rx="4" fill="var(--art-mark)" />
      <text x={anchor === "end" ? x - 11 : x + 11} y={y + 4} textAnchor={anchor} fontSize="16" letterSpacing="2" fontWeight="600" fill="var(--art-mark-ink)">{children}</text>
    </g>
  );
}

const Layer = ({ on, children }: { on: boolean; children: ReactNode }) => (
  <g className="layer" style={{ opacity: on ? 1 : 0 }} aria-hidden={!on}>{children}</g>
);

// Soft contact shadow: a radial-gradient ellipse (no blur filter, which is costly on moving elements).
const Shadow = ({ b }: { b: Box }) => {
  const [cx, cy] = P(b.x + b.w / 2 + 0.25, b.y + b.d / 2 + 0.25, BELT_TOP);
  const r = (b.w + b.d) * 0.62;
  return <ellipse cx={cx} cy={cy} rx={r * UX} ry={r * UY} fill="url(#vsShadow)" />;
};

const trail = (b: Box) => {
  const cx = b.x + b.w / 2, cy = b.y + b.d / 2, zt = BELT_TOP + b.h;
  return [P(cx - 2.4, cy, zt), P(cx - 1.2, cy, zt), P(cx, cy, zt)];
};

export default function VisionScene({ active }: { active: number }) {
  const bf = faces(belt);
  const beltClip = faces({ ...belt, h: 0, z: BELT_TOP }).top;
  const cam = P(-0.8, 0, 3.1);
  const fov = [P(-4.6, -1.7, BELT_TOP), P(3.0, -1.7, BELT_TOP), P(3.0, 1.7, BELT_TOP), P(-4.6, 1.7, BELT_TOP)];
  const postTop = 3.8;

  return (
    <svg viewBox="0 0 1200 750" className="h-full w-full" role="img" aria-label={`Workcell viewed by an overhead camera, showing ${["detection", "tracking", "depth", "context"][active]}`} preserveAspectRatio="xMidYMid slice" fontFamily="var(--font-archivo), sans-serif">
      <defs>
        <linearGradient id="vsBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--art-bg-a)" />
          <stop offset="1" stopColor="var(--art-bg-b)" />
        </linearGradient>
        <linearGradient id="vsDepthBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141f27" />
          <stop offset="1" stopColor="#1f2c35" />
        </linearGradient>
        <linearGradient id="vsScan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#edf1f3" stopOpacity="0" />
          <stop offset="1" stopColor="#edf1f3" stopOpacity=".13" />
        </linearGradient>
        <radialGradient id="vsShadow">
          <stop offset="0" stopColor="#000" stopOpacity=".34" />
          <stop offset=".6" stopColor="#000" stopOpacity=".14" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id="vsBeltClip"><polygon points={beltClip} /></clipPath>
        <filter id="vsBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9" /></filter>
      </defs>

      <rect width="1200" height="750" fill="url(#vsBg)" />

      {/* ---- base render ---- */}
      <Layer on>
        <polygon points={pts(P(-6, -1.9, 0), P(6.4, -1.9, 0), P(6.4, 2.6, 0), P(-6, 2.6, 0))} fill="#000" opacity=".16" filter="url(#vsBlur)" transform="translate(30 60)" />
        <polygon points={bf.left} fill="var(--art-belt-l)" />
        <polygon points={bf.right} fill="var(--art-belt-r)" />
        <polygon points={bf.top} fill="var(--art-belt-top)" />
        <g clipPath="url(#vsBeltClip)">
          <g className="vs-tread">
            {Array.from({ length: 27 }, (_, i) => -6.5 + i * 0.5).map((x) => (
              <polyline key={x} points={pts(P(x, -1.9, BELT_TOP), P(x, 1.9, BELT_TOP))} stroke="var(--art-ink)" strokeOpacity=".08" fill="none" />
            ))}
          </g>
        </g>
        <polyline points={pts(P(-6, -1.62, BELT_TOP), P(6, -1.62, BELT_TOP))} stroke="#fff" strokeOpacity=".35" fill="none" />
        <polyline points={pts(P(-6, 1.62, BELT_TOP), P(6, 1.62, BELT_TOP))} stroke="#fff" strokeOpacity=".35" fill="none" />

        <g stroke="var(--art-ink)" strokeOpacity=".22" strokeWidth="1.2" fill="none">
          {fov.map(([x, y], i) => <line key={i} x1={cam[0]} y1={cam[1]} x2={x} y2={y} />)}
          <polygon points={pts(...fov)} strokeDasharray="5 6" />
        </g>
        <polyline points={pts(P(-0.8, -2.5, BELT_TOP), P(-0.8, -2.5, postTop), P(-0.8, 0, postTop))} stroke="#66727a" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        <Movers>
          {(b) => {
            const f = faces(b);
            return (
              <>
                <Shadow b={b} />
                <polygon points={f.left} fill="#d6dde1" />
                <polygon points={f.right} fill="#b6bfc5" />
                <polygon points={f.top} fill="#eef2f4" />
              </>
            );
          }}
        </Movers>

        <line x1={cam[0]} y1={P(-0.8, 0, postTop)[1]} x2={cam[0]} y2={cam[1] - 34} stroke="#66727a" strokeWidth="4" />
        <rect x={cam[0] - 30} y={cam[1] - 34} width="60" height="34" rx="5" fill="var(--art-cam)" />
        <circle cx={cam[0]} cy={cam[1] - 5} r="9" fill="#050607" stroke="#56626a" strokeWidth="2" />
      </Layer>

      {/* ---- 03 depth ---- */}
      <Layer on={active === 2}>
        <rect width="1200" height="750" fill="url(#vsDepthBg)" />
        <polygon points={bf.left} fill={grey(0.16)} />
        <polygon points={bf.right} fill={grey(0.1)} />
        <polygon points={bf.top} fill={grey(0.24)} />
        <Movers>
          {(b) => {
            const f = faces(b);
            const t = 0.34 + b.h * 0.3;
            return (
              <>
                <polygon points={f.left} fill={grey(t - 0.14)} />
                <polygon points={f.right} fill={grey(t - 0.26)} />
                <polygon points={f.top} fill={grey(t)} />
              </>
            );
          }}
        </Movers>
        {Array.from({ length: 30 }, (_, i) => 24 + i * 24).map((y) => (
          <line key={y} x1="0" x2="1200" y1={y} y2={y} stroke="#edf1f3" strokeOpacity=".06" />
        ))}
        <rect className="vs-scan" y="-120" width="1200" height="120" fill="url(#vsScan)" />
        <text x="52" y="60" fontSize="15" letterSpacing="4" fill="#edf1f3" fillOpacity=".55">FAR</text>
        <text x="52" y="704" fontSize="15" letterSpacing="4" fill="#edf1f3" fillOpacity=".55">NEAR</text>
      </Layer>

      {/* ---- 01 detection ---- */}
      <Layer on={active === 0}>
        <Movers>{(b, i) => <Corners b={b} id={`0${i + 1}`} />}</Movers>
      </Layer>

      {/* ---- 02 tracking ---- */}
      <Layer on={active === 1}>
        <Movers>
          {(b, i) => {
            if (i < 2) return null;
            const t = trail(b);
            const ghost = faces({ ...b, x: b.x - 2.4 }).top;
            return (
              <g fill="none" stroke="var(--art-ink)">
                <polygon points={ghost} strokeOpacity=".4" strokeDasharray="4 5" />
                <polyline points={pts(...t)} strokeWidth="1.6" strokeDasharray="2 8" strokeLinecap="round" />
                {t.slice(0, 2).map(([x, y], k) => <circle key={k} cx={x} cy={y} r="4" fill="var(--art-ink)" fillOpacity={0.35 + k * 0.3} stroke="none" />)}
                <circle cx={t[2][0]} cy={t[2][1]} r="10" strokeWidth="2" />
                <circle cx={t[2][0]} cy={t[2][1]} r="2.5" fill="var(--art-ink)" stroke="none" />
                <path d={`M${t[2][0] + 22} ${t[2][1] + 11}l14 7-14 7`} strokeWidth="2" />
                <Tag x={t[2][0] - 30} y={t[2][1] - 66}>{`ID 0${i + 1}`}</Tag>
              </g>
            );
          }}
        </Movers>
      </Layer>

      {/* ---- 04 context ---- */}
      <Layer on={active === 3}>
        <Movers>
          {(b, i) => {
            if (i === 1) {
              const top = P(b.x + b.w / 2, b.y + b.d / 2, BELT_TOP + b.h);
              return (
                <g fill="none" stroke="var(--art-ink)">
                  <circle cx={top[0]} cy={top[1]} r="13" strokeWidth="2" />
                  <path d={`M${top[0] - 22} ${top[1]}h44M${top[0]} ${top[1] - 22}v44`} strokeWidth="1.5" />
                  <path d={`M${top[0] + 14} ${top[1] - 12}L${top[0] + 70} ${top[1] - 70}H${top[0] + 96}`} strokeWidth="1.5" />
                  <Tag x={top[0] + 96} y={top[1] - 70}>PICK POINT</Tag>
                </g>
              );
            }
            if (i === 2) {
              const x1 = b.x + b.w + 0.3, x2 = x1 + 1.1, y1 = b.y - 0.2, y2 = b.y + b.d + 0.2;
              const zone = [P(x1, y1, BELT_TOP), P(x2, y1, BELT_TOP), P(x2, y2, BELT_TOP), P(x1, y2, BELT_TOP)];
              const zc = P(x2, y2, BELT_TOP);
              return (
                <g fill="none" stroke="var(--art-ink)">
                  <polygon points={pts(...zone)} strokeWidth="1.5" strokeDasharray="6 6" />
                  <path d={`M${zc[0] - 4} ${zc[1] + 4}L${zc[0] + 26} ${zc[1] + 40}H${zc[0] + 50}`} strokeWidth="1.5" />
                  <Tag x={zc[0] + 50} y={zc[1] + 40}>CLEAR PATH</Tag>
                </g>
              );
            }
            return null;
          }}
        </Movers>
      </Layer>
    </svg>
  );
}
