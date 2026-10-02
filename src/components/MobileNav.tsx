import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { nav, socials } from "@/lib/data";
import { useActiveSection, useEscapeKey, useLockBodyScroll, useSmoothScrollTo } from "@/lib/hooks";
import { IconClose, socialIcons } from "./ui/Icons";
import { Monogram } from "./ui/Monogram";

const sectionIds = nav.map((item) => item.href.replace("#", ""));

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(sectionIds);
  const scrollTo = useSmoothScrollTo();

  useLockBodyScroll(open);
  useEscapeKey(onClose, open);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const first = panel.querySelector<HTMLElement>("a[href], button");
    const timer = window.setTimeout(() => first?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[70] flex flex-col bg-espresso/98 backdrop-blur-xl lg:hidden"
    >
      {/* warm gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(198,161,91,0.18),transparent_60%)]"
      />

      <div className="relative flex items-center justify-between px-5 py-5 sm:px-8">
        <span className="u-display text-[1.35rem] leading-none tracking-[0.02em] text-ivory">
          Brenda <span className="text-gold">Moore-Frazier</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="flex h-11 w-11 items-center justify-center border border-gold/40 text-gold transition-colors duration-300 hover:bg-gold hover:text-espresso"
        >
          <IconClose size={20} />
        </button>
      </div>

      <nav aria-label="Mobile primary navigation" className="relative flex-1 overflow-y-auto px-5 pb-8 sm:px-8">
        <ul className="flex flex-col">
          {nav.map((item, index) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={item.href} className="border-b border-ivory/[0.08]">
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    onClose();
                    window.setTimeout(() => scrollTo(item.href), 180);
                  }}
                  className={cn(
                    "group flex items-baseline justify-between gap-4 py-4 transition-colors duration-300",
                    isActive ? "text-gold" : "text-ivory hover:text-gold",
                  )}
                  style={{
                    animation: "mobile-nav-in 0.65s cubic-bezier(0.16,1,0.3,1) both",
                    animationDelay: `${80 + index * 55}ms`,
                  }}
                >
                  <span className="u-display text-[2.1rem] leading-none sm:text-[2.5rem]">
                    {item.label}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ivory/35">
                    0{index + 1}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col gap-7">
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              onClose();
              window.setTimeout(() => scrollTo("#contact"), 180);
            }}
            className="w-full bg-gold px-6 py-4 text-center font-sans text-[11px] uppercase tracking-[0.28em] text-espresso transition-colors duration-300 hover:bg-gold-200"
            style={{
              animation: "mobile-nav-in 0.65s cubic-bezier(0.16,1,0.3,1) both",
              animationDelay: "540ms",
            }}
          >
            Book Brenda
          </a>

          <div
            className="flex items-center justify-between gap-4"
            style={{
              animation: "mobile-nav-in 0.65s cubic-bezier(0.16,1,0.3,1) both",
              animationDelay: "620ms",
            }}
          >
            <ul className="flex items-center gap-3">
              {socials.map((social) => {
                const Glyph = socialIcons[social.platform];
                return (
                  <li key={social.id}>
                    <span
                      title={`${social.platform} — link to be confirmed`}
                      aria-label={`${social.platform} — link to be confirmed`}
                      className="flex h-10 w-10 items-center justify-center border border-ivory/15 text-ivory/40"
                    >
                      {Glyph ? <Glyph size={17} /> : null}
                    </span>
                  </li>
                );
              })}
            </ul>
            <Monogram size={54} />
          </div>

          <p className="max-w-[34ch] font-sans text-[11px] leading-relaxed tracking-[0.08em] text-ivory/40">
            Singer • Songwriter • Recording Artist • Live Performer
          </p>
        </div>
      </nav>

      <style>{`
        @keyframes mobile-nav-in {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="mobile-nav-in"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
