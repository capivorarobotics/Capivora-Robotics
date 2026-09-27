import { linkedin, nav } from "@/content/site";

// Company facts (founded, location, incubator) live in the About section only;
// the footer is just navigation and LinkedIn.
// In page order: the top-nav links, plus Technology (before About) and Contact.
const links = [
  ...nav.filter((l) => l.href !== "#about"),
  { label: "Technology", href: "#technology" },
  ...nav.filter((l) => l.href === "#about"),
  { label: "Contact", href: "#contact" },
];

const round =
  "flex h-11 w-11 items-center justify-center rounded-full border border-line-dark text-soft transition-colors hover:border-signal hover:bg-signal hover:text-night";

export default function Footer() {
  return (
    <footer data-nav="dark" className="on-dark bg-night text-day">
      <div className="wrap border-t border-line-dark pt-10 md:pt-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-soft underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:text-day hover:decoration-signal"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Capivora Robotics on LinkedIn" className={round}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.13v5.42h-4v-4.8c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.54v4.89h-4v-11Z" />
              </svg>
            </a>
            <a href="#top" aria-label="Back to top" className={round}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
              </svg>
            </a>
          </div>
        </div>

        <p className="mt-10 border-t border-line-dark py-7 text-[14px] text-soft/80">© 2026 Capivora Robotics</p>
      </div>
    </footer>
  );
}
