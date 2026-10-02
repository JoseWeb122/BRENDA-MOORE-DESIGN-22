import { useState } from "react";
import { cn } from "@/utils/cn";
import { nav } from "@/lib/data";
import { useActiveSection, useScrolled, useSmoothScrollTo } from "@/lib/hooks";
import { IconMenu } from "./ui/Icons";
import { MobileNav } from "./MobileNav";

const sectionIds = nav.map((item) => item.href.replace("#", ""));

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(40);
  const active = useActiveSection(sectionIds);
  const scrollTo = useSmoothScrollTo();

  return (
    <>
      <a
        href="#home"
        onClick={(event) => {
          event.preventDefault();
          scrollTo("#home");
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-5 focus:py-3 focus:font-sans focus:text-[11px] focus:uppercase focus:tracking-[0.24em] focus:text-espresso"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[65] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-b border-gold/15 bg-espresso/90 py-3 backdrop-blur-xl supports-[backdrop-filter]:bg-espresso/80"
            : "border-b border-transparent bg-transparent py-5 md:py-7",
        )}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-14 xl:px-20">
          {/* Wordmark */}
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              scrollTo("#home");
            }}
            className="group flex flex-col leading-none"
            aria-label="Brenda Moore-Frazier — home"
          >
            <span
              className={cn(
                "u-display text-[1.25rem] tracking-[0.015em] transition-all duration-700 sm:text-[1.45rem]",
                scrolled ? "text-ivory" : "text-ivory",
              )}
            >
              Brenda <span className="text-gold">Moore-Frazier</span>
            </span>
            <span
              className={cn(
                "mt-1.5 font-sans text-[8.5px] uppercase tracking-[0.32em] text-ivory/45 transition-all duration-700",
                scrolled ? "opacity-100" : "opacity-80",
              )}
            >
              Singer • Songwriter • Recording Artist
            </span>
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex xl:gap-10">
            {nav.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo(item.href);
                  }}
                  data-active={isActive}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "link-underline font-sans text-[11px] uppercase tracking-[0.22em] transition-colors duration-400",
                    isActive ? "text-gold" : "text-ivory/75 hover:text-ivory",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollTo("#contact");
              }}
              className="hidden items-center gap-2.5 border border-gold/50 px-6 py-3 font-sans text-[10px] uppercase tracking-[0.26em] text-gold transition-all duration-500 hover:bg-gold hover:text-espresso sm:inline-flex"
            >
              Book Brenda
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center border border-ivory/25 text-ivory transition-colors duration-300 hover:border-gold hover:text-gold lg:hidden"
            >
              <IconMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
