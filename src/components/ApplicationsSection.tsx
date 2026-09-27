import { applications } from "@/content/site";
import DiscussButton from "./DiscussButton";

export default function ApplicationsSection() {
  return (
    <section id="applications" className="py-20 md:py-32">
      <div className="wrap">
        <div className="reveal grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
          <h2 className="h-section md:col-span-7">Where vision fits on the factory floor.</h2>
          <p className="lede md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            Smart manufacturing is full of decisions that depend on seeing clearly. A few places we can help. Tell us about yours.
          </p>
        </div>

        <ul className="mt-12 grid gap-3 md:mt-16">
          {applications.map((a) => (
            <li
              key={a.title}
              className="reveal group grid gap-4 rounded-[22px] border border-line bg-paper p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-ink/20 hover:bg-paper-2/60 hover:shadow-[0_18px_40px_-28px_rgb(12_26_34/0.35)] md:grid-cols-12 md:items-center md:gap-8 md:px-8 md:py-7"
            >
              <h3 className="h-card flex items-center gap-3 md:col-span-4">
                <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-[3px] bg-ink/15 transition-colors duration-300 group-hover:bg-signal" />
                {a.title}
              </h3>
              <p className="text-muted md:col-span-4">{a.description}</p>
              <div className="flex flex-wrap items-center gap-2 md:col-span-4 md:justify-end">
                <span className="sr-only">Uses:</span>
                {a.uses.map((u) => (
                  <span key={u} className="chip">{u}</span>
                ))}
                <DiscussButton
                  topic={a.title}
                  className="ml-auto inline-flex h-10 items-center rounded-full border border-line px-4 text-[14px] font-semibold text-ink transition-colors hover:border-signal hover:bg-signal hover:text-[#0c1a22] group-hover:border-ink/30 md:ml-3"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
