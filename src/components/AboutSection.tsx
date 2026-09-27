import type { ReactNode } from "react";
import { facts } from "@/content/site";
import ArmScene from "./art/ArmScene";

// One icon per fact, in the order of `facts` (founded, based in, pre-incubated at).
const icons: ReactNode[] = [
  <path key="f" d="M4 7.5h16v12H4zM4 11h16M8.5 4.5v4M15.5 4.5v4" />,
  <g key="b"><path d="M12 21s-7-5.6-7-11.5a7 7 0 1 1 14 0C19 15.4 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></g>,
  <g key="p"><path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z" /><path d="M6 11.5v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" /></g>,
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-paper-2 py-20 md:py-32">
      <div className="wrap">
        <div className="reveal grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
          <h2 className="h-section md:col-span-7">Built by people who care about what’s next.</h2>
          <p className="lede md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            Capivora Robotics is an AI and robotics startup building intelligent automation for smart manufacturing. We work with computer vision to help machines perceive and understand the real world.
          </p>
        </div>

        <div className="reveal mt-12 grid gap-3 md:mt-16 lg:grid-cols-12">
          <figure className="aspect-[4/3] overflow-hidden rounded-[28px] bg-panel ring-1 ring-line sm:aspect-[16/9] lg:col-span-8 lg:aspect-auto lg:min-h-[480px]">
            <ArmScene />
          </figure>
          <dl className="grid gap-3 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
            {facts.map((f, i) => (
              <div key={f.label} className="flex flex-col justify-between gap-8 rounded-[24px] bg-paper p-6 ring-1 ring-line md:p-7">
                <div className="flex items-center justify-between">
                  <dt className="meta text-muted">{f.label}</dt>
                  <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-paper-2 text-ink ring-1 ring-line">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {icons[i]}
                    </svg>
                  </span>
                </div>
                <dd className="wide text-[clamp(22px,2vw,30px)] font-semibold leading-tight tracking-[-0.02em]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
