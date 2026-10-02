import { socialGallery, socials } from "@/lib/data";
import { SectionHeading, SectionLabel, SectionShell } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { socialIcons } from "./ui/Icons";
import { useTimedFlag } from "@/lib/hooks";

export function SocialSection() {
  const [notice, triggerNotice] = useTimedFlag(3200);

  return (
    <SectionShell label="Follow the journey" className="bg-espresso-800">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel>Stay Connected</SectionLabel>
          <SectionHeading className="mt-6" size="lg">
            Follow the
            <br />
            <span className="u-italic text-gold">Journey.</span>
          </SectionHeading>
        </div>
        <Reveal variant="up" delay={160} className="max-w-[34ch]">
          <p className="font-sans text-[0.92rem] font-light leading-[1.9] text-ivory/50">
            New recordings, live dates and behind-the-scenes moments from the studio.
            Profile links will be activated here as each one is confirmed.
          </p>
        </Reveal>
      </div>

      {/* ---------------- Social buttons ---------------- */}
      <Reveal variant="up" delay={120} className="mt-12">
        <ul className="flex flex-wrap gap-3 sm:gap-4">
          {socials.map((social) => {
            const Glyph = socialIcons[social.platform];
            const configured = Boolean(social.href);
            return (
              <li key={social.id}>
                {configured && social.href ? (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 border border-gold/40 px-5 py-3.5 font-sans text-[10px] uppercase tracking-[0.24em] text-gold transition-all duration-500 hover:bg-gold hover:text-espresso"
                  >
                    {Glyph ? <Glyph size={17} /> : null}
                    {social.platform}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => triggerNotice()}
                    aria-disabled="true"
                    title={`${social.platform} — link to be confirmed`}
                    className="group flex cursor-pointer items-center gap-3 border border-ivory/15 px-5 py-3.5 font-sans text-[10px] uppercase tracking-[0.24em] text-ivory/40 transition-all duration-500 hover:border-gold/40 hover:text-ivory/70"
                  >
                    {Glyph ? <Glyph size={17} /> : null}
                    {social.platform}
                    <span className="font-sans text-[8px] normal-case tracking-[0.12em] text-ivory/30">
                      soon
                    </span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <p
          className="mt-5 min-h-[1.25rem] font-sans text-[11px] tracking-[0.08em] text-gold transition-opacity duration-500"
          role="status"
          aria-live="polite"
        >
          {notice
            ? "Social profile links are not connected yet — this button is ready to be pointed at Brenda's account."
            : ""}
        </p>
      </Reveal>

      {/* ---------------- Gallery grid ---------------- */}
      <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
        {socialGallery.map((item, index) => (
          <Reveal
            as="li"
            variant="up"
            delay={index * 70}
            key={item.id}
            className={index < 2 ? "col-span-2 lg:col-span-2" : "lg:col-span-2"}
          >
            <figure className="group relative overflow-hidden border border-ivory/10">
              <div className={`relative w-full ${item.ratio}`}>
                <img
                  src={item.image}
                  alt="Placeholder image from Brenda Moore-Frazier's gallery"
                  loading="lazy"
                  decoding="async"
                  className="img-zoom absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/75 via-transparent to-transparent opacity-60 transition-opacity duration-600 group-hover:opacity-90" />
                <span className="absolute bottom-4 left-4 flex items-center gap-2.5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                  <span className="h-px w-5 bg-gold" />
                  <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-ivory/80">
                    @brendamoorefrazier
                  </span>
                </span>
              </div>
            </figure>
          </Reveal>
        ))}
      </ul>

      <Reveal variant="fade" delay={200} className="mt-10">
        <p className="font-sans text-[10.5px] leading-relaxed tracking-[0.06em] text-ivory/35">
          Gallery imagery is placeholder. Real performance and studio photography will
          replace these frames.
        </p>
      </Reveal>
    </SectionShell>
  );
}
