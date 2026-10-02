import { nav, socials } from "@/lib/data";
import { useSmoothScrollTo } from "@/lib/hooks";
import { socialIcons } from "./ui/Icons";
import { Monogram } from "./ui/Monogram";
import { Reveal } from "./ui/Reveal";

export function Footer() {
  const scrollTo = useSmoothScrollTo();

  return (
    <footer className="relative overflow-hidden bg-espresso px-5 pb-10 pt-20 sm:px-8 md:pt-28 lg:px-14 xl:px-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(198,161,91,0.09),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-[1440px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
          {/* ---------------- Brand ---------------- */}
          <Reveal variant="up">
            <p className="u-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95] text-ivory">
              Brenda
              <br />
              <span className="text-gold">Moore-Frazier</span>
            </p>
            <p className="mt-6 font-sans text-[10.5px] uppercase tracking-[0.3em] text-ivory/45">
              Singer • Songwriter • Recording Artist
            </p>
            <p className="mt-7 max-w-[38ch] font-sans text-[0.9rem] font-light leading-[1.9] text-ivory/45">
              A soulful voice, timeless stories, and music that stays with you. Thank
              you for listening.
            </p>
            <div className="mt-9">
              <Monogram size={66} />
            </div>
          </Reveal>

          {/* ---------------- Links + social ---------------- */}
          <div className="grid gap-12 sm:grid-cols-2">
            <Reveal variant="up" delay={120}>
              <h2 className="u-label text-gold">Navigate</h2>
              <ul className="mt-6 flex flex-col gap-3.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollTo(item.href);
                      }}
                      className="group inline-flex items-center gap-3 font-sans text-[0.88rem] tracking-[0.06em] text-ivory/60 transition-colors duration-300 hover:text-gold"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-5" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <h2 className="u-label text-gold">Connect</h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {socials.map((social) => {
                  const Glyph = socialIcons[social.platform];
                  return (
                    <li key={social.id}>
                      {social.href ? (
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.platform}
                          className="flex h-11 w-11 items-center justify-center border border-ivory/15 text-ivory/60 transition-all duration-400 hover:border-gold hover:text-gold"
                        >
                          {Glyph ? <Glyph size={17} /> : null}
                        </a>
                      ) : (
                        <span
                          title={`${social.platform} — link to be confirmed`}
                          aria-label={`${social.platform} — link to be confirmed`}
                          className="flex h-11 w-11 items-center justify-center border border-ivory/10 text-ivory/25"
                        >
                          {Glyph ? <Glyph size={17} /> : null}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-9 flex flex-col gap-4">
                <a
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo("#contact");
                  }}
                  className="inline-flex w-fit items-center gap-3 border border-gold/45 px-6 py-3.5 font-sans text-[10px] uppercase tracking-[0.26em] text-gold transition-all duration-500 hover:bg-gold hover:text-espresso"
                >
                  Book Brenda
                </a>
                <p className="max-w-[30ch] font-sans text-[10.5px] leading-relaxed tracking-[0.08em] text-ivory/30">
                  For performance inquiries, please use the contact form.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------------- Bottom bar ---------------- */}
        <div className="mt-16 flex flex-col gap-5 border-t border-ivory/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[10px] tracking-[0.14em] text-ivory/35">
            © {new Date().getFullYear()} Brenda Moore-Frazier. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {["Privacy", "Terms"].map((item) => (
              <a
                key={item}
                href="#home"
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo("#home");
                }}
                className="font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/40 transition-colors duration-300 hover:text-gold"
              >
                {item}
              </a>
            ))}
            <span className="hidden font-sans text-[10px] tracking-[0.14em] text-ivory/25 sm:inline">
              Designed with care.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
