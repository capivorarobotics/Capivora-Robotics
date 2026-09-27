"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { capabilities } from "@/content/site";
import VisionScene from "./art/VisionScene";

const STEP_MS = 5000;

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (cb: () => void) => {
  const mq = matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const prefersReduced = () => matchMedia(REDUCED).matches;

export default function VisionExplorer() {
  const [active, setActive] = useState(0);
  // Cycles on its own until the visitor picks a tab (never under reduced motion).
  const [picked, setPicked] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, prefersReduced, () => true);
  const auto = !picked && !reduced;
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);
  const figure = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = figure.current;
    if (!el) return;
    // Belt animation and auto-advance only run while the scene is on screen.
    const io = new IntersectionObserver(([e]) => {
      el.classList.toggle("vs-run", e.isIntersecting);
      setInView(e.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pick = (i: number) => {
    setPicked(true);
    setActive(i);
  };

  const onKey = (e: KeyboardEvent) => {
    const n = capabilities.length;
    const next =
      e.key === "ArrowRight" ? (active + 1) % n :
      e.key === "ArrowLeft" ? (active - 1 + n) % n :
      e.key === "Home" ? 0 :
      e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    pick(next);
    tabs.current[next]?.focus();
  };

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <figure
        ref={figure}
        id="vision-panel"
        role="tabpanel"
        aria-labelledby={`vision-tab-${active}`}
        className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-panel ring-1 ring-line sm:aspect-[16/10] lg:aspect-[16/8]"
      >
        <VisionScene active={active} />
        <figcaption className="meta absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-paper/85 px-3.5 py-2 shadow-sm backdrop-blur md:left-6 md:top-6">
          <span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-signal" />
          {capabilities[active].title} view
        </figcaption>
      </figure>

      <div role="tablist" aria-label="What the system sees" onKeyDown={onKey} className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c, i) => {
          const on = active === i;
          return (
            <button
              key={c.title}
              ref={(el) => { tabs.current[i] = el; }}
              id={`vision-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="vision-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => pick(i)}
              className={`group rounded-[20px] p-5 text-left transition-colors duration-300 md:p-6 ${on ? "bg-paper-2" : "hover:bg-paper-2/60"}`}
            >
              <span aria-hidden="true" className="block h-[3px] overflow-hidden rounded-full bg-line">
                {on && (
                  <span
                    key={`${i}-${auto}`}
                    className="block h-full origin-left rounded-full bg-signal"
                    style={
                      auto
                        ? {
                            animation: `progress ${STEP_MS}ms linear both`,
                            animationPlayState: inView && !hover ? "running" : "paused",
                          }
                        : undefined
                    }
                    onAnimationEnd={() => setActive((a) => (a + 1) % capabilities.length)}
                  />
                )}
              </span>
              <span className={`h-card mt-6 block transition-colors ${on ? "text-ink" : "text-muted group-hover:text-ink"}`}>{c.title}</span>
              <span className="mt-1.5 block text-[16px] text-muted">{c.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
