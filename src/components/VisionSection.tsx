import VisionExplorer from "./VisionExplorer";

export default function VisionSection() {
  return (
    <section id="vision" className="py-20 md:py-32">
      <div className="wrap">
        <div className="reveal grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
          <h2 className="h-section md:col-span-7">
            The world isn’t just data.
            <br />
            It’s context.
          </h2>
          <p className="lede md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            Our vision systems capture what machines need to see — and help them understand objects, movement, depth and context in real time.
          </p>
        </div>
        <div className="reveal mt-12 md:mt-16">
          <VisionExplorer />
        </div>
      </div>
    </section>
  );
}
