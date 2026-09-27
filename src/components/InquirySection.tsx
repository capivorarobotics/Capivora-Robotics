import InquiryForm from "./InquiryForm";

export default function InquirySection() {
  return (
    <section id="contact" data-nav="dark" className="on-dark relative overflow-hidden bg-night py-20 text-day md:py-32">
      <div aria-hidden="true" className="grid-bg absolute inset-0 [--color-grid:rgb(237_241_243/0.05)] [mask-image:radial-gradient(ellipse_60%_45%_at_50%_20%,#000_20%,transparent_75%)]" />
      {/* soft light behind the form */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] h-[520px] w-[min(1100px,120%)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(244_194_13/0.07),transparent)]" />
      <div className="wrap relative">
        <div className="reveal mx-auto max-w-[760px] text-center">
          <h2 className="h-section">Have a problem worth solving?</h2>
          <p className="lede mx-auto mt-6">Tell us what you’re working on. We’d love to hear from you.</p>
        </div>

        <div className="reveal mx-auto mt-12 max-w-[960px] md:mt-16">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
