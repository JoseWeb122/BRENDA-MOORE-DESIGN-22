import { useCallback, useEffect, useRef, useState } from "react";

/** Tracks the user's reduced-motion preference. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** True once the window has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/** Prevents background scrolling while a modal / mobile menu is open. */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    const scrollBar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBar > 0) document.body.style.paddingRight = `${scrollBar}px`;
    return () => {
      document.body.style.overflow = previous;
      document.body.style.paddingRight = "";
    };
  }, [locked]);
}

/** Returns the id of the section currently dominating the viewport. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let best = "";
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.85], rootMargin: "-72px 0px -30% 0px" },
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/** Calls `handler` when Escape is pressed and `active` is true. */
export function useEscapeKey(handler: () => void, active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handler();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler, active]);
}

/** Keeps Tab focus inside `ref` while `active`. */
export function useFocusTrap(ref: React.RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    if (!active || !ref.current) return;
    const container = ref.current;
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

    const focusFirst = () => {
      const first = container.querySelector<HTMLElement>(selector);
      first?.focus();
    };
    const timer = window.setTimeout(focusFirst, 40);

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      container.removeEventListener("keydown", onKey);
    };
  }, [ref, active]);
}

/** Smooth-scrolls to a hash target, accounting for the fixed header. */
export function useSmoothScrollTo() {
  return useCallback((hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }, []);
}

/** Debounced window size helper (used for a couple of responsive decisions). */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/** Small helper for temporary "just did that" UI states. */
export function useTimedFlag(duration = 2200) {
  const [flag, setFlag] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const trigger = useCallback(() => {
    setFlag(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setFlag(false), duration);
  }, [duration]);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  return [flag, trigger] as const;
}
