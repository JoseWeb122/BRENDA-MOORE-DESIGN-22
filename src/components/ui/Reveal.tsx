import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/lib/hooks";

type Variant = "up" | "fade" | "left" | "right" | "scale" | "blur";

const hiddenStyles: Record<Variant, string> = {
  up: "translate-y-8 opacity-0",
  fade: "opacity-0",
  left: "-translate-x-10 opacity-0",
  right: "translate-x-10 opacity-0",
  scale: "scale-[0.97] opacity-0",
  blur: "opacity-0 blur-md",
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  variant?: Variant;
  as?:
    | "div"
    | "section"
    | "article"
    | "li"
    | "figure"
    | "header"
    | "span"
    | "p"
    | "blockquote"
    | "h1"
    | "h2"
    | "h3"
    | "h4";
};

/**
 * Scroll-triggered reveal. Fades + lifts its children into place the first
 * time they enter the viewport. Falls back to instantly visible when the
 * user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <Tag
      ref={ref as never}
      style={reduced ? undefined : { transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform,filter] duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0" : hiddenStyles[variant],
        !visible && !reduced && "will-change-[opacity,transform]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
