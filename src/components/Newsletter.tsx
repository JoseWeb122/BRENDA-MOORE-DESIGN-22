import { useId, useState, type FormEvent } from "react";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { IconCheck } from "./ui/Icons";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function Newsletter() {
  const formId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError("Please enter a valid email address, e.g. name@example.com.");
      return;
    }

    setError("");
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1100);
  };

  return (
    <section
      aria-label="Newsletter"
      className="relative overflow-hidden border-y border-gold/15 bg-espresso-800 px-5 py-20 sm:px-8 md:py-28 lg:px-14 xl:px-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_120%,rgba(198,161,91,0.16),transparent_65%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 text-center">
        <Reveal variant="fade" className="flex items-center gap-4">
          <span className="h-px w-8 bg-gold/70" />
          <span className="u-label text-gold">Newsletter</span>
          <span className="h-px w-8 bg-gold/70" />
        </Reveal>

        <Reveal variant="up" delay={90} as="h2" className="u-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1.02] text-ivory">
          Stay in the <span className="u-italic text-gold">Know.</span>
        </Reveal>

        <Reveal variant="up" delay={160} className="max-w-[46ch]">
          <p className="font-sans text-[0.95rem] font-light leading-[1.9] text-ivory/55">
            Receive occasional updates about music, performances, releases and special
            appearances.
          </p>
        </Reveal>

        <Reveal variant="up" delay={240} className="w-full max-w-xl">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-5 border border-gold/30 bg-espresso/60 px-6 py-9">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-gold">
                <IconCheck size={26} />
              </span>
              <p className="u-display text-[1.6rem] leading-tight text-ivory">
                You&apos;re on the list.
              </p>
              <p className="max-w-[36ch] font-sans text-[0.88rem] font-light leading-[1.85] text-ivory/55">
                Thank you for joining. You&apos;ll hear from Brenda when there is
                something worth sharing.
              </p>
              <button
                type="button"
                onClick={() => {
                  setEmail("");
                  setStatus("idle");
                }}
                className="font-sans text-[10px] uppercase tracking-[0.26em] text-gold transition-colors duration-300 hover:text-gold-200"
              >
                Add another address
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1 text-left">
                  <label htmlFor={`${formId}-email`} className="sr-only">
                    Email address
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError("");
                    }}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${formId}-email-error` : undefined}
                    className={`w-full border bg-espresso/60 px-5 py-4 font-sans text-[0.92rem] font-light text-ivory placeholder:text-ivory/25 transition-colors duration-400 focus:bg-espresso focus:outline-none focus:ring-0 ${
                      error ? "border-red-400/70 focus:border-red-400" : "border-ivory/20 focus:border-gold"
                    }`}
                  />
                </div>
                <Button type="submit" size="lg" disabled={status === "loading"} className="sm:w-auto">
                  {status === "loading" ? (
                    <>
                      <span
                        className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-espresso/30 border-t-espresso"
                        aria-hidden="true"
                      />
                      Joining…
                    </>
                  ) : (
                    "Join the List"
                  )}
                </Button>
              </div>
              {error && (
                <p
                  id={`${formId}-email-error`}
                  role="alert"
                  className="text-left font-sans text-[10.5px] tracking-[0.06em] text-red-300/90"
                >
                  {error}
                </p>
              )}
              <p className="text-left font-sans text-[10px] leading-relaxed tracking-[0.08em] text-ivory/30">
                Front-end prototype — your address is not stored or sent anywhere.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
