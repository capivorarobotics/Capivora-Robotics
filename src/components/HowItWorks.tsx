import { steps } from "@/content/site";
import { ActArt, SeeArt, UnderstandArt } from "./art/StepArt";

const art = [SeeArt, UnderstandArt, ActArt];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-paper-2 py-20 md:py-32">
      <div className="wrap">
        <div className="reveal grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
          <h2 className="h-section md:col-span-7">From pixels to action, in three steps.</h2>
          <p className="lede md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            Our systems turn visual information into intelligence machines can use.
          </p>
        </div>

        <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-5 lg:gap-6">
          {steps.map((s, i) => {
            const Art = art[i];
            return (
              <li key={s.title} className="reveal group flex flex-col">
                {/* step marker + connector to the next step */}
                <div aria-hidden="true" className="mb-5 flex items-center gap-3">
                  <span className="wide flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-[14px] font-semibold text-paper">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 ? (
                    <span className="hidden h-px flex-1 bg-ink/20 md:block" />
                  ) : (
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-ink/20 to-transparent md:block" />
                  )}
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-[24px] bg-panel ring-1 ring-line md:aspect-[4/5]">
                  <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none">
                    <Art />
                  </div>
                </div>
                <h3 className="h-card mt-6">{s.title}</h3>
                <p className="mt-2 max-w-[26em] text-muted">{s.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
