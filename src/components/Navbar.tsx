"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const NAV_Y = 40; // vertical centre of the floating bar

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      // Bar goes dark while it sits over a section marked data-nav="dark".
      setDark(
        [...document.querySelectorAll("[data-nav=dark]")].some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= NAV_Y && r.bottom >= NAV_Y;
        }),
      );
      // Current section: the last one (of all sections, in page order) whose top has
      // passed 40% of the viewport. Only highlighted if it is a nav item, so sections
      // without a link (Technology, Contact) clear the highlight instead of leaving the
      // previous one lit.
      let current = "";
      for (const el of document.querySelectorAll("main section[id]")) {
        if (el.getBoundingClientRect().top <= innerHeight * 0.4) current = `#${el.id}`;
      }
      setActive(nav.some((l) => l.href === current) ? current : "");
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fade-in fixed inset-x-0 top-0 z-50 pt-3 md:pt-4 ${dark ? "nav-dark" : ""}`}>
      <div className="wrap">
        <div
          className={`relative rounded-[26px] border border-line shadow-[0_8px_30px_-12px_rgb(0_0_0/0.18)] backdrop-blur-xl transition-colors duration-500 ${
            open ? "bg-paper" : "bg-paper/80"
          }`}
        >
          {/* reading progress (scroll-driven CSS, hidden where unsupported) */}
          <span aria-hidden="true" className="scroll-progress pointer-events-none absolute inset-x-7 bottom-0 h-[2px] rounded-full bg-signal" />
          <nav aria-label="Primary" className="flex h-[56px] items-center justify-between gap-4 pl-4 pr-2 md:pl-5">
            <a href="#top" aria-label="Capivora Robotics, top of page" onClick={() => setOpen(false)} className="text-ink">
              <Logo height={34} />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={active === l.href ? "location" : undefined}
                    className="meta relative flex h-10 items-center rounded-full px-4 text-muted transition-colors hover:text-ink aria-[current]:text-ink"
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 bottom-1.5 h-[2px] origin-left rounded-full bg-signal transition-transform duration-500 ${active === l.href ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <a href="#contact" className="btn btn-signal btn-sm hidden sm:inline-flex">
                Start a conversation
              </a>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((o) => !o)}
              >
                <span className="relative block h-3 w-[20px]">
                  <span className={`absolute left-0 h-[1.5px] w-full bg-ink transition-transform duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 h-[1.5px] w-full bg-ink transition-transform duration-300 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
                </span>
              </button>
            </div>
          </nav>

          <div id="mobile-menu" hidden={!open} className="border-t border-line px-2 pb-3 lg:hidden">
            <ul className="pt-2">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.href ? "location" : undefined}
                    className="wide flex items-center justify-between rounded-2xl px-3 py-3.5 text-[22px] font-semibold tracking-tight hover:bg-ink/5"
                  >
                    {l.label}
                    {active === l.href && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal" />}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-signal mt-2 w-full sm:hidden">
              Start a conversation
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
