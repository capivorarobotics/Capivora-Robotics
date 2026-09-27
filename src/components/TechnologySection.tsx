import LensMacro from "./art/LensMacro";

const traits = [
  ["Real-time", "perception"],
  ["Spatial", "understanding"],
];

function Traits({ className }: { className: string }) {
  return (
    <dl className={className}>
      {traits.map(([a, b]) => (
        <div key={a} className="border-l-2 border-signal pl-4">
          <dt className="wide text-[20px] font-semibold text-day">{a}</dt>
          <dd className="text-soft">{b}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function TechnologySection() {
  return (
    <section id="technology" data-nav="dark" className="on-dark relative overflow-hidden bg-night text-day">
      {/* soft light falling on the lens */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] top-1/2 hidden h-[900px] w-[900px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(244_194_13/0.10),transparent)] md:block" />
      <div className="wrap relative z-10 py-20 md:flex md:min-h-[min(100svh,860px)] md:flex-col md:justify-center md:py-32">
        <div className="reveal">
          <h2 className="h-section max-w-[9em] md:text-[clamp(44px,5.4vw,80px)]">Vision intelligence for the physical world.</h2>
          <p className="lede mt-7 max-w-[24em]">
            Perception systems designed to help machines see, understand and respond to their environment.
          </p>
        </div>
        <Traits className="reveal mt-14 hidden gap-12 md:flex" />
      </div>

      <div
        className="relative mx-auto mt-2 aspect-square w-[118%] max-w-none -translate-x-[9%] overflow-hidden rounded-full md:absolute md:-right-[14%] md:top-1/2 md:mx-0 md:mt-0 md:w-[min(72vw,920px)] md:-translate-y-1/2 md:translate-x-0"
      >
        <LensMacro />
      </div>

      <Traits className="wrap relative z-10 flex gap-10 pb-16 pt-10 md:hidden" />
    </section>
  );
}
