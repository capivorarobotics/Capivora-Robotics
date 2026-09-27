"use client";

import { useEffect, useState } from "react";

// Phones only: keeps "Start a conversation" in reach once the hero button has scrolled
// away, and gets out of the way when the form itself is on screen.
export default function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.querySelector("#contact")?.getBoundingClientRect();
      const nearForm = contact ? contact.top < innerHeight : false;
      setShow(scrollY > innerHeight * 0.8 && !nearForm);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+16px)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <a href="#contact" tabIndex={show ? 0 : -1} className="btn btn-signal w-full shadow-[0_12px_30px_-10px_rgb(0_0_0/0.45)]">
        Start a conversation
      </a>
    </div>
  );
}
