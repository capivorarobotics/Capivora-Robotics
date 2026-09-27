"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Barely-there pointer parallax: max ±8px / ±6px, ~1° tilt. The rAF loop only runs
// while the image is still settling, and writes to the style directly (no re-renders).
export default function HeroVisual({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fine = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!el || !fine.matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${(x * 0.12).toFixed(3)}deg)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.02 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / innerWidth - 0.5) * 16;
      ty = (e.clientY / innerHeight - 0.5) * 12;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("mousemove", onMove, { passive: true });
    return () => {
      removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="h-full w-full will-change-transform">
      {children}
    </div>
  );
}
