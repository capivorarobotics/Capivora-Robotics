import type { CSSProperties } from "react";
import { facts } from "@/content/site";
import HeroVisual from "./HeroVisual";
import HeroCamera from "./art/HeroCamera";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[84px] md:pt-[96px]">
      <div aria-hidden="true" className="grid-bg fade-in absolute inset-0" />
      <div className="wrap relative grid items-center gap-10 pb-16 pt-8 lg:min-h-[min(100svh,880px)] lg:grid-cols-12 lg:gap-14 lg:py-12">
        <div className="lg:col-span-6">
          <h1 className="rise display text-[clamp(44px,11vw,58px)] md:text-[clamp(54px,5.4vw,80px)]" style={d(100)}>
            Everything changes when machines can see.
          </h1>
          <p className="rise lede mt-7 md:mt-8" style={d(250)}>
            Capivora Robotics builds AI vision systems that help machines in smart manufacturing see, understand and act.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={d(400)}>
            <a href="#contact" className="btn btn-signal">
              Start a conversation
            </a>
            <a href="#how" className="btn btn-ghost bg-paper/60 backdrop-blur">
              See how it works
            </a>
          </div>
          <p
            className="rise meta mt-12 inline-flex items-center gap-2.5 rounded-full border border-line bg-paper/70 py-1.5 pl-1.5 pr-4 text-muted backdrop-blur"
            style={d(550)}
          >
            <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z" />
                <path d="M6 11.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" strokeLinecap="round" />
              </svg>
            </span>
            {facts[2].label} <span className="text-ink">{facts[2].value}</span>
          </p>
        </div>

        <div className="fade-in lg:col-span-6" style={d(200)}>
          <figure className="relative aspect-square w-full overflow-hidden rounded-[28px] bg-panel shadow-[0_40px_80px_-40px_rgb(12_26_34/0.45)] ring-1 ring-line sm:aspect-[5/4] lg:aspect-square lg:max-h-[calc(100svh-160px)]">
            <HeroVisual>
              <HeroCamera />
            </HeroVisual>
            <div aria-hidden="true" className="lock brackets absolute inset-5 md:inset-7" style={d(750)} />
            <figcaption className="pointer-events-none absolute bottom-8 left-8 md:bottom-11 md:left-11">
              <span className="rise meta inline-flex items-center gap-2 rounded-full bg-paper/85 px-3.5 py-2 text-ink shadow-sm backdrop-blur" style={d(1100)}>
                <span aria-hidden="true" className="live-dot h-2 w-2 rounded-full bg-signal" />
                Real-time perception
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
